import { motion } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import {
  Wifi, Car, Utensils, Flame, Droplets, Globe, Trophy, Baby,
  Stethoscope, Key, Shirt, Sparkles, Zap, Coffee, Wind, Tv,
  Shield, UserCheck, CheckCircle
} from "lucide-react";

// Original images from asset_images
import facilityHero from "@/asset_images/WhatsApp Image 2026-03-16 at 3.46.33 PM (3).jpeg";
import receptionImg from "@/asset_images/WhatsApp Image 2026-03-16 at 3.46.33 PM (46).jpeg";
import diningImg from "@/asset_images/WhatsApp Image 2026-03-16 at 3.46.33 PM (70).jpeg";

const mainFacilities = [
  { title: "CAR PARKING", icon: Car, desc: "Ample private secure parking" },
  { title: "WIFI CONNECTIVITY", icon: Wifi, desc: "High-speed wireless internet" },
  { title: "RESTAURANT", icon: Utensils, desc: "In-house rooftop multi-cuisine" },
  { title: "HOT WATER", icon: Droplets, desc: "24 hours continuous supply" },
  { title: "POWER BACKUP", icon: Zap, desc: "Full electricity backup" },
  { title: "SMART TV", icon: Tv, desc: "Google TV entertainment" },
];

const additionalFacilities = [
  { title: "BONFIRE", icon: Flame, desc: "Campfire at the lawn (Ooty)" },
  { title: "KETTLE", icon: Coffee, desc: "In-room tea/coffee maker" },
  { title: "LAUNDRY", icon: Shirt, desc: "Professional cleaning" },
  { title: "TRAVEL DESK", icon: Globe, desc: "Tour and travel assistance" },
  { title: "BASKETBALL", icon: Trophy, desc: "On-site sports facility" },
  { title: "PLAY AREA", icon: Baby, desc: "Dedicated children area" },
  { title: "ROOM HEATER", icon: Zap, desc: "Available for cold nights" },
  { title: "TOILETRIES", icon: Sparkles, desc: "Premium bath amenities" },
  { title: "HAIR DRYER", icon: Wind, desc: "Available on request" },
  { title: "DOCTOR ON-CALL", icon: Stethoscope, desc: "Medical assistance" },
  { title: "CAR RENTAL", icon: Key, desc: "Vehicle hire services" },
  { title: "BARBEQUE", icon: Utensils, desc: "Special request dining" },
];

export default function Facilities() {
  return (
    <div className="pt-20">
      {/* ── Hero Section ── */}
      <section className="relative h-[50vh] min-h-[400px] overflow-hidden">
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <img
            src={facilityHero}
            alt="Facilities Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </motion.div>

        <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-4">
          <Reveal>
            <p className="label-caps text-[#C5A861] mb-4">World-Class Comfort</p>
            <h1 className="font-serif text-5xl md:text-7xl text-white font-bold mb-6">
              Our <span className="italic text-[#C5A861]">Facilities</span>
            </h1>
            <p className="text-white/70 max-w-2xl mx-auto text-lg leading-relaxed">
              From business efficiency in Chennai to nature's serenity in Ooty, we provide everything you need for a seamless stay.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Main Amenities ── */}
      <section className="section-padding bg-background">
        <div className="container-luxury">
          <Reveal width="100%">
            <SectionHeading
              label="Standard Services"
              title="Modern Comforts"
              subtitle="Every detail is curated to provide a hassle-free and luxurious experience."
            />
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            {mainFacilities.map((f, i) => (
              <Reveal key={f.title} delay={i * 0.1}>
                <div className="group bg-white p-10 rounded-2xl border border-border/50 hover:border-[#C5A861]/40 transition-all duration-500 hover:shadow-2xl h-full">
                  <div className="h-14 w-14 bg-secondary/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-[#C5A861] group-hover:text-white transition-all duration-300">
                    <f.icon className="w-7 h-7" />
                  </div>
                  <h3 className="font-serif text-xl font-bold mb-3 tracking-tight">{f.title}</h3>
                  <p className="body-text text-sm leading-relaxed">{f.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Visual Breakout ── */}
      <section className="py-20 bg-secondary/5 overflow-hidden">
        <div className="container-luxury flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2">
            <Reveal direction="left">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-video lg:aspect-square">
                <img src={receptionImg} alt="Reception" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-10 left-10 text-white">
                  <p className="text-sm font-bold tracking-widest uppercase mb-2">Hospitality</p>
                  <h3 className="font-serif text-3xl font-bold">24/7 Assistance</h3>
                </div>
              </div>
            </Reveal>
          </div>
          <div className="lg:w-1/2 space-y-8">
            <Reveal>
              <h2 className="font-serif text-4xl md:text-5xl font-bold">Service Above <br /><span className="italic text-[#C5A861]">Expectations</span></h2>
              <p className="body-text text-lg leading-relaxed">
                Our staff is dedicated to ensuring your stay is perfect. From the moment you check in at our premium reception desks until your departure, every request is handled with professional care.
              </p>
              <ul className="space-y-4">
                {[
                  "Express Check-in & Check-out",
                  "Personalized Concierge Service",
                  "Daily Housekeeping & Turndown",
                  "Valet Parking Assist"
                ].map(item => (
                  <li key={item} className="flex items-center gap-3 text-sm font-bold tracking-wide">
                    <CheckCircle className="w-5 h-5 text-[#C5A861]" />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── More Facilities ── */}
      <section className="section-padding">
        <div className="container-luxury">
          <Reveal width="100%">
            <SectionHeading label="Extensive List" title="Everything You Need" />
          </Reveal>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {additionalFacilities.map((f, i) => (
              <Reveal key={f.title} delay={i * 0.05} direction="up">
                <div className="bg-[#fcfcfc] border border-border/40 p-8 rounded-xl text-center hover:bg-white hover:shadow-lg transition-all transform hover:-translate-y-1">
                  <f.icon className="w-6 h-6 mx-auto mb-4 text-[#C5A861]" />
                  <h4 className="text-[10px] font-bold tracking-[0.2em] uppercase mb-2">{f.title}</h4>
                  <p className="text-[11px] text-muted-foreground">{f.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Safety & Standards ── */}
      <section className="section-padding bg-[#0a0a0a] text-white">
        <div className="container-luxury text-center max-w-4xl mx-auto">
          <Reveal>
            <Shield className="w-12 h-12 text-[#C5A861] mx-auto mb-8 opacity-60" />
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-8">Your Safety is Our <span className="italic text-[#C5A861]">Prioritised Promise</span></h2>
            <p className="text-white/60 text-lg leading-relaxed mb-12">
              "We have formulated and enhanced our cleaning Operating Procedures at all our resorts which encompasses cleaning, sanitizing and checking, as a set of comprehensive procedures."
            </p>
            <div className="grid sm:grid-cols-2 gap-8 max-w-2xl mx-auto">
              <div className="p-10 border border-white/10 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors">
                <UserCheck className="w-10 h-10 text-[#C5A861] mx-auto mb-4" />
                <h4 className="font-bold mb-2 uppercase tracking-widest text-sm">Sanitized Rooms</h4>
                <p className="text-xs text-white/40">Complete medical-grade sanitization before check-in.</p>
              </div>
              <div className="p-10 border border-white/10 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors">
                <Shield className="w-10 h-10 text-[#C5A861] mx-auto mb-4" />
                <h4 className="font-bold mb-2 uppercase tracking-widest text-sm">Verified Staff</h4>
                <p className="text-xs text-white/40">Highly trained professionals following safety protocols.</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
