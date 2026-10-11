import React, { useState } from 'react';
import { X, Send, MessageCircle, Phone, CheckCircle, AlertCircle } from 'lucide-react';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefilledService?: string;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({
  isOpen,
  onClose,
  prefilledService = 'Complete Home Interior Turnkey',
}) => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [service, setService] = useState(prefilledService);
  const [status, setStatus] = useState<'idle' | 'submitted'>('idle');

  if (!isOpen) return null;

  const verifiedPhone = '9101668680';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone) return;
    setStatus('submitted');
  };

  const whatsappMsg = `Hi Interior Adda, I would like to book a free site consultation in Guwahati. Name: ${
    fullName || 'Client'
  }, Phone: ${phone || 'provided on WhatsApp'}, Location: ${location || 'Guwahati'}, Service: ${service}.`;
  const whatsappUrl = `https://wa.me/91${verifiedPhone}?text=${encodeURIComponent(whatsappMsg)}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-lg bg-[#141824] border border-[#d4af37]/40 rounded-2xl p-6 sm:p-8 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-[#9fa6b2] hover:text-white text-sm p-1 rounded cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[#d4af37] mb-1.5">
          Guwahati Site Inspection & 3D Review
        </div>
        <h3 className="text-2xl font-normal text-white font-serif-luxury mb-2">
          Book Free Consultation
        </h3>
        <p className="text-xs text-[#a5afbf] leading-relaxed mb-6 font-normal">
          Our senior design consultant will visit your site in Guwahati, measure dimensions, and craft your initial 3D concept layout without obligation.
        </p>

        {status === 'submitted' ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-14 h-14 rounded-full bg-[#25d366]/20 border border-[#25d366] text-[#25d366] flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h4 className="text-lg font-bold text-white font-serif-luxury">Consultation Requested!</h4>
            <p className="text-xs text-[#b8c2d1] max-w-sm mx-auto">
              Thank you {fullName}. We will call you at <span className="text-[#ffd700] font-mono">{phone}</span> within 24 hours to schedule the site measurement.
            </p>
            <div className="pt-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onClose}
                className="w-full py-3 px-4 rounded-lg bg-[#25d366] hover:bg-[#20ba5a] text-white font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Confirm Instantly On WhatsApp</span>
              </a>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-medium text-[#cad2de] block mb-1">
                Your Full Name <span className="text-[#d4af37]">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Ankur Sarma"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg bg-black/40 border border-white/10 text-xs text-white placeholder-[#687282] focus:outline-none focus:ring-1 focus:ring-[#d4af37]"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-[#cad2de] block mb-1">
                Contact Phone <span className="text-[#d4af37]">*</span>
              </label>
              <input
                type="tel"
                required
                placeholder="e.g. 91016 68680"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg bg-black/40 border border-white/10 text-xs text-white placeholder-[#687282] focus:outline-none focus:ring-1 focus:ring-[#d4af37]"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-[#cad2de] block mb-1">
                Guwahati Location / Apartment
              </label>
              <input
                type="text"
                placeholder="e.g. Fatasil Charali / Ulubari / Beltola"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg bg-black/40 border border-white/10 text-xs text-white placeholder-[#687282] focus:outline-none focus:ring-1 focus:ring-[#d4af37]"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-[#cad2de] block mb-1">
                Service Interested In
              </label>
              <select
                value={service}
                onChange={(e) => setService(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg bg-[#10141d] border border-white/10 text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#d4af37]"
              >
                <option value="Complete Home Interior Turnkey">Complete Home Interior Turnkey</option>
                <option value="Modular Kitchen">Modular Kitchen</option>
                <option value="Modular Wardrobes">Modular Wardrobes</option>
                <option value="Luxury Bedroom Suite">Luxury Bedroom Suite</option>
                <option value="TV Unit & Panelling">TV Unit & Panelling</option>
                <option value="False Ceiling & Lighting">False Ceiling & Lighting</option>
                <option value="Modular Temple / Mandir">Modular Temple / Mandir</option>
                <option value="Commercial Office Renovation">Commercial Office Renovation</option>
              </select>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <button
                type="submit"
                className="flex-1 py-3 px-4 rounded-lg text-xs font-semibold uppercase tracking-wider text-[#0c0e12] bg-gradient-to-r from-[#eed187] to-[#d4af37] hover:from-[#fff0b2] hover:to-[#c99728] shadow-md transition-all cursor-pointer text-center"
              >
                Request Booking
              </button>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onClose}
                className="py-3 px-4 rounded-lg text-xs font-semibold uppercase tracking-wider text-[#25d366] bg-[#25d366]/10 hover:bg-[#25d366]/20 border border-[#25d366]/30 flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 fill-[#25d366]" />
                <span>WhatsApp Instead</span>
              </a>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
