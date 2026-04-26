import { motion } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import { Utensils, Sprout, Heart, Sparkles, Map, Mountain, LucideIcon } from "lucide-react";

// Original images from asset_images
import heroDining from "@/assets/Gallery/Ooty-Images/RESTAURANT/BROL7065.webp";
import chennaiDiningHero from "@/assets/Gallery/Chennai-images/RECEPTION/_SPY0027.webp";
import ootyDiningHero from "@/assets/Gallery/Ooty-Images/RESTAURANT/BROL7065.webp";
import chennaiDining1 from "@/asset_images/WhatsApp Image 2026-03-16 at 3.46.33 PM (65).webp";
import ootyDining1 from "@/asset_images/WhatsApp Image 2026-03-16 at 3.46.33 PM (54).webp";
import rooftopView from "@/asset_images/WhatsApp Image 2026-03-16 at 3.46.33 PM (70).webp";

interface Highlight {
  icon: LucideIcon;
  title: string;
  desc: string;
}

const highlights: Highlight[] = [
  { icon: Sprout, title: "Freshest Ingredients", desc: "Mostly sourced directly from our garden for maximum flavor." },
  { icon: Heart, title: "Authentic Recipes", desc: "Traditional methods passed down to preserve true taste." },
  { icon: Sparkles, title: "Delicate Flavours", desc: "We strive to preserve the subtle nuances of every dish." },
  { icon: Utensils, title: "Rooftop Dining", desc: "Dine with a view at both our Chennai and Ooty locations." },
  { icon: Map, title: "Multi-Cuisine", desc: "From multi-cuisine delicacies to Asian specialties." },
  { icon: Mountain, title: "Valley Views", desc: "Magnificent views of the Ooty valley from our roof top." },
];

import { useParams } from "react-router-dom";

