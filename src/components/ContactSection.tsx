import React, { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  Instagram,
  CheckCircle,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';

interface ContactSectionProps {
  initialService?: string;
  initialEstimate?: string;
}

// Configurable Web3Forms Access Key placeholder
const WEB3FORMS_ACCESS_KEY = 'YOUR_WEB3FORMS_ACCESS_KEY';

export const ContactSection: React.FC<ContactSectionProps> = ({
  initialService = '',
  initialEstimate = '',
}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    service: initialService || 'Complete Home Interior Turnkey',
    locationOrArea: '',
    message: initialEstimate
      ? `Estimated Scope: ${initialEstimate}\nI would like to schedule a free site consultation.`
      : '',
  });

  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [submissionState, setSubmissionState] = useState<'idle' | 'loading' | 'success' | 'error'>(
    'idle'
  );
  const [feedbackMessage, setFeedbackMessage] = useState<string>('');

  const servicesList = [
    'Complete Home Interior Turnkey',
    'Modular Kitchen',
    'Modular Wardrobes & Storage',
    'TV Units & Living Room Panelling',
    'Luxury Bedroom Suite',
    'False Ceiling & Architectural Lighting',
    'Modular Mandir / Pooja Room',
    'Commercial Office Renovation',
  ];

  const validate = () => {
    const errors: { [key: string]: string } = {};
    if (!formData.fullName.trim()) {
      errors.fullName = 'Please enter your full name';
    }
    const cleanPhone = formData.phone.replace(/[^0-9]/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
      errors.phone = 'Please enter a valid 10-digit phone number';
    }
    if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    if (submissionState === 'loading') return;

    setSubmissionState('loading');
    setFeedbackMessage('');

    // Check if Web3Forms key is still unconfigured placeholder
    if (!WEB3FORMS_ACCESS_KEY || WEB3FORMS_ACCESS_KEY === 'YOUR_WEB3FORMS_ACCESS_KEY') {
      // Truthful disclosure as required by Section 7
      setSubmissionState('error');
      setFeedbackMessage(
        'Note: Web3Forms access key is currently in placeholder mode (YOUR_WEB3FORMS_ACCESS_KEY). Please connect with us directly on WhatsApp or phone for immediate consultation booking!'
      );
      return;
    }

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          name: formData.fullName,
          phone: formData.phone,
          email: formData.email || 'Not provided',
          service: formData.service,
          area_location: formData.locationOrArea,
          message: formData.message,
          subject: `New Interior Consultation Request from ${formData.fullName}`,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setSubmissionState('success');
        setFeedbackMessage(
          'Thank you! Your enquiry has been received. Our Guwahati interior design lead will call you within 24 hours.'
        );
        setFormData({
          fullName: '',
          phone: '',
          email: '',
          service: 'Complete Home Interior Turnkey',
          locationOrArea: '',
          message: '',
        });
      } else {
        setSubmissionState('error');
        setFeedbackMessage(data.message || 'Submission failed. Please contact us directly via WhatsApp.');
      }
    } catch {
      setSubmissionState('error');
      setFeedbackMessage('Network communication error. Please call or message us directly on WhatsApp.');
    }
  };

  const verifiedPhone = '9101668680';
  const whatsappUrl = `https://wa.me/91${verifiedPhone}?text=${encodeURIComponent(
    `Hello Interior Adda, I would like to schedule a free interior consultation in Guwahati for ${formData.service}. My name is ${formData.fullName || 'a client'}.`
  )}`;

  const mapsUrl = 'https://maps.google.com/?q=Fatasil+Charali+Guwahati+Assam+781009';

  return (
    <section id="contact" className="py-16 lg:py-20 bg-[#090b0e] relative overflow-hidden border-t border-[#d4af37]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[#d4af37] mb-2.5">
            Get In Touch · Guwahati Studio
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-[#f7f5f0] font-serif-luxury text-balance">
            Start Your Dream Project Today
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#9ea8b8] leading-relaxed">
            Book a complimentary site measurement and 3D concept review. Visit our Fatasil Charali studio or connect via WhatsApp and direct call.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left: Verified Studio Details & Quick Channels (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="p-8 rounded-2xl bg-gradient-to-b from-[#141822] to-[#0e1118] border border-[#d4af37]/30 shadow-xl space-y-6">
              <h3 className="text-xl font-bold text-white font-serif-luxury">
                Studio Contact Details
              </h3>

              <div className="space-y-4 text-sm">
                {/* Address */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-[#d4af37]/10 border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37] shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-white block">Studio Address</span>
                    <p className="text-xs text-[#a4aebd] leading-relaxed">
                      N.S Road, Fatasil Charali, Guwahati - 781009, Assam, India
                    </p>
                    <a
                      href={mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] text-[#ffd700] hover:underline mt-1"
                    >
                      <span>Open in Google Maps</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-[#d4af37]/10 border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37] shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-white block">Phone Consultation</span>
                    <a
                      href={`tel:+91${verifiedPhone}`}
                      className="text-xs sm:text-sm text-[#ffd700] hover:underline font-mono tabular-nums block font-medium"
                    >
                      +91 91016 68680
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-[#d4af37]/10 border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37] shrink-0 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-white block">Email Enquiry</span>
                    <a
                      href="mailto:interioradda05@gmail.com"
                      className="text-xs text-[#c5cdd9] hover:text-[#ffd700] transition-colors"
                    >
                      interioradda05@gmail.com
                    </a>
                  </div>
                </div>

                {/* Socials */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-[#d4af37]/10 border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37] shrink-0 mt-0.5">
                    <Instagram className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-white block">Instagram & Telegram</span>
                    <a
                      href="https://www.instagram.com/interioradda05/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-[#ffd700] hover:underline"
                    >
                      @interioradda05
                    </a>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-3.5 pt-2 border-t border-white/5">
                  <div className="w-9 h-9 rounded-lg bg-[#d4af37]/10 border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37] shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-white block">Studio Working Hours</span>
                    <span className="text-xs text-[#a4aebd] block">Mon – Sat: 10:00 AM – 8:00 PM</span>
                    <span className="text-[11px] text-[#ffd700]">Open Now · Sunday by Appointment</span>
                  </div>
                </div>
              </div>

              {/* Direct Instant WhatsApp Action Card */}
              <div className="pt-4 border-t border-white/10">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-4 rounded-xl bg-[#25d366]/15 hover:bg-[#25d366]/25 border border-[#25d366]/40 text-[#25d366] font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md"
                >
                  <MessageCircle className="w-4 h-4 fill-[#25d366]" />
                  <span>Connect Instantly on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right: Functional Lead Enquiry Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-2xl bg-gradient-to-b from-[#141822] to-[#0e1118] border border-[#d4af37]/30 shadow-2xl">
              <h3 className="text-2xl font-bold text-white font-serif-luxury mb-2">
                Request Free Consultation & 3D Visit
              </h3>
              <p className="text-xs text-[#a3abb8] mb-6">
                Tell us about your space. We'll review your layout and arrange a complimentary Guwahati site visit.
              </p>

              {/* Truthful Inline Status Alerts */}
              {submissionState === 'success' && (
                <div className="p-4 rounded-xl bg-[#0f2e1b] border border-[#25d366]/50 text-xs text-[#a5f3c0] flex items-start gap-3 mb-6">
                  <CheckCircle className="w-4 h-4 text-[#25d366] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold block text-white">Enquiry Submitted Successfully!</span>
                    <p className="mt-0.5 text-[#b2f0c7]">{feedbackMessage}</p>
                  </div>
                </div>
              )}

              {submissionState === 'error' && (
                <div className="p-4 rounded-xl bg-[#2e1515] border border-[#f87171]/50 text-xs text-[#fca5a5] flex items-start gap-3 mb-6">
                  <AlertCircle className="w-4 h-4 text-[#f87171] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold block text-white">Form Notice</span>
                    <p className="mt-0.5 text-[#fecaca]">{feedbackMessage}</p>
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-[#25d366] hover:underline"
                    >
                      <MessageCircle className="w-3.5 h-3.5 fill-[#25d366]" />
                      <span>Click here to send details via WhatsApp instead →</span>
                    </a>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Full Name & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium text-[#cad2de] block mb-1.5">
                      Full Name <span className="text-[#d4af37]">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Rahul Sharma"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className={`w-full px-4 py-2.5 rounded-lg bg-black/40 border text-xs text-white placeholder-[#687282] focus:outline-none focus:ring-1 focus:ring-[#d4af37] ${
                        formErrors.fullName ? 'border-[#f87171]' : 'border-white/10'
                      }`}
                    />
                    {formErrors.fullName && (
                      <span className="text-[11px] text-[#f87171] mt-1 block">{formErrors.fullName}</span>
                    )}
                  </div>

                  <div>
                    <label className="text-xs font-medium text-[#cad2de] block mb-1.5">
                      Phone Number <span className="text-[#d4af37]">*</span>
                    </label>
                    <input
                      type="tel"
                      placeholder="e.g. 91016 68680"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className={`w-full px-4 py-2.5 rounded-lg bg-black/40 border text-xs text-white placeholder-[#687282] focus:outline-none focus:ring-1 focus:ring-[#d4af37] ${
                        formErrors.phone ? 'border-[#f87171]' : 'border-white/10'
                      }`}
                    />
                    {formErrors.phone && (
                      <span className="text-[11px] text-[#f87171] mt-1 block">{formErrors.phone}</span>
                    )}
                  </div>
                </div>

                {/* Email & Location */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium text-[#cad2de] block mb-1.5">
                      Email Address <span className="text-[#8892a0]">(Optional)</span>
                    </label>
                    <input
                      type="email"
                      placeholder="name@gmail.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`w-full px-4 py-2.5 rounded-lg bg-black/40 border text-xs text-white placeholder-[#687282] focus:outline-none focus:ring-1 focus:ring-[#d4af37] ${
                        formErrors.email ? 'border-[#f87171]' : 'border-white/10'
                      }`}
                    />
                    {formErrors.email && (
                      <span className="text-[11px] text-[#f87171] mt-1 block">{formErrors.email}</span>
                    )}
                  </div>

                  <div>
                    <label className="text-xs font-medium text-[#cad2de] block mb-1.5">
                      Guwahati Location / Carpet Area
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Fatasil Charali / 1200 sq.ft"
                      value={formData.locationOrArea}
                      onChange={(e) => setFormData({ ...formData, locationOrArea: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg bg-black/40 border border-white/10 text-xs text-white placeholder-[#687282] focus:outline-none focus:ring-1 focus:ring-[#d4af37]"
                    />
                  </div>
                </div>

                {/* Service Interested In */}
                <div>
                  <label className="text-xs font-medium text-[#cad2de] block mb-1.5">
                    Service of Interest <span className="text-[#d4af37]">*</span>
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg bg-[#10141d] border border-white/10 text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#d4af37] cursor-pointer"
                  >
                    {servicesList.map((svc) => (
                      <option key={svc} value={svc} className="bg-[#10141d] text-white">
                        {svc}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="text-xs font-medium text-[#cad2de] block mb-1.5">
                    Project Requirements / Notes
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about your floor plan, preferred materials, or timeline requirements..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg bg-black/40 border border-white/10 text-xs text-white placeholder-[#687282] focus:outline-none focus:ring-1 focus:ring-[#d4af37]"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={submissionState === 'loading'}
                    className="w-full py-3.5 px-6 rounded-lg text-xs font-semibold uppercase tracking-wider text-[#0c0e12] bg-gradient-to-r from-[#eed187] via-[#d4af37] to-[#b38128] hover:from-[#fff0b2] hover:to-[#c99728] shadow-[0_4px_20px_rgba(212,175,55,0.3)] transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {submissionState === 'loading' ? (
                      <span>Sending Consultation Request...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Schedule Free Site Consultation</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="text-center">
                  <span className="text-[11px] text-[#7d8795]">
                    No obligation · 100% Free on-site inspection in Guwahati · Privacy respected
                  </span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
