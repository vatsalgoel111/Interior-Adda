# Interior Adda — Hostinger Premium Deployment Guide

This website has been built strictly for **Hostinger Premium Shared Hosting**. It uses standard **HTML5, CSS3, vanilla JavaScript, and PHP** without any Node.js runtime, build steps, npm dependencies, or external framework requirements.

---

## 📁 Package Structure

```text
public_html/
├── index.php                 # Primary PHP entry point
├── index.html                # Static HTML alternative
├── .htaccess                 # Apache performance, caching & security rules
├── api/
│   └── contact.php           # Production PHP contact form & lead logger
├── assets/
│   ├── css/
│   │   └── style.css         # Complete handcrafted responsive styling
│   └── js/
│       ├── main.js           # UI logic, filters, calculator & form handler
│       └── three-studio.js   # Interactive 3D Three.js room visualizer
└── logs/                     # Auto-created secure lead log directory
```

---

## 🚀 How to Deploy on Hostinger (Step-by-Step)

### Method 1: Using Hostinger hPanel File Manager (Easiest)

1. Log into your **Hostinger Account** at [https://hpanel.hostinger.com](https://hpanel.hostinger.com).
2. Go to **Websites** and click **Manage** next to your domain.
3. In the left sidebar or dashboard, click **File Manager** (Files -> File Manager).
4. Select **Access files of [your domain]**.
5. Double-click to open the `public_html` directory.
6. Delete the default `default.php` or placeholder file if one exists.
7. Upload all the files and folders from the local `public_html/` directory:
   - `index.php`
   - `index.html`
   - `.htaccess`
   - `api/` folder (with `contact.php`)
   - `assets/` folder (with `css/` and `js/`)
8. Visit your website: `https://yourdomain.com`.

### Method 2: Using FTP (FileZilla)

1. Find your FTP credentials in Hostinger hPanel under **Files -> FTP Accounts**.
2. Connect using FileZilla:
   - **Host:** `ftp.yourdomain.com` (or the IP listed in hPanel)
   - **Username:** Your Hostinger FTP username
   - **Password:** Your FTP password
   - **Port:** `21`
3. In the remote pane, navigate to `/public_html/`.
4. Upload all contents of the local `public_html/` folder.

---

## ⚙️ Hostinger PHP Configuration

- **Supported PHP Versions:** PHP 7.4, 8.0, 8.1, 8.2, and 8.3 (tested and compatible).
- To verify or switch PHP version in Hostinger:
  1. Go to **hPanel -> Advanced -> PHP Configuration**.
  2. Select **PHP 8.2** or **PHP 8.3** (Recommended).
  3. Click **Update**.

---

## 📧 Email & Lead Inquiries Setup (`api/contact.php`)

By default, `api/contact.php`:
1. Sends an email to `interioradda05@gmail.com` using Hostinger's standard PHP `mail()` function.
2. Automatically logs every lead to `public_html/logs/leads.csv` with a timestamp, phone, and service interested in.
3. The `logs/` directory is blocked from public browser access by `.htaccess` rules for privacy.

To change the recipient email address, edit line 15 in `public_html/api/contact.php`:
```php
$to_email = 'interioradda05@gmail.com';
```

---

## 📱 WhatsApp Direct Action

The official floating WhatsApp button and all consultation quote buttons are pre-configured to:
- **Phone:** `+91 91016 68680`
- **Pre-filled message:** Automatically populated with client name, residence area, and calculated estimate.
