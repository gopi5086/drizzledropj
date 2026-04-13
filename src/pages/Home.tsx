import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, MapPin, Wifi, Car, Shield, MessageCircle, Phone, Mail } from "lucide-react";
import AdPopup from "@/components/AdPopup";
import chennaiImg from "@/asset_images/WhatsApp Image 2026-03-16 at 3.46.33 PM (7).jpeg";
import ootyImg from "@/asset_images/WhatsApp Image 2026-03-16 at 3.46.33 PM (23).jpeg";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import HeroSection from "@/components/HeroSection";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import SEO from "@/components/SEO";

const reviews = [
  { name: "Ananya S.", text: "Beautiful stay experience with amazing hospitality. The rooftop dining was unforgettable.", rating: 5 },
  { name: "Rahul M.", text: "Perfect business hotel in Chennai. Clean rooms, fast WiFi, and excellent service.", rating: 5 },
  { name: "Priya K.", text: "Our Ooty trip was magical. The valley views from our room were breathtaking.", rating: 5 },
  { name: "David L.", text: "World-class hospitality at an incredible value. Will definitely return.", rating: 4 },
];

const faqs = [
  { q: "What time is check-in and check-out?", a: "Check-in is at 12:00 PM and check-out is at 11:00 AM. Early check-in and late check-out are available upon request and subject to availability." },
  { q: "Is parking available?", a: "Yes, we offer complimentary secure parking at both our Chennai and Ooty properties." },
  { q: "Are pets allowed?", a: "Yes! DrizzleDrop Hotels is pooch friendly. Please inform us during booking so we can prepare your room." },
  { q: "Do you provide airport pickup?", a: "Yes, we offer airport pickup and drop services for our Chennai property. Please book in advance." },
  { q: "What payment methods do you accept?", a: "We accept all major credit/debit cards, GPay, PhonePe, Paytm, and WhatsApp Pay." },
];


const blogPosts = [
  { title: "5 Hidden Gems in Ooty You Must Visit", date: "Oct 12, 2023", category: "Travel" },
  { title: "Effective Business Stays in Chennai's IT Corridor", date: "Sep 28, 2023", category: "Business" },
  { title: "The Secret to Our Authentic Nilgiri Tea", date: "Aug 15, 2023", category: "Dining" },
];

