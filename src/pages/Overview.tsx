import { motion } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";
import landscapeImg from "@/asset_images/WhatsApp Image 2026-03-16 at 3.46.33 PM (24).jpeg";
import storyImg from "@/asset_images/WhatsApp Image 2026-03-16 at 3.46.33 PM (4).jpeg";
import { Shield, Heart, Leaf, Sparkles, Clock, FileText, UserCheck, Baby } from "lucide-react";

const values = [
  { icon: Heart, title: "Warm Hospitality", desc: "Every guest is family. We go beyond expectations to make your stay memorable." },
  { icon: Shield, title: "Safety & Hygiene", desc: "Enhanced Cleaning Operating Procedures: sanitizing and checking as a set of comprehensive procedures." },
  { icon: Leaf, title: "Nature & Relaxation", desc: "Relax in Ooty's scenic beauty or Chennai's urban energy - experience serenity everywhere." },
  { icon: Sparkles, title: "Comfortable Luxury", desc: "35 rooms in Chennai and 8 hill-view apartments in Ooty, all well-furnished for your comfort." },
];

const policies = [
  {
    icon: Clock,
    title: "Arrival & Departure",
    items: [
      "Check-in: 12:00 Hours",
      "Check-out: 11:00 Hours",
      "Early check-in & late check-out available on request (subject to charges and availability)."
    ]
  },
  {
    icon: FileText,
    title: "Cancellation Policy",
    items: [
      "Free cancellation until 3 days before arrival.",
      "First night charged if cancelled within 3 days before arrival."
    ]
  },
  {
    icon: UserCheck,
    title: "Identity & Age Proof",
    items: [
      "Original valid photo ID/Passport required at check-in.",
      "Primary guest must be at least 18 years of age.",
      "Couples must both be at least 18 years of age."
    ]
  },
  {
    icon: Baby,
    title: "Child Policy",
    items: [
      "Up to two children (under 11) stay free in parent's room.",
      "One child over 8 but under 12 stays free (extra bed at additional charge).",
      "Full charge for children above 12 years."
    ]
  }
];

export default function Overview() {
  return (
    <div className="pt-16 sm:pt-20 md:pt-24">
      {/* Hero */}
      <section className="relative min-h-[35vh] sm:min-h-[40vh] flex flex-col items-center justify-center bg-secondary/10 mt-4 sm:mt-6 md:mt-8 rounded-xl sm:rounded-2xl mx-3 sm:mx-4 md:mx-6 lg:mx-12 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={landscapeImg} className="w-full h-full object-cover opacity-30" alt="DrizzleDrop Overview" />
        </div>
        <div className="relative z-20 text-center px-4">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="label-caps text-primary mb-2 sm:mb-4">About Us</motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="heading-display text-2xl sm:text-3xl md:text-4xl lg:text-6xl"
          >
            The DrizzleDrop Experience
          </motion.h1>
        </div>
      </section>

      {/* Story */}
      <section className="section-padding">
        <div className="container-luxury max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center"
          >
            <div>
              <p className="font-serif text-lg sm:text-2xl md:text-3xl leading-relaxed text-foreground/90 mb-4 sm:mb-6 italic">
                "Where your mind, body, and soul will relax and become one with nature."
              </p>
              <p className="body-text text-xs sm:text-base mb-3 sm:mb-4">
                DrizzleDrop Inn Chennai is a sophisticated 3-star business hotel offering modern accommodation and smart facilities in the OMR IT Corridor.
              </p>
              <p className="body-text text-xs sm:text-base">
                DrizzleDrop Inn Ooty is a quaint retreat with 8 hill-view apartments, offering panoramic views of the Nilgiris hills and the famous toy train.
              </p>
            </div>
            <div className="bg-secondary/20 p-6 sm:p-8 rounded-lg sm:rounded-2xl border border-border/50">
              <h3 className="font-serif text-lg sm:text-xl font-bold mb-3 sm:mb-4">Right to Refuse Service</h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                DrizzleDrop Inn is privately owned and operated. We reserve the right to refuse service to anyone for reasons that do not violate laws.
                We maintain a zero-tolerance policy for disorderly conduct, unsafe behavior, or failure to comply with hotel standards.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Ooty History */}
      <section className="section-padding bg-background">
        <div className="container-luxury grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="relative h-[250px] sm:h-[300px] md:h-[400px] rounded-lg sm:rounded-2xl overflow-hidden shadow-lg md:shadow-2xl">
            <img src={storyImg} className="w-full h-full object-cover" alt="Ooty Hills" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-bottom p-6 sm:p-8">
              <p className="text-white font-serif text-lg">"Nilgiris means Blue Mountains"</p>
            </div>
          </div>
          <div>
            <SectionHeading label="Destinations" title="Queen of Hill Stations" />
            <p className="body-text mb-4">
              Udhagamandalam (Ooty), adorably called as the ‘Queen of Hill Stations’ or the ‘Paradise on Earth’, is well-known for its enchanting and scenic beauty.
            </p>
            <p className="body-text mb-4 text-sm leading-relaxed">
              As the headquarters of The Nilgiris district, Ooty is situated at an altitude of 2,240 meters above mean sea level. It is a land of picturesque picnic spots and has been a popular weekend getaway since the colonial era.
            </p>
            <div className="flex gap-4 items-center">
              <div className="h-[1px] bg-primary flex-1" />
              <span className="text-[9px] sm:text-[10px] uppercase tracking-widest font-bold text-primary">Discover Udhagamandalam</span>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-secondary/5">
        <div className="container-luxury">
          <SectionHeading label="Our Values" title="Prodigious Hospitality" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="glass-card p-6 sm:p-8 text-center group hover:border-primary/30 transition-all duration-500"
              >
                <v.icon className="w-6 sm:w-8 h-6 sm:h-8 text-primary mx-auto mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="font-serif text-lg sm:text-xl font-semibold mb-1 sm:mb-2">{v.title}</h3>
                <p className="body-text text-xs sm:text-sm">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Policies Section */}
      <section className="section-padding">
        <div className="container-luxury">
          <SectionHeading label="Information" title="Guest Policies" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mt-8 sm:mt-12">
            {policies.map((policy, i) => (
              <motion.div
                key={policy.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-4 sm:gap-6 p-4 sm:p-6 border border-border/50 rounded-lg sm:rounded-xl hover:bg-secondary/5 transition-colors"
              >
                <div className="bg-primary/10 p-2.5 sm:p-3 rounded-lg h-fit">
                  <policy.icon className="w-5 sm:w-6 h-5 sm:h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-serif text-lg sm:text-xl font-bold mb-2 sm:mb-3">{policy.title}</h3>
                  <ul className="space-y-1.5 sm:space-y-2">
                    {policy.items.map((item, idx) => (
                      <li key={idx} className="body-text text-xs sm:text-sm flex gap-2">
                        <span className="text-primary mt-0.5 sm:mt-1 shrink-0">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="section-padding bg-primary text-primary-foreground text-center">
        <div className="container-luxury">
          <h2 className="heading-display text-3xl md:text-5xl mb-6">Experience the lap of nature.</h2>
          <p className="max-w-xl mx-auto mb-10 opacity-80">Stop by DrizzleDrop Inn to enjoy a one-of-a-kind experience with Mother Nature.</p>
          <button className="px-10 py-4 bg-background text-foreground font-bold hover:bg-background/90 transition-colors uppercase tracking-widest text-xs">
            Contact Reservations
          </button>
        </div>
      </section>
    </div>
  );
}
