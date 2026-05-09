import { useState, useMemo, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Star, MapPin, Wifi, Car, Shield, MessageCircle, Phone, Mail, ArrowRight, ZoomIn } from "lucide-react";
import AdPopup from "@/components/AdPopup";
import chennaiImg from "@/asset_images/WhatsApp Image 2026-03-16 at 3.46.33 PM (7).webp";
import ootyImg from "@/asset_images/WhatsApp Image 2026-03-16 at 3.46.33 PM (23).webp";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import HeroSection from "@/components/HeroSection";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { API_BASE } from "@/config";
import SEO from "@/components/SEO";
import GuestReviews from "@/components/GuestReviews";
import { ootyData } from "@/data/locationData";

// Load all property images dynamically from assets - prioritizing webp for performance
const allImagesRaw = import.meta.glob<{ default: string }>(
  "../assets/Gallery/**/*.{jpg,jpeg,png,JPG,JPEG,webp}",
  { eager: true, query: "?url" }
);

// Group by base path to prioritize webp
const prioritizedImages: Record<string, string> = {};
Object.entries(allImagesRaw).forEach(([path, module]) => {
  // Remove extension and the leading directory info to get a clean base path
  const basePath = path.replace(/\.(jpg|jpeg|png|JPG|JPEG|webp)$/i, '');
  const ext = path.split('.').pop()?.toLowerCase();

  // If we haven't seen this image yet, or if this is the webp version, use it
  if (!prioritizedImages[basePath] || ext === 'webp') {
    prioritizedImages[basePath] = module.default;
  }
});

const ALL_HOME_IMAGES = Object.entries(prioritizedImages).map(([path, src]) => {
  const pathLower = path.toLowerCase();
  const isOoty = pathLower.includes("ooty");
  const location = isOoty ? "OOTY" : "CHENNAI";

  const parts = path.split("/");
  const folderName = parts[parts.length - 2];
  const category = (folderName.toLowerCase().includes("ooty") || folderName.toLowerCase().includes("chennai"))
    ? (isOoty ? "OOTY" : "CHENNAI")
    : folderName.replace(/-/g, " ").toUpperCase();

  return {
    id: path,
    src: src,
    category,
    location
  };
});

// Curated "All" selection prioritized for home page impact: mix of Ooty views and Chennai deluxe
const curatedHomeAll = (() => {
  const ootyViews = ALL_HOME_IMAGES.filter(img => img.location === "OOTY" && img.category === "VIEW");
  const chennaiRooms = ALL_HOME_IMAGES.filter(img => img.location === "CHENNAI" && img.category.includes("ROOMS"));
  const ootyVilla = ALL_HOME_IMAGES.filter(img => img.location === "OOTY" && img.category === "VILLA");
  const chennaiReception = ALL_HOME_IMAGES.filter(img => img.location === "CHENNAI" && img.category === "RECEPTION");

  const result: typeof ALL_HOME_IMAGES = [];
  // Balanced mix
  result.push(...ootyViews.slice(0, 4));
  result.push(...chennaiRooms.slice(0, 4));
  result.push(...ootyVilla.slice(0, 4));
  result.push(...chennaiReception.slice(0, 4));

  // Fill if needed
  if (result.length < 16) {
    const remaining = ALL_HOME_IMAGES.filter(img => !result.includes(img));
    result.push(...remaining.slice(0, 16 - result.length));
  }

  return result.slice(0, 16);
})();

const HOME_GALLERY_CATEGORIES = ["ALL", "OOTY", "CHENNAI"];

const reviews = [
  { name: "Ananya S.", text: "Beautiful stay experience with amazing hospitality. The rooftop dining was unforgettable.", rating: 5 },
  { name: "Rahul M.", text: "Perfect business hotel in Chennai. Clean rooms, fast WiFi, and excellent service.", rating: 5 },
  { name: "Priya K.", text: "Our Ooty trip was magical. The valley views from our room were breathtaking.", rating: 5 },
  { name: "David L.", text: "World-class hospitality at an incredible value. Will definitely return.", rating: 4 },
];