export default function Home() {
  const navigate = useNavigate();

  return (
    <>
      <SEO
        title="DrizzleDrop Inn | Luxury & Modern Hotels in Chennai & Ooty"
        description="Experience unparalleled hospitality with DrizzleDrop Inn. Perfect for business stays in Chennai IT corridor or scenic valley vacations in Ooty Nilgiris."
      />
      <HeroSection />

      {/* About */}
      <section id="about" className="section-padding" style={{ paddingTop: 'clamp(5rem, 10vw, 7rem)' }}>
        <div className="container-luxury text-center">
          <Reveal delay={0.1} width="100%">
            <SectionHeading
              label="Welcome"
              title="A Sanctuary of Quiet Luxury"
              subtitle="DrizzleDrop Inn offers hassle-free accommodation where modern facilities meet exceptional service. Whether it's your business stay in Chennai or a scenic vacation in Ooty, we provide an ideal abode for the modern traveller."
            />
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 mt-8 sm:mt-12">
            {[
              { icon: Wifi, title: "Modern Facilities", desc: "Electricity Backup, WIFI connectivity, and 24 hours Hot Water in all locations." },
              { icon: Shield, title: "Safety First", desc: "Enhanced cleaning procedures for a secure and confident stay experience." },
              { icon: Car, title: "Ample Parking", desc: "Secure private car parking available for all our guests at no additional charge." },
            ].map((item, i) => (
              <Reveal key={item.title} delay={0.2 + i * 0.1}>
                <div className="glass-card p-6 sm:p-8 text-center group hover:border-primary/30 transition-all duration-500 hover-gold-glow h-full">
                  <item.icon className="w-6 sm:w-8 h-6 sm:h-8 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="text-lg sm:text-xl font-medium mb-2">{item.title}</h3>
                  <p className="body-text text-xs sm:text-sm">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Properties */}
      <section id="properties" className="section-padding bg-[#fdfdfd] relative overflow-hidden">
        {/* Subtle background text */}
        <div className="absolute top-0 right-0 text-[20vw] font-bold text-black/[0.02] select-none pointer-events-none -translate-y-1/2">
          Experience
        </div>

        <div className="container-luxury">
          <Reveal width="100%">
            <SectionHeading label="Our Properties" title="Two Destinations, One Promise" />
          </Reveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-12 mt-12 h-full items-stretch">
            {/* Chennai */}
            <Reveal delay={0.3} width="100%">
              <motion.div
                whileHover={{ y: -10 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="group relative overflow-hidden rounded-2xl md:rounded-3xl border border-border/40 hover:border-[#C5A861]/30 transition-all duration-500 cursor-pointer bg-white shadow-sm hover:shadow-[0_40px_80px_rgba(0,0,0,0.06)] h-full flex flex-col"
                onClick={() => navigate('/rooms')}
              >
                <div className="relative w-full aspect-video sm:aspect-[16/10] md:aspect-video overflow-hidden rounded-t-2xl md:rounded-t-3xl">
                  <img src={chennaiImg} alt="DrizzleDrop Chennai" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/30" />

                  <div className="absolute bottom-4 sm:bottom-8 left-4 sm:left-8 right-4 sm:right-8 text-white">
                    <div className="flex items-center gap-2 mb-2 sm:mb-3">
                      <div className="p-1.5 sm:p-2 bg-[#C5A861] rounded-full">
                        <MapPin className="w-3 sm:w-4 h-3 sm:h-4 text-white" />
                      </div>
                      <span className="text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase">Thoriaipakkam, Chennai</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 sm:mb-4">DrizzleDrop Inn OMR</h3>
                  </div>
                </div>
                <div className="p-6 sm:p-10">
                  <p className="body-text text-xs sm:text-sm md:text-base mb-6 sm:mb-8 leading-relaxed text-muted-foreground">
                    a sophisticated 3-star business hotel located in Thoriaipakkam.Experience comfort and elegance with our 35 well-furnished rooms and suites, designed to cater to both business travelers and leisure guests. Enjoy breathtaking panoramic views from our spacious terrace, unwind with rooftop dining, and indulge in a variety of multi-cuisine delicacies.
                  </p>
                  <div className="flex flex-wrap gap-2 sm:gap-3 mb-6 sm:mb-8">
                    {["IT Hubs", "OMR Corridor", "Rooftop Dining", "Fast WiFi"].map((tag) => (
                      <span key={tag} className="text-[9px] sm:text-[10px] uppercase tracking-widest font-bold px-3 sm:px-4 py-1.5 sm:py-2 bg-secondary/30 text-secondary-foreground rounded-full border border-border/50">{tag}</span>
                    ))}
                  </div>
                  <div className="flex items-center gap-3 text-[#C5A861] font-bold text-xs uppercase tracking-widest group/btn">
                    Discover More
                    <div className="h-px w-8 bg-[#C5A861] group-hover/btn:w-16 transition-all duration-500" />
                  </div>
                </div>
              </motion.div>
            </Reveal>

            {/* Ooty */}
            <Reveal delay={0.4} width="100%">
              <motion.div
                whileHover={{ y: -10 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="group relative overflow-hidden rounded-2xl md:rounded-3xl border border-border/40 hover:border-[#C5A861]/30 transition-all duration-500 cursor-pointer bg-white shadow-sm hover:shadow-[0_40px_80px_rgba(0,0,0,0.06)] h-full flex flex-col"
                onClick={() => {
                  const el = document.getElementById('location');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <div className="relative w-full aspect-video sm:aspect-[16/10] md:aspect-video overflow-hidden rounded-t-2xl md:rounded-t-3xl">
                  <img src={ootyImg} alt="DrizzleDrop Ooty" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/30" />

                  <div className="absolute bottom-4 sm:bottom-8 left-4 sm:left-8 right-4 sm:right-8 text-white">
                    <div className="flex items-center gap-2 mb-2 sm:mb-3">
                      <div className="p-1.5 sm:p-2 bg-[#C5A861] rounded-full">
                        <MapPin className="w-3 sm:w-4 h-3 sm:h-4 text-white" />
                      </div>
                      <span className="text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase">Nilgiris, Ooty</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 sm:mb-4">DrizzleDrop Inn Ooty</h3>
                  </div>
                </div>
                <div className="p-6 sm:p-10">
                  <p className="body-text text-xs sm:text-sm md:text-base mb-6 sm:mb-8 leading-relaxed text-muted-foreground">
                    Experience an enchanting getaway at our hill-view resort, featuring 8 individual rooms with private balconies.Relax and enjoy stunning panoramic views of the lush hills and the historic Nilgiris toy train, making your stay truly unforgettable.
                    A perfect retreat nestled in nature’s beauty.

                  </p>
                  <div className="flex flex-wrap gap-2 sm:gap-3 mb-6 sm:mb-8">
                    {["Hill Views", "Toy Train Route", "Private Balcony", "Quiet Luxury"].map((tag) => (
                      <span key={tag} className="text-[9px] sm:text-[10px] uppercase tracking-widest font-bold px-3 sm:px-4 py-1.5 sm:py-2 bg-secondary/30 text-secondary-foreground rounded-full border border-border/50">{tag}</span>
                    ))}
                  </div>
                  <div className="flex items-center gap-3 text-[#C5A861] font-bold text-xs uppercase tracking-widest group/btn">
                    Discover More
                    <div className="h-px w-8 bg-[#C5A861] group-hover/btn:w-16 transition-all duration-500" />
                  </div>
                </div>
              </motion.div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Location Maps & See and Do */}
      <section id="location" className="section-padding">
        <div className="container-luxury">
          <Reveal width="100%">
            <SectionHeading label="Find Us" title="Explore the Surroundings" />
          </Reveal>
          <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="lg:col-span-2 space-y-6 sm:space-y-8">
              <Reveal delay={0.2} width="100%">
                <div className="border border-border/50 overflow-hidden rounded-lg sm:rounded-xl">
                  <iframe
                    title="DrizzleDrop Chennai"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.5847992975273!2d80.22950347411972!3d12.93438611569501!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a525d3e8c850455%3A0xad75b35ac6cfc12!2sDrizzleDrop%20Inn%2CCHENNAI!5e0!3m2!1sen!2sus!4v1773836584953!5m2!1sen!2sus"
                    width="100%"
                    height="250"
                    className="sm:h-[300px]"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                  />
                  <div className="p-4 bg-card border-t border-border/50">
                    <h4 className="text-base sm:text-lg font-medium">DrizzleDrop Inn Chennai</h4>
                    <p className="text-xs sm:text-sm text-muted-foreground">Rajiv Gandhi Salai, Thoriaipakkam, OMR IT Corridor</p>
                  </div>
                </div>
              </Reveal>
              <Reveal delay={0.3} width="100%">
                <div className="border border-border/50 overflow-hidden rounded-lg sm:rounded-xl">
                  <iframe
                    title="DrizzleDrop Ooty"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d39892631.06442901!2d31.07136452959029!3d52.391215641873124!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba8962ea346ed07%3A0xf65c4c81e400f184!2sDrizzleDrop%20Inn!5e0!3m2!1sen!2sus!4v1773834594116!5m2!1sen!2sus"
                    width="100%"
                    height="250"
                    className="sm:h-[300px]"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                  />
                  <div className="p-4 bg-card border-t border-border/50">
                    <h4 className="text-base sm:text-lg font-medium">DrizzleDrop Inn Ooty</h4>
                    <p className="text-xs sm:text-sm text-muted-foreground">2 KM from Ooty Bus Stand & Railway Station</p>
                  </div>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.4} width="100%">
              <div className="bg-secondary/10 p-6 sm:p-8 rounded-lg sm:rounded-xl border border-border/50 h-full">
                <h3 className="text-lg sm:text-2xl font-bold mb-4 sm:mb-6 flex items-center gap-2">
                  <MapPin className="w-4 sm:w-5 h-4 sm:h-5 text-primary" />
                  Ooty: See & Do
                </h3>
                <div className="space-y-3 sm:space-y-4 max-h-[400px] sm:max-h-[600px] overflow-y-auto pr-2 custom-scrollbar text-sm sm:text-base">
                  {[
                    { name: "Nilgiri mountain Railway", dist: "2.8 KM" },
                    { name: "Ooty lake", dist: "3.3 KM" },
                    { name: "Ooty Bus stand", dist: "2.3 KM" },
                    { name: "Charing cross", dist: "4.0 KM" },
                    { name: "Cairn hill", dist: "2.1 KM" },
                    { name: "Arboretum", dist: "1.5 KM" },
                    { name: "Deer Park", dist: "2.0 KM" },
                    { name: "Botanical garden", dist: "4.9 KM" },
                    { name: "Rose garden", dist: "4.0 KM" },
                    { name: "Pykara Lake", dist: "25 KM" },
                    { name: "Tea factory", dist: "7.4 KM" },
                    { name: "Dodabetta view point", dist: "11 KM" },
                    { name: "Coonoor", dist: "21 KM" },
                    { name: "Kotagiri", dist: "31 KM" },
                    { name: "Avalanche", dist: "22 KM" },
                    { name: "Emarald", dist: "19 KM" },
                    { name: "Murugan Temple", dist: "4.5 KM" },
                    { name: "Upper Bhavani", dist: "39 KM" },
                    { name: "Gudalur", dist: "52 KM" },
                    { name: "Mudhumalai", dist: "48 KM" },
                    { name: "Pine Forest", dist: "10 KM" },
                    { name: "Wax mesuem", dist: "5.2 KM" },
                    { name: "Snow Park", dist: "2.7 KM" },
                  ].map((att) => (
                    <div key={att.name} className="flex justify-between items-center text-xs sm:text-sm border-b border-border/20 pb-2">
                      <span className="font-medium">{att.name}</span>
                      <span className="text-muted-foreground">{att.dist}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section id="reviews" className="section-padding bg-card/50">
        <div className="container-luxury">
          <Reveal width="100%">
            <SectionHeading label="Testimonials" title="What Our Guests Say" />
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {reviews.map((r, i) => (
              <Reveal key={i} delay={0.1 * i}>
                <div className="glass-card p-4 sm:p-6 hover:border-primary/30 transition-all duration-500 h-full">
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star key={j} className={`w-3 sm:w-4 h-3 sm:h-4 ${j < r.rating ? "text-primary fill-primary" : "text-muted"}`} />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-foreground/80 mb-4 italic">"{r.text}"</p>
                  <p className="label-caps text-[10px] sm:text-xs">{r.name}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="section-padding bg-secondary/5">
        <div className="container-luxury">
          <Reveal width="100%">
            <SectionHeading label="Latest News" title="From Our Journal" />
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 mt-8 sm:mt-12">
            {blogPosts.map((post, i) => (
              <Reveal key={post.title} delay={0.1 * i} width="100%">
                <div className="group cursor-pointer h-full">
                  <div className="bg-background p-6 sm:p-8 border border-border/50 rounded-xl sm:rounded-2xl hover:border-primary/50 transition-all duration-500 hover:shadow-xl h-full">
                    <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-primary font-bold mb-3 sm:mb-4 block">
                      {post.category} • {post.date}
                    </span>
                    <h3 className="text-base sm:text-lg md:text-xl font-bold mb-3 sm:mb-4 group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    <span className="text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                      Read More
                      <div className="h-0.5 w-4 bg-primary group-hover:w-8 transition-all duration-300" />
                    </span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="section-padding">
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
                  <AccordionContent className="body-text text-sm">
                    {faq.a}
                  </AccordionContent>
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
            <SectionHeading label="Get in Touch" title="Contact Us" />
          </Reveal>          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              {
                icon: MessageCircle,
                label: "WhatsApp",
                value: "+91 91504 86153",
                href: "https://wa.me/919150486153",
                description: "Direct chat with Ooty team",
                color: "#25D366"
              },
              {
                icon: Mail,
                label: "Email",
                value: "stay@drizzledropinn.com",
                href: "mailto:stay@drizzledropinn.com",
                description: "Booking & general inquiries",
                color: "#C5A861"
              },
              {
                icon: Phone,
                label: "Phone",
                value: "+91 99628 22355",
                href: "tel:+919962822355",
                description: "24/7 Reservation support",
                color: "#2E6B8A"
              },
            ].map(({ icon: Icon, label, value, href, description, color }, i) => (
              <Reveal key={label} delay={0.2 + i * 0.1}>
                <a
                  href={href}
                  className="group relative block h-full"
                >
                  <div className="glass-card p-8 text-center h-full transition-all duration-500 border border-white/10 group-hover:border-primary/40 group-hover:translate-y-[-8px] hover-gold-glow overflow-hidden">
                    <div
                      className="w-14 h-14 mx-auto rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-110 shadow-lg"
                      style={{ background: `${color}15` }}
                    >
                      <Icon className="w-7 h-7" style={{ color: color }} />
                    </div>
                    <h4 className="text-xl font-bold mb-2 text-gray-800 tracking-tight" style={{ fontFamily: "var(--font-serif)" }}>{label}</h4>
                    <p className="text-[#C5A861] font-bold text-sm mb-3 tracking-wide">{value}</p>
                    <p className="text-gray-500 text-xs leading-relaxed">{description}</p>

                    {/* Decorative background element */}
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
