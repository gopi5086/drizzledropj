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
          <div className="absolute top-5 right-5 px-4 py-1.5 bg-white/90 backdrop-blur-md rounded-full shadow-xl border border-[#C5A861]/20">
            <span className="text-lg font-bold text-[#2E6B8A]">{room.price}</span>
            <span className="text-[10px] uppercase tracking-tighter text-muted-foreground"> / night</span>
          </div>
          <div className="absolute bottom-5 left-5">
            <span className="px-3 py-1 bg-[#C5A861] text-white text-[9px] font-bold uppercase tracking-widest rounded-full">{room.type}</span>
          </div>
        </div>
        <div className="p-7 flex-1 flex flex-col">
          <h3 className="text-2xl font-medium mb-3 group-hover:text-[#C5A861] transition-colors">{room.name}</h3>
          <p className="body-text text-sm mb-6 leading-relaxed text-muted-foreground/90">{room.desc}</p>
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

  // SEO via document head
  useEffect(() => {
    // Title
    document.title = location.seo.title;

    // Helper to upsert meta
    const setMeta = (selector: string, attr: string, value: string) => {
      let el = document.querySelector<HTMLMetaElement>(selector);
      if (!el) {
        el = document.createElement("meta");
        document.head.appendChild(el);
      }
      el.setAttribute(attr, value);
    };

    setMeta('meta[name="description"]', "content", location.seo.description);
    setMeta('meta[name="keywords"]', "content", location.seo.keywords);
    setMeta('meta[property="og:title"]', "content", location.seo.title);
    setMeta('meta[property="og:description"]', "content", location.seo.description);
    setMeta('meta[property="og:type"]', "content", "website");
    setMeta('meta[property="og:url"]', "content", location.seo.canonical);
    setMeta('meta[name="twitter:card"]', "content", "summary_large_image");
    setMeta('meta[name="twitter:title"]', "content", location.seo.title);
    setMeta('meta[name="twitter:description"]', "content", location.seo.description);

    // Canonical link
    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = location.seo.canonical;

    // JSON-LD structured data
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

      {/* About Section */}
      <section id="about" className="section-padding" style={{ paddingTop: "clamp(5rem, 10vw, 7rem)" }}>
        <div className="container-luxury">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <Reveal delay={0.1} width="100%">
              <div>
                <p className="label-caps !text-[#C5A861] mb-4">{location.about.label}</p>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 leading-tight">
                  {location.about.title}
                </h2>
                <p className="body-text text-base leading-relaxed mb-10 text-muted-foreground">
                  {location.about.subtitle}
                </p>
                <div className="flex flex-col gap-5">
                  {location.about.features.map((f, i) => (
                    <Reveal key={f.title} delay={0.2 + i * 0.1}>
                      <div className="flex gap-4 items-start">
                        <div
                          className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                          style={{ background: `${accentColor}20` }}
                        >
                          {(() => {
                            const Icon = featureIcons[i % featureIcons.length];
                            return <Icon className="w-5 h-5" style={{ color: accentColor }} />;
                          })()}
                        </div>
                        <div>
                          <h4 className="font-medium text-sm mb-1">{f.title}</h4>
                          <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
                        </div>
                      </div>
                    </Reveal>
                  ))}
                </div>
                <div className="mt-10 flex gap-4">
                  <button
                    onClick={() => openBooking({ location: location.fullName })}
                    className="px-7 py-3 text-white text-xs font-bold uppercase tracking-[0.2em] rounded-xl transition-all duration-300 hover:opacity-90 hover:shadow-xl"
                    style={{ background: accentColor }}
                  >
                    Book Your Stay
                  </button>
                  <Link
                    to={isChennai ? "/ooty/home" : "/chennai/home"}
                    className="px-7 py-3 border text-xs font-bold uppercase tracking-[0.2em] rounded-xl transition-all duration-300 hover:border-[#C5A861] hover:text-[#C5A861]"
                    style={{ borderColor: accentColor, color: accentColor }}
                  >
                    View {isChennai ? "Ooty" : "Chennai"} Property →
                  </Link>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.3} width="100%">
              <div className="overflow-hidden rounded-2xl h-full flex items-center justify-center bg-[rgba(0,0,0,0.02)] p-4">
                {isChennai ? (
                  <div className="w-full h-full bg-white rounded-2xl shadow-md p-6 flex flex-col justify-between">
                    <div>
                      <p className="label-caps text-[#C5A861] mb-3">Metropolitan Elegance</p>
                      <h3 className="text-2xl font-bold mb-3">Where Business Meets Luxury</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        DrizzleDrop Inn Chennai is a sophisticated 3-star business hotel located at Thoriaipakkam on the OMR IT Corridor. Featuring 35 well-furnished rooms with panoramic terrace, rooftop dining, and multi-cuisine delicacies — designed for the modern professional.
                      </p>

                      <div className="space-y-3 mt-4">
                        <div className="flex items-start gap-3">
                          <MapPin className="w-5 h-5 text-[#2E6B8A] mt-1" />
                          <div>
                            <h4 className="font-medium">Prime OMR Location</h4>
                            <p className="text-xs text-muted-foreground">Minutes from major IT parks, corporate offices, and Chennai's premier tech corridor.</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <Star className="w-5 h-5 text-[#2E6B8A] mt-1" />
                          <div>
                            <h4 className="font-medium">Rooftop Dining</h4>
                            <p className="text-xs text-muted-foreground">Enjoy multi-cuisine dining with panoramic city views from our exclusive rooftop restaurant.</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <Shield className="w-5 h-5 text-[#2E6B8A] mt-1" />
                          <div>
                            <h4 className="font-medium">Business Ready</h4>
                            <p className="text-xs text-muted-foreground">High-speed WiFi, 24-hour hot water, electricity backup, and secure parking for all guests.</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 flex gap-3">
                      <button
                        onClick={() => openBooking({ location: location.fullName })}
                        className="px-5 py-3 bg-[#2E6B8A] text-white rounded-md font-semibold hover:bg-[#255a75] transition"
                      >
                        Book Your Stay
                      </button>

                      <Link
                        to="/ooty"
                        className="px-5 py-3 border border-[#2E6B8A] text-[#2E6B8A] rounded-md font-semibold hover:bg-[#2E6B8A]/5 transition"
                      >
                        View Ooty Property →
                      </Link>
                    </div>
                  </div>
                ) : (
                  location.gallery[0] ? (
                    <img
                      src={location.gallery[0].src}
                      alt={location.gallery[0].alt}
                      className="w-full h-full object-cover rounded-2xl"
                    />
                  ) : (
                    <div className="p-8 text-center">
                      <h4 className="text-lg font-semibold">{location.name}</h4>
                      <p className="text-sm text-muted-foreground">{location.about.subtitle}</p>
                    </div>
                  )
                )}
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
                  className={`w-full object-cover group-hover:scale-110 transition-transform duration-700 ${
                    i % 4 === 0 ? "h-56 sm:h-72" : i % 4 === 1 ? "h-48 sm:h-64" : i % 4 === 2 ? "h-56 sm:h-64" : "h-48 sm:h-60"
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
                      <div key={att.name} className="flex justify-between items-center text-sm border-b border-border/20 pb-2">
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
      <section id="contact" className="section-padding bg-card/50">
        <div className="container-luxury">
          <Reveal width="100%">
            <SectionHeading label="Get in Touch" title={`Contact ${location.name} Property`} />
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto mt-10">
            {[
              { icon: MessageCircle, label: "WhatsApp", value: location.contact.phone, href: location.contact.whatsapp },
              { icon: Mail, label: "Email", value: location.contact.email, href: `mailto:${location.contact.email}` },
              { icon: Phone, label: "Phone", value: location.contact.phone, href: `tel:${location.contact.phone}` },
            ].map(({ icon: Icon, label, value, href }, i) => (
              <Reveal key={label} delay={0.2 + i * 0.1}>
                <a
                  href={href}
                  className="glass-card p-6 text-center group hover:border-primary/30 transition-all duration-500 hover-gold-glow block h-full"
                >
                  <Icon className="w-8 h-8 text-primary mx-auto mb-3 group-hover:scale-110 transition-transform duration-300" />
                  <p className="label-caps mb-1">{label}</p>
                  <p className="text-sm text-foreground/80">{value}</p>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>


    </>
  );
}