interface FAQ {
  _id: string;
  question: string;
  answer: string;
  location: string;
  order: number;
}


const blogPosts = [
  { title: "The Ultimate Guide: Best Places to Stay in Ooty for Couples and Families", date: "Nov 15, 2024", category: "Travel", link: "/blog/best-places-to-stay-in-ooty" },
  { title: "The Ultimate Ooty Itinerary: 2 Nights & 3 Days Travel Plan", date: "Nov 02, 2024", category: "Guide", link: "/blog/ooty-itinerary" },
  { title: "Top 10 Hidden Places to Visit in Ooty (2024 Guide)", date: "Oct 20, 2024", category: "Explore", link: "/blog/hidden-places-ooty" },
];

export default function Home() {
  const navigate = useNavigate();
  const [galleryCategory, setGalleryCategory] = useState("ALL");

  const [faqs, setFaqs] = useState<FAQ[]>([]);

  useEffect(() => {
    fetch(`${API_BASE}/faqs/location/GENERAL`)
      .then(res => res.json())
      .then(data => setFaqs(data))
      .catch(err => console.error("Error fetching FAQs:", err));
  }, []);

  const filteredHomeGallery = useMemo(() => {
    if (galleryCategory === "ALL") return curatedHomeAll;
    if (galleryCategory === "OOTY") return ALL_HOME_IMAGES.filter(img => img.location === "OOTY").slice(0, 16);
    if (galleryCategory === "CHENNAI") return ALL_HOME_IMAGES.filter(img => img.location === "CHENNAI").slice(0, 16);
    return ALL_HOME_IMAGES.filter(img => img.category === galleryCategory).slice(0, 16);
  }, [galleryCategory]);

  return (
    <>
      <SEO
        title="Best Hotel in Ooty & Chennai | DrizzleDropinn"
        description="Looking for the best hotel in Ooty? DrizzleDropinn offers stunning valley views, family-friendly budget stays, and luxury rooms. Book direct for the best rates!"
      />
      <HeroSection />

      {/* ══ ANIMATED INFINITE SCROLLING MARQUEE STRIP (CSS — Zero Lag) ══ */}
      <div className="relative overflow-hidden bg-[#0a0a0a] py-5 border-y border-white/5">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 h-full w-24 z-10 bg-gradient-to-r from-[#0a0a0a] to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 h-full w-24 z-10 bg-gradient-to-l from-[#0a0a0a] to-transparent pointer-events-none" />
        <div
          className="flex items-center whitespace-nowrap"
          style={{
            animation: "marquee-scroll 20s linear infinite",
            width: "max-content",
          }}
        >
          {[...Array(4)].map((_, outer) => (
            <div key={outer} className="flex items-center">
              {[
                { num: "35+", label: "Luxury Rooms" },
                { num: "2", label: "Prime Locations" },
                { num: "5★", label: "Guest Rating" },
                { num: "100%", label: "Power Backup" },
                { num: "24/7", label: "Guest Support" },
                { num: "1000+", label: "Happy Guests" },
                { num: "3★", label: "Star Rating" },
                { num: "8+", label: "Years Hospitality" },
              ].map((stat, i) => (
                <div key={`${outer}-${i}`} className="flex items-center">
                  <div className="flex items-center gap-3 px-10">
                    <span className="text-2xl font-bold text-[#C5A861]" style={{ fontFamily: 'var(--font-serif)' }}>{stat.num}</span>
                    <span className="text-[10px] uppercase tracking-[0.25em] text-white/40 font-semibold">{stat.label}</span>
                  </div>
                  <div className="w-px h-6 bg-white/10 flex-shrink-0" />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

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
                className="group relative overflow-hidden rounded-2xl md:rounded-3xl bg-white shadow-sm hover-border-glow h-full flex flex-col"
                onClick={() => navigate('/chennai')}
              >
                <div className="relative w-full aspect-video sm:aspect-[16/10] md:aspect-video cinematic-zoom-container rounded-t-2xl md:rounded-t-3xl">
                  <img src={chennaiImg} alt="DrizzleDrop Chennai" className="cinematic-zoom-image" loading="lazy" decoding="async" />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-700" />

                  <div className="absolute bottom-4 sm:bottom-8 left-4 sm:left-8 right-4 sm:right-8 text-white">
                    <div className="flex items-center gap-2 mb-2 sm:mb-3">
                      <div className="p-1.5 sm:p-2 bg-[#C5A861] rounded-full">
                        <MapPin className="w-3 sm:w-4 h-3 sm:h-4 text-white" />
                      </div>
                      <span className="text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase">Thoraipakkam, Chennai</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 sm:mb-4">DrizzleDrop Inn OMR</h3>
                  </div>
                </div>
                <div className="p-6 sm:p-10">
                  <p className="body-text text-xs sm:text-sm md:text-base mb-6 sm:mb-8 leading-relaxed text-muted-foreground">
                    a sophisticated 3-star business hotel located in Thoraipakkam.Experience comfort and elegance with our 35 well-furnished rooms and suites, designed to cater to both business travelers and leisure guests. Enjoy breathtaking panoramic views from our spacious terrace, unwind with rooftop dining, and indulge in a variety of multi-cuisine delicacies.
                  </p>
                  <div className="flex flex-wrap gap-2 sm:gap-3 mb-6 sm:mb-8">
                    {["IT Hubs", "OMR Corridor", "Rooftop Dining", "Fast WiFi"].map((tag) => (
                      <span key={tag} className="text-[9px] sm:text-[10px] uppercase tracking-widest font-bold px-3 sm:px-4 py-1.5 sm:py-2 bg-[#2E6B8A]/5 text-[#2E6B8A] rounded-full border border-[#2E6B8A]/20 shadow-sm">{tag}</span>
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
                className="group relative overflow-hidden rounded-2xl md:rounded-3xl bg-white shadow-sm hover-border-glow h-full flex flex-col"
                onClick={() => navigate('/ooty')}
              >
                <div className="relative w-full aspect-video sm:aspect-[16/10] md:aspect-video cinematic-zoom-container rounded-t-2xl md:rounded-t-3xl">
                  <img src={ootyImg} alt="DrizzleDrop Ooty" className="cinematic-zoom-image object-top" loading="lazy" decoding="async" />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-700" />

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
                      <span key={tag} className="text-[9px] sm:text-[10px] uppercase tracking-widest font-bold px-3 sm:px-4 py-1.5 sm:py-2 bg-[#3a7d5a]/5 text-[#3a7d5a] rounded-full border border-[#3a7d5a]/20 shadow-sm">{tag}</span>
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

      {/* Photo Gallery - All Properties */}
      <section id="gallery" className="section-padding bg-secondary/5">
        <div className="container-luxury">
          <Reveal width="100%">
            <SectionHeading
              label="Photo Gallery"
              title="Experience DrizzleDrop"
              subtitle="A visual journey through our Chennai and Ooty properties"
            />
          </Reveal>

          {/* Categories Filter */}
          <Reveal delay={0.3} width="100%">
            <div className="flex flex-wrap justify-center gap-2 mb-12 mt-8">
              {HOME_GALLERY_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setGalleryCategory(cat)}
                  className={`px-4 py-1.5 text-[10px] uppercase tracking-wider font-bold rounded-full border transition-all duration-300 ${galleryCategory === cat
                    ? "bg-primary/10 border-primary text-primary"
                    : "bg-white border-border/50 text-muted-foreground hover:border-primary/50 hover:text-primary"
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </Reveal>

          <AnimatePresence mode="wait">
            <motion.div
              key={galleryCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-2 lg:grid-cols-4 gap-4"
            >
              {filteredHomeGallery.map((image, i) => (
                <Reveal key={image.id} delay={i * 0.05}>
                  <motion.div
                    whileHover={{ y: -5 }}
                    className="group relative aspect-square cinematic-zoom-container cursor-pointer shadow-sm border border-border/40 hover-border-glow"
                    onClick={() => navigate(`/gallery?location=${image.location.toLowerCase()}`)}
                  >
                    <img
                      src={image.src}
                      alt={`${image.location} ${image.category}`}
                      className="cinematic-zoom-image"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                      <ZoomIn className="text-white opacity-0 group-hover:opacity-100 transform scale-50 group-hover:scale-100 transition-all duration-300 w-8 h-8" />
                    </div>
                    <div className="absolute bottom-3 left-3 flex flex-col gap-1">
                      <span className="text-[7px] uppercase tracking-wider font-bold bg-[#C5A861] px-2 py-0.5 rounded text-white shadow-sm w-fit">
                        {image.location}
                      </span>
                      <span className="text-[8px] uppercase tracking-widest font-bold bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-black shadow-sm">
                        {image.category === "GENERAL" ? image.location : image.category}
                      </span>
                    </div>
                  </motion.div>
                </Reveal>
              ))}
            </motion.div>
          </AnimatePresence>

          <Reveal delay={0.5} width="100%">
            <div className="mt-12 text-center">
              <Link
                to="/gallery"
                className="inline-flex items-center gap-3 px-10 py-4 bg-[#C5A861] hover:bg-[#B49750] text-white font-bold rounded-full transition-all duration-300 shadow-xl shadow-primary/20 group"
              >
                Browse Full Gallery
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </Reveal>
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
                    <p className="text-xs sm:text-sm text-muted-foreground">Rajiv Gandhi Salai, Thoraipakkam, OMR IT Corridor</p>
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
                  {ootyData.nearbyAttractions.map((att) => (
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
      <GuestReviews property="ALL" />

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
                    <Link to={post.link} className="block text-base sm:text-lg md:text-xl font-bold mb-3 sm:mb-4 group-hover:text-primary transition-colors">
                      {post.title}
                    </Link>
                    <Link to={post.link} className="text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                      Read More
                      <div className="h-0.5 w-4 bg-primary group-hover:w-8 transition-all duration-300" />
                    </Link>
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
                <AccordionItem key={faq._id} value={`faq-${i}`} className="glass-card border border-border/50 px-6">
                  <AccordionTrigger className="text-left text-lg hover:text-primary transition-colors">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="body-text text-sm">
                    {faq.answer}
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
          </Reveal>          <div className="flex flex-col items-center gap-6 md:grid md:grid-cols-3 md:gap-8 max-w-4xl mx-auto w-full px-2 sm:px-0">
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
              <Reveal key={label} delay={0.2 + i * 0.1} width="100%">
                <a
                  href={href}
                  className="group relative block h-full w-full max-w-sm mx-auto md:max-w-none"
                >
                  <div className="glass-card p-8 sm:p-10 flex flex-col items-center justify-center text-center h-full transition-all duration-500 border border-white/10 group-hover:border-primary/40 group-hover:translate-y-[-8px] hover-gold-glow overflow-hidden rounded-2xl">
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-110 shadow-lg"
                      style={{ background: `${color}15` }}
                    >
                      <Icon className="w-7 h-7" style={{ color: color }} />
                    </div>
                    <h4 className="text-xl font-bold mb-2 text-gray-800 tracking-tight" style={{ fontFamily: "var(--font-serif)" }}>{label}</h4>
                    <p className="text-[#C5A861] font-bold text-sm mb-3 tracking-wide">{value}</p>
                    <p className="text-gray-500 text-xs leading-relaxed max-w-[220px]">{description}</p>

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
