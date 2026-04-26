import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SEO from "@/components/SEO";
import SectionHeading from "@/components/SectionHeading";
import { MapPin, Phone, Mail, ZoomIn, MessageCircle, HelpCircle, Building2 } from "lucide-react";
import { motion } from "framer-motion";
import Reveal from "@/components/Reveal";
import { useBooking } from "@/context/BookingContext";
import { locationMap } from "@/data/locationData";

const ChennaiContact = ({ locationData, openBooking }: any) => (
  <div className="pt-20 lg:pt-24 min-h-screen bg-[#f8faf9] flex flex-col">
    <section id="contact" className="relative pb-24 flex-1 flex flex-col">
      {/* Header Section (Hero Style) */}
      <div className="relative pt-12 md:pt-16 pb-32 overflow-hidden border-t border-[#2E6B8A]/10 shrink-0">
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a232f] to-[#16374a]" />
        <div className="container-luxury relative z-10 text-center">
          <Reveal delay={0.1} width="100%">
            <div className="max-w-4xl mx-auto space-y-6">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-[#C5A861] drop-shadow-lg px-4 leading-tight">
                Connecting You from Inquiries to Reservations
              </h2>
              <p className="text-white text-lg md:text-xl font-medium leading-relaxed px-4 opacity-95">
                Feel free to reach out with any questions, booking inquiries, or feedback. Our team is always ready to assist you and ensure a smooth and comfortable stay at DrizzleDrop Inn, Chennai.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.3} width="100%">
            <h3 className="text-sm md:text-base font-display font-bold text-white/60 mt-12 tracking-[0.25em] uppercase">
              Contact Us – DrizzleDrop Inn, Chennai
            </h3>
          </Reveal>
        </div>
      </div>

      <div className="container-luxury relative z-20 -mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 bg-white p-6 md:p-10 rounded-[2rem] shadow-[0_20px_50px_rgba(46,107,138,0.1)] border border-[#2E6B8A]/10">
          
          {/* Contact Information Cards */}
          <div className="lg:col-span-2 flex flex-col gap-5 h-full">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex-1 bg-[#f0f4f8] p-6 lg:p-8 rounded-[2rem] flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-5 hover:shadow-xl hover:-translate-y-1 hover:bg-white transition-all duration-300 group border border-[#2E6B8A]/5 shadow-sm"
            >
                <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-all duration-300 text-[#2E6B8A]">
                  <Building2 className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-2 font-display text-lg">Our Location</h4>
                  <p className="text-gray-600 leading-relaxed text-sm lg:text-base font-medium">
                    A4, 4/476/77, Chandrasekaran Avenue,<br />
                    1st Main Road, Thoraipakkam,<br />
                    Chennai, Tamil Nadu – 600097
                  </p>
                </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex-1 bg-[#f0f4f8] p-6 lg:p-8 rounded-[2rem] flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-5 hover:shadow-xl hover:-translate-y-1 hover:bg-white transition-all duration-300 group border border-[#2E6B8A]/5 shadow-sm"
            >
                <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-all duration-300 text-[#2E6B8A]">
                  <Phone className="w-6 h-6" />
                </div>
                <div className="w-full">
                  <h4 className="font-bold text-gray-900 mb-2 font-display text-lg">Mobile</h4>
                  <div className="space-y-1">
                    <a href="tel:+919791178349" className="block text-gray-600 hover:text-[#2E6B8A] transition-colors text-sm lg:text-base font-medium">+91 97911 78349</a>
                    <a href="tel:+919962823455" className="block text-gray-600 hover:text-[#2E6B8A] transition-colors text-sm lg:text-base font-medium">+91 99628 23455</a>
                    <a href="tel:+918438861737" className="block text-gray-600 hover:text-[#2E6B8A] transition-colors text-sm lg:text-base font-medium">+91 84388 61737</a>
                  </div>
                  <h4 className="font-bold text-gray-900 mt-5 mb-2 font-display text-lg">Landline</h4>
                  <a href="tel:+914424580009" className="block text-gray-600 hover:text-[#2E6B8A] transition-colors text-sm lg:text-base font-medium">+91 44 24580009</a>
                </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex-1 bg-[#f0f4f8] p-6 lg:p-8 rounded-[2rem] flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-5 hover:shadow-xl hover:-translate-y-1 hover:bg-white transition-all duration-300 group border border-[#2E6B8A]/5 shadow-sm"
            >
                <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-all duration-300 text-[#2E6B8A]">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-2 font-display text-lg">Email</h4>
                  <a href="mailto:stay@drizzledropinn.com" className="text-gray-600 hover:text-[#2E6B8A] transition-colors text-sm lg:text-base font-medium break-all block mb-1">
                    stay@drizzledropinn.com
                  </a>
                  <a href="mailto:drizzledropinnchennai@gmail.com" className="text-gray-600 hover:text-[#2E6B8A] transition-colors text-sm lg:text-base font-medium break-all block">
                    drizzledropinnchennai@gmail.com
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
              className="flex-[0.6] min-h-[250px] relative w-full rounded-[1.5rem] overflow-hidden group border border-[#2E6B8A]/20 shadow-md"
            >
                <iframe
                  title="DrizzleDrop Inn Chennai Location"
                  src={locationData.contact.mapEmbed}
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'contrast(1.05) brightness(0.95)' }}
                  allowFullScreen
                  loading="lazy"
                  className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute top-4 right-4 animate-fade-in-slow">
                  <div className="bg-white/90 backdrop-blur-md text-xs font-bold uppercase tracking-widest text-[#2E6B8A] px-4 py-2 rounded-full shadow-lg border border-[#2E6B8A]/10 flex items-center gap-2">
                    <ZoomIn className="w-3.5 h-3.5" /> Map View
                  </div>
                </div>
                <div className="absolute bottom-5 left-5 right-5 flex justify-center">
                  <a 
                    href="https://maps.app.goo.gl/dt4GbZh5JwkRB86C6" 
                    target="_blank" 
                    rel="noreferrer"
                    className="bg-white/95 backdrop-blur-md text-[#2E6B8A] px-7 py-3.5 rounded-full font-bold shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgba(46,107,138,0.3)] hover:bg-[#2E6B8A] hover:text-white transition-all duration-300 flex items-center gap-2 text-sm uppercase tracking-widest transform hover:-translate-y-1"
                  >
                    <MapPin className="w-4 h-4" /> Get Directions
                  </a>
                </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex-[0.4] bg-[#fdfdfd] border border-gray-100 p-6 md:p-8 rounded-[1.5rem] shadow-sm flex flex-col justify-center"
            >
               <h4 className="font-bold text-gray-900 font-display text-xl mb-4 flex items-center gap-2"><HelpCircle className="w-5 h-5 text-[#2E6B8A]"/> Reach Us Anytime:</h4>
               <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm lg:text-base text-gray-600 font-medium">
                 <li className="flex items-start gap-2"><span className="text-[#2E6B8A] font-bold mt-0.5">•</span> Room bookings & reservations</li>
                 <li className="flex items-start gap-2"><span className="text-[#2E6B8A] font-bold mt-0.5">•</span> Corporate stays and business inquiries</li>
                 <li className="flex items-start gap-2"><span className="text-[#2E6B8A] font-bold mt-0.5">•</span> Special requests & customized packages</li>
                 <li className="flex items-start gap-2"><span className="text-[#2E6B8A] font-bold mt-0.5">•</span> Travel assistance & local guidance</li>
                 <li className="flex items-start gap-2"><span className="text-[#2E6B8A] font-bold mt-0.5">•</span> General inquiries and feedback</li>
               </ul>
            </motion.div>

            {/* Call-to-Action Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-gradient-to-br from-[#1a232f] to-[#2E6B8A] p-6 lg:p-10 rounded-[1.5rem] flex flex-col xl:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden group"
            >
                 <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full mix-blend-overlay group-hover:scale-150 transition-transform duration-700 pointer-events-none" />
                 <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#C5A861]/10 rounded-full mix-blend-overlay group-hover:scale-150 transition-transform duration-700 pointer-events-none" />
                 
                 <div className="relative z-10 text-center xl:text-left w-full xl:w-auto flex-1">
                   <h3 className="text-white text-lg lg:text-xl font-bold font-display tracking-wide leading-relaxed">
                     We look forward to welcoming you to DrizzleDrop Inn, Chennai and making your stay truly comfortable and memorable.
                   </h3>
                 </div>
                 <div className="relative z-10 flex w-full xl:w-auto shrink-0 justify-center">
                   <button onClick={() => openBooking({ location: locationData.fullName })} className="w-full sm:w-auto px-8 py-4 bg-[#C5A861] text-white rounded-xl font-bold text-sm tracking-widest uppercase hover:bg-white hover:text-[#C5A861] transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 shadow-[#C5A861]/20">
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

const OotyContact = ({ locationData, openBooking }: any) => (
  <div className="pt-20 lg:pt-24 min-h-screen bg-[#f8faf9] flex flex-col">
    <section id="contact" className="relative pb-24 flex-1 flex flex-col">
      {/* Header Section (Hero Style) */}
      <div className="relative pt-12 md:pt-16 pb-32 overflow-hidden border-t border-[#3a7d5a]/10 shrink-0">
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a3324] to-[#254d36]" />
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
  }, [loc, navigate]);

  const seoTitle = loc === "ooty" ? "Contact DrizzleDrop Inn Ooty | Book Your Valley View Stay" : loc === "chennai" ? "Contact DrizzleDrop Inn Chennai OMR | Business Hotel Booking" : "Contact Us | DrizzleDrop Inn Ooty & Chennai";
  const seoDesc = loc === "ooty" ? "Contact our Ooty team for reservations, trekking help, or valley-view suite inquiries." : loc === "chennai" ? "Reach our Chennai OMR hotel for corporate bookings, business stays, and travel assistance." : "Get in touch with DrizzleDrop Inn for bookings in Ooty and Chennai. We are here to assist you 24/7.";

  if (!loc) {
    return (
      <div className="flex flex-col">
        <SEO title={seoTitle} description={seoDesc} url="https://drizzledropinn.com/contact" />
        <h1 className="sr-only">Contact DrizzleDrop Inn - Ooty & Chennai</h1>
        <ChennaiContact locationData={locationMap["chennai"]} openBooking={openBooking} />
        <OotyContact locationData={locationMap["ooty"]} openBooking={openBooking} />
      </div>
    );
  }

  const isOoty = loc === "ooty";

  return (
    <>
      <SEO title={seoTitle} description={seoDesc} url={`https://drizzledropinn.com/${loc}/contact`} />
      <h1 className="sr-only">Contact DrizzleDrop Inn {isOoty ? "Ooty" : "Chennai"}</h1>
      {isOoty && locationData ? (
        <OotyContact locationData={locationData} openBooking={openBooking} />
      ) : (
        <ChennaiContact locationData={locationData || locationMap["chennai"]} openBooking={openBooking} />
      )}
    </>
  );
}
