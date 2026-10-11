import React from 'react';
import { Quote, Star, MapPin } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const reviews = [
    {
      id: 'rev-1',
      name: 'Pranab & Manisha Saikia',
      residence: 'Fatasil Charali, Guwahati-09',
      scope: '3 BHK Turnkey Interior Execution (45 Days)',
      quote:
        'Living in Fatasil Charali right near their studio, we chose Interior Adda for our master suite and modular kitchen. The backlit geometric headboard in our bedroom looks exactly like their 3D render. Their carpentry team was punctual and the soft-close drawers feel truly premium.',
      outcome: 'Full 3 BHK delivered within 42 days with zero budget creep.',
    },
    {
      id: 'rev-2',
      name: 'Rituraj Barman',
      residence: 'Zoo Road, Guwahati',
      scope: 'Modular Kitchen & Mandir Unit',
      quote:
        'Finding reliable interior craftsmen in Guwahati who use genuine boiling water-proof ply is tough. Interior Adda showed us the material stamps on site before cutting. The brass laser jali work in our Mandir is exquisite.',
      outcome: 'Termite-resistant HDHMR kitchen completed with 10-year hardware guarantee.',
    },
    {
      id: 'rev-3',
      name: 'Anupam & Debjani Goswami',
      residence: 'Beltola, Guwahati',
      scope: 'Living Room TV Panelling & False Ceiling',
      quote:
        'Their 3D design team gave us full visualization before execution. The fluted wooden panelling and warm 2700K cove lighting completely elevated our living room without unnecessary delays.',
      outcome: 'Delivered on schedule with factory-finished machine edge banding.',
    },
  ];

  return (
    <section className="py-16 lg:py-20 bg-[#0c0e12] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[#d4af37] mb-2.5">
            Guwahati Homeowner Experiences
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-[#f7f5f0] font-serif-luxury text-balance">
            Trusted by Families Across Guwahati
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#9ea8b8] leading-relaxed">
            Real feedback from completed homes across Fatasil Charali, Zoo Road, and Beltola.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-[#141822] to-[#0e1118] border border-[#d4af37]/20 flex flex-col justify-between shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-[#ffd700]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#ffd700]" />
                    ))}
                  </div>
                  <Quote className="w-5 h-5 text-[#d4af37]/30" />
                </div>

                <p className="text-xs sm:text-sm text-[#cbd3e0] leading-relaxed italic mb-6">
                  "{rev.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-white/5">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-white font-serif-luxury">{rev.name}</h4>
                    <span className="text-[11px] text-[#a1abbb] flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-[#d4af37]" />
                      {rev.residence}
                    </span>
                  </div>
                </div>

                <div className="mt-3 text-[10px] text-[#ffd700] bg-black/40 p-2 rounded border border-white/5">
                  <span className="font-semibold block">{rev.scope}</span>
                  <span className="text-[#8e98a8]">{rev.outcome}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
