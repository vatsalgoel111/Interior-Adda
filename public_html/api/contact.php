<?php
/**
 * Interior Adda — Lead & Consultation Handler for Hostinger
 * Compatible with PHP 7.4 through PHP 8.3+
 */

// Strict CORS and JSON headers
header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: SAMEORIGIN');

// Only allow POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'success' => false,
        'message' => 'Method Not Allowed. Please submit using POST.'
    ]);
    exit;
}

// Recipient email configuration
$recipient_email = 'interioradda05@gmail.com';
$sender_email = 'no-reply@' . ($_SERVER['SERVER_NAME'] ?? 'interioradda.com');

// Parse input (supports both JSON body and multipart/form-data)
$input_data = [];
$raw_input = file_get_contents('php://input');

if (!empty($raw_input)) {
    $decoded = json_decode($raw_input, true);
    if (is_array($decoded)) {
        $input_data = $decoded;
    }
}

if (empty($input_data)) {
    $input_data = $_POST;
}

// Extract and sanitize fields
$full_name = trim(filter_var($input_data['fullName'] ?? $input_data['name'] ?? '', FILTER_SANITIZE_SPECIAL_CHARS));
$phone = trim(preg_replace('/[^0-9+]/', '', $input_data['phone'] ?? ''));
$email = trim(filter_var($input_data['email'] ?? '', FILTER_SANITIZE_EMAIL));
$service = trim(filter_var($input_data['service'] ?? 'General Interior Consultation', FILTER_SANITIZE_SPECIAL_CHARS));
$location = trim(filter_var($input_data['location'] ?? $input_data['locationOrArea'] ?? 'Guwahati', FILTER_SANITIZE_SPECIAL_CHARS));
$message = trim(filter_var($input_data['message'] ?? '', FILTER_SANITIZE_SPECIAL_CHARS));

// Validation
$errors = [];

if (empty($full_name)) {
    $errors[] = 'Full name is required.';
}

if (empty($phone) || strlen(preg_replace('/[^0-9]/', '', $phone)) < 10) {
    $errors[] = 'A valid 10-digit phone number is required.';
}

if (!empty($email) && !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'Please provide a valid email address.';
}

if (!empty($errors)) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => implode(' ', $errors),
        'errors' => $errors
    ]);
    exit;
}

// 1. Log lead safely to a local CSV file for 100% data retention
$log_dir = dirname(__DIR__) . '/logs';
if (!is_dir($log_dir)) {
    @mkdir($log_dir, 0750, true);
    // Write protective .htaccess inside logs dir
    @file_put_contents($log_dir . '/.htaccess', "Deny from all\n");
}

$log_file = $log_dir . '/leads.csv';
$is_new_file = !file_exists($log_file);

$log_handle = @fopen($log_file, 'a');
if ($log_handle) {
    if ($is_new_file) {
        fputcsv($log_handle, ['Timestamp', 'Full Name', 'Phone', 'Email', 'Service', 'Location', 'Message', 'IP']);
    }
    fputcsv($log_handle, [
        date('Y-m-d H:i:s'),
        $full_name,
        $phone,
        $email ?: 'N/A',
        $service,
        $location ?: 'Guwahati',
        $message ?: 'N/A',
        $_SERVER['REMOTE_ADDR'] ?? 'Unknown'
    ]);
    fclose($log_handle);
}

// 2. Prepare and send email via Hostinger PHP mail()
$subject = "New Interior Consultation Request: " . $full_name . " (" . $service . ")";

$body = "New consultation enquiry received from Interior Adda website:\n\n";
$body .= "Full Name: " . $full_name . "\n";
$body .= "Phone: " . $phone . "\n";
$body .= "Email: " . ($email ?: 'Not provided') . "\n";
$body .= "Service: " . $service . "\n";
$body .= "Location / Area: " . $location . "\n";
$body .= "Requirements:\n" . ($message ?: 'None specified') . "\n\n";
$body .= "Received: " . date('Y-m-d H:i:s') . " (IST)\n";
$body .= "Client IP: " . ($_SERVER['REMOTE_ADDR'] ?? 'Unknown') . "\n";

$headers = [];
$headers[] = 'MIME-Version: 1.0';
$headers[] = 'Content-type: text/plain; charset=utf-8';
$headers[] = 'From: Interior Adda <' . $sender_email . '>';
if (!empty($email)) {
    $headers[] = 'Reply-To: ' . $full_name . ' <' . $email . '>';
}
$headers[] = 'X-Mailer: PHP/' . phpversion();

$mail_sent = @mail($recipient_email, $subject, $body, implode("\r\n", $headers));

// Return truthful success
echo json_encode([
    'success' => true,
    'message' => 'Thank you! Your consultation request has been recorded. Our Guwahati team will reach out within 24 hours.',
    'mail_sent' => $mail_sent,
    'data' => [
        'name' => $full_name,
        'service' => $service,
        'phone' => $phone
    ]
]);
exit;
