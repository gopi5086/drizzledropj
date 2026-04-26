import { motion } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import { CheckCircle } from "lucide-react";
import facilityHero from "@/assets/Gallery/Chennai-images/RECEPTION/_SPY0022.webp";
import chennaiFacilitiesHero from "@/assets/Gallery/Chennai-images/RECEPTION/_SPY0024.webp";
import ootyHero from "@/assets/Gallery/Ooty-Images/VIEW/BROL6953.webp";
import receptionImg from "@/asset_images/WhatsApp Image 2026-03-16 at 3.46.33 PM (46).webp";
import diningImg from "@/asset_images/WhatsApp Image 2026-03-16 at 3.46.33 PM (70).webp";
import { commonFacilities, ootyExtraFacilities } from "@/data/facilitiesData";

import { useParams } from "react-router-dom";
import SEO from "@/components/SEO";

export default function Facilities() {
  const { locationId } = useParams();
  
  const isOoty = locationId?.toLowerCase() === "ooty";
  const isChennai = locationId?.toLowerCase() === "chennai";
  
  const seoTitle = isOoty ? "Premium Hotel Facilities in Ooty | DrizzleDrop Inn" : isChennai ? "Business Hotel Amenities Chennai OMR | DrizzleDrop Inn" : "Our Hotel Facilities | DrizzleDrop Inn";
  const seoDesc = isOoty ? "Enjoy valley views, bonfire area, and premium trekking assistance at DrizzleDrop Inn Ooty." : isChennai ? "High-speed Wi-Fi, business center, and prime OMR connectivity for business travelers in Chennai." : "Discover world-class facilities at DrizzleDrop Inn properties in Ooty and Chennai.";

  // Facilities to show: Ooty gets all, Chennai gets only common
  const facilitiesToShow = isOoty
    ? [...commonFacilities, ...ootyExtraFacilities]
    : commonFacilities;

  return (
    <div className="pt-20">
      <SEO 
        title={seoTitle}
        description={seoDesc}
        url={`https://drizzledropinn.com/${locationId ? locationId + '/facilities' : 'facilities'}`}
      />
      {/* ── Hero Section ── */}
      <section className="relative h-[60vh] sm:h-[70vh] min-h-[350px] sm:min-h-[450px] overflow-hidden">
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <img
            src={isOoty ? ootyHero : isChennai ? chennaiFacilitiesHero : facilityHero}
            alt="Facilities Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </motion.div>

        <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-4">
          <Reveal>
            <p className="label-caps text-[#C5A861] mb-3 sm:mb-4">World-Class Comfort</p>
            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl text-white font-bold mb-4 sm:mb-6">
              Our <span className="italic text-[#C5A861]">Facilities</span>
            </h1>
            <p className="text-white/70 max-w-2xl mx-auto text-xs sm:text-base md:text-lg leading-relaxed px-2">
              {isChennai
                ? "Designed for the modern business traveller — high-speed connectivity, prime OMR location, and premium comforts that keep you at your productive best."
                : isOoty
                ? "Nestled in the Nilgiri hills, every facility is crafted to immerse you in nature's calm — breathe in the mist, unwind, and reconnect with serenity."
                : "From business efficiency in Chennai to nature's serenity in Ooty, we provide everything you need for a seamless stay."}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Facilities Section (Shared for both locations) ── */}
      <section className="section-padding bg-background">
        <div className="container-luxury">
          <Reveal width="100%">
            <SectionHeading
              label="Our Facilities"
              title={isOoty ? "Drizzledrop Inn Ooty" : isChennai ? "Drizzledrop Inn Chennai" : "Our Hotels"}
              subtitle="Every detail is curated to provide a hassle-free and luxurious experience."
            />
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 mt-12 sm:mt-16">
            {facilitiesToShow.map((f, i) => (
              <Reveal key={f.title} delay={i * 0.1}>
                <div className="group bg-white p-8 sm:p-10 rounded-xl sm:rounded-2xl border border-border/50 hover:border-[#C5A861]/40 transition-all duration-500 hover:shadow-2xl h-full">
                  <div className="h-12 sm:h-14 w-12 sm:w-14 bg-secondary/10 rounded-full flex items-center justify-center mb-4 sm:mb-6 group-hover:bg-[#C5A861] group-hover:text-white transition-all duration-300">
                    <f.icon className="w-6 sm:w-7 h-6 sm:h-7" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-medium mb-2 sm:mb-3 tracking-tight">{f.title}</h3>
                  <p className="body-text text-xs sm:text-sm leading-relaxed">{f.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Visual Breakout ── */}
      <section className="py-12 sm:py-16 md:py-20 bg-secondary/5 overflow-hidden">
        <div className="container-luxury flex flex-col lg:flex-row items-center gap-8 md:gap-16">
          <div className="w-full lg:w-1/2">
            <Reveal direction="left">
              <div className="relative rounded-2xl md:rounded-3xl overflow-hidden shadow-xl md:shadow-2xl aspect-video lg:aspect-square">
                <img src={receptionImg} alt="Reception" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-6 sm:bottom-10 left-6 sm:left-10 text-white">
                  <p className="text-xs sm:text-sm font-bold tracking-widest uppercase mb-1 sm:mb-2">Hospitality</p>
                  <h3 className="text-2xl sm:text-3xl font-medium">24/7 Assistance</h3>
                </div>
              </div>
            </Reveal>
          </div>
          <div className="w-full lg:w-1/2 space-y-6 sm:space-y-8">
            <Reveal>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">Service Above <br /><span className="italic text-[#C5A861]">Expectations</span></h2>
              <p className="body-text text-sm md:text-base lg:text-lg leading-relaxed">
                Our staff is dedicated to ensuring your stay is perfect. From the moment you check in at our premium reception desks until your departure, every request is handled with professional care.
              </p>
              <ul className="space-y-3 sm:space-y-4">
                {[
                  "Express Check-in & Check-out",
                  "Personalized Concierge Service",
                  "Daily Housekeeping & Turndown",
                  "Valet Parking Assist"
                ].map(item => (
                  <li key={item} className="flex items-center gap-3 text-xs sm:text-sm font-bold tracking-wide">
                    <CheckCircle className="w-4 sm:w-5 h-4 sm:h-5 text-[#C5A861] shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Safety & Standards section removed for DRY facilities data approach. Add back if needed. */}
      
    </div>
  );
}
