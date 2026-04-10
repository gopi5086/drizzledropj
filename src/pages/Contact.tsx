import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SectionHeading from "@/components/SectionHeading";
import { MapPin, Phone, Mail, ZoomIn, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import Reveal from "@/components/Reveal";
import { useBooking } from "@/context/BookingContext";
import { locationMap } from "@/data/locationData";

export default function Contact() {
  const { locationId } = useParams<{ locationId?: string }>();
  const navigate = useNavigate();
  const { openBooking } = useBooking();
  const loc = locationId ? locationId.toLowerCase() : "";
  const locationData = loc ? locationMap[loc] : null;

  useEffect(() => {
    if (loc && !["ooty", "chennai"].includes(loc)) {
      navigate("/contact", { replace: true });
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [loc, navigate]);

  const isOoty = loc === "ooty";

  if (!loc || !locationData || !isOoty) {
    // Basic contact page for Chennai or generic /contact
    const displayData = locationData || locationMap["chennai"];
    return (
      <div className="pt-24 min-h-screen">
        <section id="contact" className="section-padding bg-card/50 min-h-[60vh] flex items-center">
          <div className="container-luxury w-full">
            <Reveal width="100%">
              <SectionHeading label="Get in Touch" title={`Contact ${displayData.name} Property`} />
            </Reveal>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto mt-10">
              {[
                { icon: MessageCircle, label: "WhatsApp", value: displayData.contact.phone, href: displayData.contact.whatsapp },
                { icon: Mail, label: "Email", value: displayData.contact.email, href: `mailto:${displayData.contact.email}` },
                { icon: Phone, label: "Phone", value: displayData.contact.phone, href: `tel:${displayData.contact.phone}` },
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
      </div>
    );
  }

  // Ooty Premium Contact Section as requested
  return (
    <div className="pt-20 lg:pt-24 min-h-screen bg-[#f8faf9] flex flex-col">
      <section id="contact" className="relative pb-24 flex-1 flex flex-col">
        {/* Header Section (Hero Style) */}
        <div className="relative pt-12 md:pt-16 pb-32 overflow-hidden border-t border-[#3a7d5a]/10 shrink-0">
          <div className="absolute inset-0 bg-gradient-to-r from-[#1a3324] to-[#254d36]" />
          <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1542224566-6e85f2e6772f?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center mix-blend-screen" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#f8faf9]" />
          <div className="container-luxury relative z-10 text-center">
            <Reveal delay={0.1} width="100%">
              <div className="max-w-4xl mx-auto space-y-6">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-[#C5A861] drop-shadow-lg px-4 leading-tight">
                  Connecting You from Inquiries to Reservations
                </h2>
                <p className="text-white text-lg md:text-xl font-medium leading-relaxed px-4 opacity-95">
                  Feel free to reach out with any questions or feedback. We'd love to hear from you!
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.3} width="100%">
              <h3 className="text-sm md:text-base font-display font-bold text-white/60 mt-12 tracking-[0.25em] uppercase">
                Contact Us – DrizzleDrop Inn, Ooty
              </h3>
            </Reveal>
          </div>
        </div>

        <div className="container-luxury relative z-20 -mt-20">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 bg-white p-6 md:p-10 rounded-[2rem] shadow-[0_20px_50px_rgba(58,125,90,0.1)] border border-[#3a7d5a]/10">
            
            {/* Contact Information Cards */}
            <div className="lg:col-span-2 flex flex-col gap-5 h-full">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex-1 bg-[#f3f7f5] p-6 rounded-[1.5rem] flex items-start gap-5 hover:shadow-xl hover:-translate-y-1 hover:bg-white hover:border-[#3a7d5a]/20 transition-all duration-300 group border border-[#3a7d5a]/5"
              >
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center flex-shrink-0 shadow-[0_4px_20px_rgb(0,0,0,0.05)] group-hover:shadow-[0_4px_20px_rgba(58,125,90,0.15)] group-hover:scale-110 transition-all duration-300 transform-gpu text-[#3a7d5a]">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2 font-display text-lg">Address</h4>
                    <p className="text-gray-600 leading-relaxed text-sm lg:text-base font-medium">
                      DrizzleDrop Inn<br />
                      215 H, Dispensary Road,<br />
                      Fern Hill, Ooty,<br />
                      Tamil Nadu – 643004
                    </p>
                  </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex-1 bg-[#f3f7f5] p-6 rounded-[1.5rem] flex items-start gap-5 hover:shadow-xl hover:-translate-y-1 hover:bg-white hover:border-[#3a7d5a]/20 transition-all duration-300 group border border-[#3a7d5a]/5"
              >
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center flex-shrink-0 shadow-[0_4px_20px_rgb(0,0,0,0.05)] group-hover:shadow-[0_4px_20px_rgba(58,125,90,0.15)] group-hover:scale-110 transition-all duration-300 transform-gpu text-[#3a7d5a]">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div className="w-full">
                    <h4 className="font-bold text-gray-900 mb-2 font-display text-lg">Phone Numbers</h4>
                    <div className="space-y-1">
                      <a href="tel:+919150486153" className="block text-gray-600 hover:text-[#3a7d5a] transition-colors text-sm lg:text-base font-medium">+91 91504 86153</a>
                      <a href="tel:+919962822355" className="block text-gray-600 hover:text-[#3a7d5a] transition-colors text-sm lg:text-base font-medium">+91 9962822355</a>
                      <a href="tel:+919884912880" className="block text-gray-600 hover:text-[#3a7d5a] transition-colors text-sm lg:text-base font-medium">+91 9884912880</a>
                    </div>
                    <h4 className="font-bold text-gray-900 mt-5 mb-2 font-display text-lg">Landline</h4>
                    <a href="tel:+914232440552" className="block text-gray-600 hover:text-[#3a7d5a] transition-colors text-sm lg:text-base font-medium">+91 423 2440552</a>
                  </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="flex-1 bg-[#f3f7f5] p-6 rounded-[1.5rem] flex items-start gap-5 hover:shadow-xl hover:-translate-y-1 hover:bg-white hover:border-[#3a7d5a]/20 transition-all duration-300 group border border-[#3a7d5a]/5"
              >
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center flex-shrink-0 shadow-[0_4px_20px_rgb(0,0,0,0.05)] group-hover:shadow-[0_4px_20px_rgba(58,125,90,0.15)] group-hover:scale-110 transition-all duration-300 transform-gpu text-[#3a7d5a]">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2 font-display text-lg">Email</h4>
                    <a href="mailto:stay@drizzledropinn.com" className="text-gray-600 hover:text-[#3a7d5a] transition-colors text-sm lg:text-base font-medium break-all block">
                      stay@drizzledropinn.com
                    </a>
                  </div>
              </motion.div>
            </div>

            <div className="lg:col-span-3 flex flex-col gap-6 h-full">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex-1 min-h-[350px] relative w-full rounded-[1.5rem] overflow-hidden group border border-[#3a7d5a]/20 shadow-md"
              >
                  <iframe
                    title="DrizzleDrop Inn Ooty Location"
                    src={locationData.contact.mapEmbed}
                    width="100%"
                    height="100%"
                    style={{ border: 0, filter: 'contrast(1.05) brightness(0.95)' }}
                    allowFullScreen
                    loading="lazy"
                    className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute top-4 right-4 animate-fade-in-slow">
                    <div className="bg-white/90 backdrop-blur-md text-xs font-bold uppercase tracking-widest text-[#3a7d5a] px-4 py-2 rounded-full shadow-lg border border-[#3a7d5a]/10 flex items-center gap-2">
                      <ZoomIn className="w-3.5 h-3.5" /> Map View
                    </div>
                  </div>
                  <div className="absolute bottom-5 left-5 right-5 flex justify-center">
                    <a 
                      href="https://maps.app.goo.gl/UFnT4QX2u6FcCYZk7" 
                      target="_blank" 
                      rel="noreferrer"
                      className="bg-white/95 backdrop-blur-md text-[#3a7d5a] px-7 py-3.5 rounded-full font-bold shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgba(58,125,90,0.3)] hover:bg-[#3a7d5a] hover:text-white transition-all duration-300 flex items-center gap-2 text-sm uppercase tracking-widest transform hover:-translate-y-1"
                    >
                      <MapPin className="w-4 h-4" /> Get Directions
                    </a>
                  </div>
              </motion.div>

              {/* Call-to-Action Section */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="bg-gradient-to-br from-[#3a7d5a] to-[#25523a] p-8 md:p-10 rounded-[1.5rem] flex flex-col xl:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden group"
              >
                   {/* Decorative background circle */}
                   <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full mix-blend-overlay group-hover:scale-150 transition-transform duration-700 pointer-events-none" />
                   <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#C5A861]/10 rounded-full mix-blend-overlay group-hover:scale-150 transition-transform duration-700 pointer-events-none" />
                   
                   <div className="relative z-10 text-center xl:text-left w-full xl:w-auto">
                     <h3 className="text-white text-2xl md:text-3xl font-bold mb-2 font-display">Ready to visit Ooty?</h3>
                     <p className="text-white/80 text-sm md:text-base">Secure your reservation or drop us a message.</p>
                   </div>
                   <div className="relative z-10 flex flex-col sm:flex-row w-full xl:w-auto gap-4 shrink-0">
                     <a href="mailto:stay@drizzledropinn.com" className="w-full sm:w-auto px-7 py-3.5 border border-white/30 text-white rounded-xl font-bold text-sm tracking-widest uppercase hover:bg-white hover:text-[#3a7d5a] hover:border-transparent transition-all shadow-sm transform hover:-translate-y-0.5 text-center">
                       Send an Inquiry
                     </a>
                     <button onClick={() => openBooking({ location: locationData.fullName })} className="w-full sm:w-auto px-7 py-3.5 bg-[#C5A861] text-white rounded-xl font-bold text-sm tracking-widest uppercase hover:bg-white hover:text-[#C5A861] transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 shadow-[#C5A861]/20">
                       Book Your Stay
                     </button>
                   </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
