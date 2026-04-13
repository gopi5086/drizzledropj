import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Star, MapPin, Wifi, Car, Shield, MessageCircle, Phone, Mail,
  ArrowRight, ZoomIn, Mountain, Building2,
} from "lucide-react";
import { LocationConfig } from "@/data/locationData";
import LocationHero from "@/components/LocationHero";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import { useBooking } from "@/context/BookingContext";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import DealsSection from "./DealsSection";
import SEO from "@/components/SEO";

const featureIcons = [Wifi, Shield, Car, Mountain, Building2];

const faqs = [
  { q: "What time is check-in and check-out?", a: "Check-in is at 12:00 PM and check-out is at 11:00 AM. Early check-in and late check-out are available upon request and subject to availability." },
  { q: "Is parking available?", a: "Yes, we offer complimentary secure parking at both our Chennai and Ooty properties." },
  { q: "Are pets allowed?", a: "Yes! DrizzleDrop Inn is pet friendly. Please inform us during booking so we can prepare your room." },
  { q: "What payment methods do you accept?", a: "We accept all major credit/debit cards, GPay, PhonePe, Paytm, and WhatsApp Pay." },
];


interface Props {
  location: LocationConfig;
}

function RoomCard({ room }: { room: LocationConfig["rooms"][0] }) {
  const { openBooking } = useBooking();
  return (
    <Reveal direction="up">
      <div className="group bg-white rounded-3xl overflow-hidden border border-border/40 hover:border-[#C5A861]/30 transition-all duration-700 hover:shadow-[0_30px_60px_rgba(0,0,0,0.08)] h-full flex flex-col">
        <div className="relative h-64 overflow-hidden">
          <img
            src={room.image}
            alt={`${room.name} at DrizzleDrop Inn`}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s]"
          />
          <div className="absolute top-5 right-5 flex flex-col gap-2 items-end min-w-[150px]">
            {(room.epPrice || room.cpPrice) ? (
              <div className="px-4 py-2.5 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-[#C5A861]/20 flex flex-col gap-1 w-full scale-90 origin-top-right">
                {room.epPrice && (
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-[8px] uppercase tracking-wider font-bold text-gray-500">EP <span className="font-medium opacity-60">(Room Only)</span></span>
                    <span className="text-sm font-extrabold text-[#2a2a2a]">{room.epPrice}</span>
                  </div>
                )}
                {room.cpPrice && (
                  <div className="flex items-center justify-between gap-3 border-t border-gray-100 pt-1 mt-0.5">
                    <span className="text-[8px] uppercase tracking-wider font-bold text-gray-500">CP <span className="font-medium opacity-60">(W/ BFast)</span></span>
                    <span className="text-sm font-extrabold text-[#2a2a2a]">{room.cpPrice}</span>
                  </div>
                )}
              </div>
            ) : room.price && (
              <div className="px-4 py-1.5 bg-white/90 backdrop-blur-md rounded-full shadow-xl border border-[#C5A861]/20">
                <span className="text-lg font-bold text-[#2E6B8A]">{room.price}</span>
                <span className="text-[10px] uppercase tracking-tighter text-muted-foreground"> / night</span>
              </div>
            )}
          </div>
          <div className="absolute bottom-5 left-5">
            <span className="px-3 py-1 bg-[#C5A861] text-white text-[9px] font-bold uppercase tracking-widest rounded-full">{room.type}</span>
          </div>
        </div>
        <div className="p-7 flex-1 flex flex-col">
          <h3 className="text-2xl font-medium mb-1 group-hover:text-[#C5A861] transition-colors">{room.name}</h3>
          <p className="px-3 py-1 bg-[#2E6B8A]/5 text-[#2E6B8A] text-[9px] font-bold uppercase tracking-wider rounded-md w-fit mb-4">{room.type}</p>
          <p className="body-text text-sm mb-6 leading-relaxed text-muted-foreground/90 min-h-[4.5rem]">
            {room.desc}
          </p>
          <div className="grid grid-cols-2 gap-3 mb-7 mt-auto">
            {room.amenities.map((a) => (
              <div key={a} className="flex items-center gap-2 text-xs font-medium text-foreground/70">
                <div className="h-1.5 w-1.5 rounded-full bg-[#C5A861]" />
                {a}
              </div>
            ))}
          </div>
          <button
            onClick={() => openBooking({ roomType: room.name })}
            className="w-full group/btn relative overflow-hidden px-8 py-4 bg-[#2E6B8A] text-white text-xs font-bold tracking-[0.2em] uppercase rounded-xl transition-all duration-500 hover:shadow-[0_10px_20px_rgba(46,107,138,0.2)]"
          >
            <span className="relative z-10 flex items-center justify-center gap-3">
              Book This Room
              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-2 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-[#C5A861] translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500" />
          </button>
        </div>
      </div>
    </Reveal>
  );
}