export default function Dining() {
  const { locationId } = useParams();

  const isOoty = locationId?.toLowerCase() === "ooty";
  const isChennai = locationId?.toLowerCase() === "chennai";
  const showChennai = !locationId || locationId.toLowerCase() === "chennai";
  const showOoty = !locationId || locationId.toLowerCase() === "ooty";

  return (
    <div className="pt-20">
      {/* ── Hero Section ── */}
      <section className="relative h-[70vh] sm:h-[75vh] min-h-[400px] sm:min-h-[500px] overflow-hidden bg-[#0d1b2a]">
        <motion.div
          initial={{ scale: 1.15, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2.5, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <img
            src={isOoty ? ootyDiningHero : isChennai ? chennaiDiningHero : heroDining}
            alt="Dining Hero"
            className="w-full h-full object-cover brightness-75 contrast-110"
          />
          {/* Custom vignette */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-[#1a1a1a]/80" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />
        </motion.div>

        <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            <p className="label-caps text-[#C5A861] mb-4 sm:mb-6 tracking-[0.4em] font-bold">Culinary Excellence</p>
            <h1 className="text-2xl sm:text-4xl md:text-6xl lg:text-8xl text-white font-bold leading-[1] sm:leading-[1.1] md:leading-[0.9] mb-4 sm:mb-8">
              A Symphony <br />
              {locationId ? (
                <span className="italic text-[#C5A861] drop-shadow-[0_0_20px_rgba(197,168,97,0.3)]">in {locationId.toUpperCase()}</span>
              ) : (
                <span className="italic text-[#C5A861] drop-shadow-[0_0_20px_rgba(197,168,97,0.3)]">of Tastes</span>
              )}
            </h1>
            <p className="text-white/70 max-w-2xl mx-auto text-xs sm:text-base md:text-lg font-light tracking-wide leading-relaxed px-2">
              Experience the perfect blend of local tradition and global flair. At DrizzleDrop, {locationId ? "at " + locationId : "every meal"} is an occasion to celebrate.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Highlights Grid ── */}
      <section className="section-padding bg-[#fcfcfc]">
        <div className="container-luxury">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
            {highlights.filter(h => {
              const isOnlyOoty = locationId?.toLowerCase() === "ooty";
              const isOnlyChennai = locationId?.toLowerCase() === "chennai";
              if (isOnlyOoty) return h.title !== "Chennai Rooftop";
              if (isOnlyChennai) return h.title !== "Valley Views";
              return true;
            }).map((h, i) => (
              <Reveal key={h.title} delay={i * 0.1}>
                <div className="group bg-white p-6 sm:p-8 md:p-10 rounded-xl sm:rounded-2xl border border-border/40 hover:border-[#C5A861]/40 transition-all duration-700 hover:shadow-[0_20px_50px_rgba(46,107,138,0.08)] h-full overflow-hidden relative">
                  {/* Subtle bg decoration */}
                  <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-[#C5A861]/10 transition-colors" />

                  <div className="h-12 sm:h-16 w-12 sm:w-16 bg-[#C5A861]/10 rounded-lg sm:rounded-xl flex items-center justify-center mb-6 sm:mb-8 group-hover:bg-[#C5A861] group-hover:text-white transition-all duration-500 transform group-hover:-translate-y-2 group-hover:rotate-6">
                    <h.icon className="w-6 sm:w-8 h-6 sm:h-8 transition-transform duration-500" />
                  </div>
                  <h3 className="text-lg sm:text-2xl font-medium mb-3 sm:mb-4 tracking-tight">{h.title}</h3>
                  <p className="body-text text-xs sm:text-sm leading-relaxed text-muted-foreground">{h.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Cinematic Features ── */}
      <section className="section-padding overflow-hidden">
        <div className="container-luxury">
          <div className="space-y-16 md:space-y-32">

            {/* Chennai Feature */}
            {showChennai && (
              <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-16">
                <div className="w-full lg:w-1/2">
                  <Reveal direction="left">
                    <div className="relative">
                      <div className="aspect-[4/3] rounded-2xl md:rounded-3xl overflow-hidden shadow-xl md:shadow-2xl">
                        <img src={chennaiDining1} alt="Chennai Dining" className="w-full h-full object-cover hover:scale-105 transition-transform duration-[2s]" />
                      </div>
                      {/* Decorative element */}
                      <div className="absolute -z-10 -top-6 -left-6 w-full h-full border border-[#C5A861]/20 rounded-3xl" />
                    </div>
                  </Reveal>
                </div>
                <div className="w-full lg:w-1/2 space-y-4 sm:space-y-6">
                  <Reveal>
                    <span className="text-[#C5A861] font-bold tracking-[0.2em] uppercase text-xs">Exquisite Spaces</span>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">Chennai Rooftop <br /><span className="italic text-[#C5A861]">Experience</span></h2>
                    <p className="body-text text-sm sm:text-base md:text-lg leading-relaxed">
                      Our rooftop specialty restaurant in Chennai offers Multi-Cuisine and Asian delicacies. A modern vibe with exceptional services makes it an ideal abode for the modern traveller.
                    </p>
                    <div className="pt-2 sm:pt-4 flex flex-wrap gap-2 sm:gap-3">
                      {["Gourmet Dining", "City Views", "Signature Cocktails"].map(tag => (
                        <span key={tag} className="px-4 sm:px-5 py-1.5 sm:py-2 rounded-full border border-border/60 text-[9px] sm:text-[10px] font-bold uppercase tracking-widest bg-secondary/30">{tag}</span>
                      ))}
                    </div>
                  </Reveal>
                </div>
              </div>
            )}

            {/* Ooty Feature */}
            {showOoty && (
              <div className="flex flex-col lg:flex-row-reverse items-center gap-8 md:gap-16">
                <div className="w-full lg:w-1/2">
                  <Reveal direction="right">
                    <div className="relative">
                      <div className="aspect-[4/3] rounded-2xl md:rounded-3xl overflow-hidden shadow-xl md:shadow-2xl">
                        <img src={ootyDining1} alt="Ooty Dining" className="w-full h-full object-cover hover:scale-105 transition-transform duration-[2s]" />
                      </div>
                      {/* Decorative element */}
                      <div className="absolute -z-10 -top-6 -right-6 w-full h-full border border-[#C5A861]/20 rounded-2xl md:rounded-3xl" />
                    </div>
                  </Reveal>
                </div>
                <div className="w-full lg:w-1/2 space-y-4 sm:space-y-6">
                  <Reveal>
                    <span className="text-[#C5A861] font-bold tracking-[0.2em] uppercase text-xs">Breathtaking Views</span>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">Ooty Valley <br /><span className="italic text-[#C5A861]">Panorama</span></h2>
                    <p className="body-text text-sm sm:text-base md:text-lg leading-relaxed">
                      Located on the rooftop with a magnificent view of the valley. Enjoy fine-dine or the comfort of your room. Treat your taste buds to new and exciting dishes every single day.
                    </p>
                    <div className="pt-2 sm:pt-4 flex flex-wrap gap-2 sm:gap-3">
                      {["Hill Views", "Garden To Table", "Mountain Breeze"].map(tag => (
                        <span key={tag} className="px-4 sm:px-5 py-1.5 sm:py-2 rounded-full border border-border/60 text-[9px] sm:text-[10px] font-bold uppercase tracking-widest bg-secondary/30">{tag}</span>
                      ))}
                    </div>
                  </Reveal>
                </div>
              </div>
            )}

          </div>
        </div>
      </section>

      {/* ── Rooftop View Banner ── */}
      <section className="relative h-[50vh] sm:h-[60vh] min-h-[350px] sm:min-h-[400px] my-12 sm:my-16 md:my-20">
        <div className="absolute inset-0">
          <img src={rooftopView} alt="Rooftop" className="w-full h-full object-cover attachment-fixed" />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <Reveal>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white mb-4 sm:mb-6">Dine Under the Stars</h2>
            <p className="text-white/70 max-w-xl mx-auto leading-relaxed text-xs sm:text-sm md:text-base">Experience a magical evening at our rooftop decks with panoramic views and candlelight ambiance.</p>
          </Reveal>
        </div>
      </section>

      {/* ── Final Quote ── */}
      <section className="section-padding bg-[#f8f5f0]">
        <div className="container-luxury text-center max-w-4xl mx-auto">
          <Reveal>
            <Utensils className="w-12 h-12 text-[#C5A861] mx-auto mb-10 opacity-30" />
            <h2 className="text-2xl md:text-4xl font-light leading-relaxed italic mb-12 text-foreground tracking-tight">
              "Our chefs have carefully curated a diverse menu that highlights the finest elements of every cuisine. Treat your taste buds to new and exciting dishes every single day at DrizzleDrop Inn."
            </h2>
            <p className="label-caps !text-[#C5A861]">The Master Chefs — DrizzleDrop Inn</p>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