export default function LocationPage({ location }: Props) {
  const { openBooking } = useBooking();
  const [lightbox, setLightbox] = useState<string | null>(null);

  useEffect(() => {
    // JSON-LD structured data is safely handled here
    const existingScript = document.getElementById("location-schema");
    if (existingScript) existingScript.remove();
    const script = document.createElement("script");
    script.id = "location-schema";
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(location.schema);
    document.head.appendChild(script);

    return () => {
      const s = document.getElementById("location-schema");
      if (s) s.remove();
    };
  }, [location]);

  const isChennai = location.key === "chennai";
  const accentColor = isChennai ? "#2E6B8A" : "#3a7d5a";

  return (
    <>
      <SEO
        title={location.seo.title}
        description={location.seo.description}
        url={location.seo.canonical}
      />
      {/* Hero */}
      <LocationHero location={location} />

      {/* Location Identity Banner */}
      <div
        className="py-4 text-center text-xs font-medium tracking-[0.25em] uppercase text-white"
        style={{ background: `linear-gradient(90deg, ${accentColor}, ${isChennai ? "#3a7d5a" : "#2E6B8A"})` }}
      >
        <span className="flex items-center justify-center gap-3">
          <MapPin className="w-4 h-4" />
          {location.contact.address}
          <span className="hidden sm:inline opacity-70">·</span>
          <a href={`tel:${location.contact.phone}`} className="hidden sm:inline hover:opacity-80 transition-opacity">
            {location.contact.phone}
          </a>
        </span>
      </div>

      {/* Deals & Promotions */}
      <DealsSection location={location.key === "chennai" ? "Chennai" : "Ooty"} />

      {/* About Section */}
      <section id="about" className="section-padding" style={{ paddingTop: "clamp(5rem, 10vw, 7rem)" }}>
        <div className="container-luxury">
          <div className={"max-w-6xl mx-auto"}>
            <Reveal delay={0.1} width="100%">
              <div className={"text-center flex flex-col items-center"}>
                <p className={"label-caps !text-[#C5A861] mb-4 mx-auto"}>{location.about.label}</p>
                <h2 className={"text-3xl sm:text-4xl md:text-5xl font-bold mb-6 leading-tight max-w-4xl"}>
                  {location.about.title}
                </h2>
                <p className={"body-text text-base leading-relaxed mb-10 text-muted-foreground max-w-3xl text-lg"}>
                  {location.about.subtitle}
                </p>
                <div className={`grid grid-cols-1 md:grid-cols-2 ${location.about.features.length === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'} gap-8 mt-8 w-full text-left`}>
                  {location.about.features.map((f, i) => (
                    <Reveal key={f.title} delay={0.2 + i * 0.1}>
                      <div className={`flex gap-4 flex-col items-center text-center p-8 bg-white border rounded-3xl shadow-sm hover:-translate-y-2 transition-all duration-300 h-full group ${isChennai ? 'border-[#2E6B8A]/10 hover:shadow-[0_20px_40px_rgba(46,107,138,0.08)]' : 'border-[#3a7d5a]/10 hover:shadow-[0_20px_40px_rgba(58,125,90,0.08)]'}`}>
                        <div
                          className={`flex items-center justify-center flex-shrink-0 w-16 h-16 rounded-[1rem] mx-auto mb-4 bg-[#f8faf9] group-hover:scale-110 transition-transform duration-300 shadow-inner border ${isChennai ? 'border-[#2E6B8A]/5' : 'border-[#3a7d5a]/5'}`}
                        >
                          {(() => {
                            const Icon = featureIcons[i % featureIcons.length];
                            return <Icon className={"w-7 h-7"} style={{ color: accentColor }} />;
                          })()}
                        </div>
                        <div className={"w-full flex-1"}>
                          <h4 className={"font-medium text-lg font-display font-bold mb-3 text-gray-900"}>{f.title}</h4>
                          <p className={"text-xs text-muted-foreground leading-relaxed text-[14px] text-gray-600"}>{f.desc}</p>
                        </div>
                      </div>
                    </Reveal>
                  ))}
                </div>
                <div className={"flex flex-wrap gap-4 mt-16 justify-center w-full"}>
                  <button
                    onClick={() => openBooking({ location: location.fullName })}
                    className="px-8 py-3.5 text-white text-xs font-bold uppercase tracking-[0.2em] rounded-xl transition-all duration-300 hover:opacity-90 hover:shadow-xl transform hover:-translate-y-0.5"
                    style={{ background: accentColor }}
                  >
                    Book Your Stay
                  </button>
                  <Link
                    to={isChennai ? "/ooty" : "/chennai"}
                    className="px-8 py-3.5 border text-xs font-bold uppercase tracking-[0.2em] rounded-xl transition-all duration-300 hover:border-[#C5A861] hover:text-[#C5A861] hover:bg-[#C5A861]/5 transform hover:-translate-y-0.5"
                    style={{ borderColor: accentColor, color: accentColor }}
                  >
                    View {isChennai ? "Ooty" : "Chennai"} Property →
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Rooms */}
      <section id="rooms" className="section-padding bg-[#fdfdfd]">
        <div className="container-luxury">
          <Reveal width="100%">
            <SectionHeading
              label="Our Rooms"
              title={`Accomodations in ${location.name}`}
              subtitle={`Choose from our carefully curated range of rooms at DrizzleDrop Inn ${location.name}`}
            />
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mt-12">
            {location.rooms.map((room) => (
              <RoomCard key={room.name} room={room} />
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Strip */}
      <section
        id="gallery"
        className="section-padding overflow-hidden"
        style={{
          background: isChennai
            ? "linear-gradient(135deg, #F8F9FA 0%, #F4F1EC 100%)"
            : "linear-gradient(135deg, #F5F7F6 0%, #E6F0EA 100%)"
        }}
      >
        <div className="container-luxury">
          <Reveal width="100%">
            <SectionHeading
              label="Photo Gallery"
              title={`${location.name} in Pictures`}
              subtitle={`A visual tour of DrizzleDrop Inn ${location.name}`}
            />
          </Reveal>
          <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 sm:gap-6 space-y-4 sm:space-y-6 mt-10">
            {location.gallery.slice(0, 12).map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: Math.min(i * 0.05, 0.4), duration: 0.4 }}
                className="break-inside-avoid group relative overflow-hidden cursor-pointer mb-4 sm:mb-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500"
                onClick={() => setLightbox(img.src)}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className={`w-full object-cover group-hover:scale-110 transition-transform duration-700 ${i % 4 === 0 ? "h-56 sm:h-72" : i % 4 === 1 ? "h-48 sm:h-64" : i % 4 === 2 ? "h-56 sm:h-64" : "h-48 sm:h-60"
                    }`}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <ZoomIn className="w-8 h-8 text-white drop-shadow-md opacity-0 group-hover:opacity-100 transition-all duration-500 scale-75 group-hover:scale-100" />
                </div>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              to={`/gallery?location=${location.key}`}
              className="inline-flex items-center gap-3 px-8 py-3.5 border border-[#C5A861]/40 text-[#C5A861] text-[10px] font-bold uppercase tracking-[0.25em] rounded-full hover:bg-[#C5A861] hover:text-white transition-all duration-500 shadow-md hover:shadow-lg"
            >
              View Full Gallery
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: "spring", damping: 22 }}
              className="relative max-w-5xl max-h-[90vh] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img src={lightbox} alt="Gallery view" className="w-full h-full object-contain max-h-[88vh] rounded-lg" />
              <button
                onClick={() => setLightbox(null)}
                className="absolute top-3 right-3 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center border border-white/20"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Testimonials */}
      <section id="reviews" className="section-padding bg-card/50">
        <div className="container-luxury">
          <Reveal width="100%">
            <SectionHeading label="Guest Reviews" title={`Loved by ${location.name} Guests`} />
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-10">
            {location.testimonials.map((r, i) => (
              <Reveal key={i} delay={0.1 * i}>
                <div className="glass-card p-6 hover:border-primary/30 transition-all duration-500 h-full">
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star key={j} className={`w-4 h-4 ${j < r.rating ? "text-[#C5A861] fill-[#C5A861]" : "text-muted"}`} />
                    ))}
                  </div>
                  <p className="text-sm text-foreground/80 mb-4 italic">"{r.text}"</p>
                  <p className="label-caps text-[10px]">{r.name}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Map + Attractions */}
      <section id="location" className="section-padding">
        <div className="container-luxury">
          <Reveal width="100%">
            <SectionHeading label="Find Us" title={`Explore ${location.name}`} />
          </Reveal>
          <div className={`grid ${location.nearbyAttractions ? "lg:grid-cols-3" : "lg:grid-cols-1"} gap-8`}>
            <div className={location.nearbyAttractions ? "lg:col-span-2" : "w-full"}>
              <Reveal delay={0.2} width="100%">
                <div className="border border-border/50 overflow-hidden rounded-xl">
                  <iframe
                    title={`DrizzleDrop ${location.name}`}
                    src={location.contact.mapEmbed}
                    width="100%"
                    height="350"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                  />
                  <div className="p-4 bg-card border-t border-border/50">
                    <h4 className="text-lg font-semibold">{location.fullName}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{location.contact.address}</p>
                  </div>
                </div>
              </Reveal>
            </div>
            {location.nearbyAttractions && (
              <Reveal delay={0.4} width="100%">
                <div className="bg-secondary/10 p-6 sm:p-8 rounded-xl border border-border/50 h-full">
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-primary" />
                    Nearby Attractions
                  </h3>
                  <div className="space-y-3 max-h-[350px] overflow-y-auto pr-2">
                    {location.nearbyAttractions.map((att) => (
                      <div key={att.name} className="flex justify-between items-center text-sm border-b border-border/20 pb-2 mb-2">
                        <span className="font-medium">{att.name}</span>
                        <span className="text-muted-foreground text-xs">{att.dist}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            )}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="section-padding bg-secondary/5">
        <div className="container-luxury max-w-3xl">
          <Reveal width="100%">
            <SectionHeading label="FAQ" title="Frequently Asked Questions" />
          </Reveal>
          <Reveal delay={0.3} width="100%">
            <Accordion type="single" collapsible className="space-y-2">
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="glass-card border border-border/50 px-6">
                  <AccordionTrigger className="text-left text-lg hover:text-primary transition-colors">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="body-text text-sm">{faq.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="section-padding bg-card/50 scroll-mt-28">
        <div className="container-luxury">
          <Reveal width="100%">
            <SectionHeading label="Get in Touch" title={`Contact ${location.name} Property`} />
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mt-12 px-4">
            {[
              {
                icon: MessageCircle,
                label: "WhatsApp",
                value: isChennai ? "+91 97911 78349" : "+91 91504 86153",
                href: `https://wa.me/${(isChennai ? "919791178349" : "919150486153")}`,
                description: "Instant chat with our team",
                color: "#25D366"
              },
              {
                icon: Mail,
                label: "Email",
                value: location.contact.email,
                href: `mailto:${location.contact.email}`,
                description: `Email our ${location.name} reception`,
                color: "#C5A861"
              },
              {
                icon: Phone,
                label: "Phone",
                value: location.contact.phone,
                href: `tel:${location.contact.phone.replace(/\s+/g, "")}`,
                description: isChennai ? "Landline: +91 44 24580009" : "Landline: +91 423 2440552",
                color: "#2E6B8A"
              },
            ].map(({ icon: Icon, label, value, href, description, color }, i) => (
              <Reveal key={label} delay={0.2 + i * 0.1}>
                <a
                  href={href}
                  className="group relative block h-full w-full mx-auto max-w-sm md:max-w-none"
                >
                  <div className="glass-card p-10 flex flex-col items-center text-center h-full transition-all duration-500 border border-[#C5A861]/10 group-hover:border-[#C19E5F]/40 group-hover:translate-y-[-8px] hover-gold-glow overflow-hidden">
                    <div
                      className="w-16 h-16 rounded-[1.25rem] flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-110 shadow-lg"
                      style={{ background: `${color}10` }}
                    >
                      <Icon className="w-8 h-8" style={{ color: color }} />
                    </div>
                    <h4 className="text-xl font-bold mb-2 text-gray-900 tracking-tight font-display">{label}</h4>
                    <p className="text-[#C5A861] font-bold text-base mb-3 tracking-wide">{value}</p>
                    <p className="text-muted-foreground text-xs leading-relaxed max-w-[200px]">{description}</p>

                    <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-all duration-500" />
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
