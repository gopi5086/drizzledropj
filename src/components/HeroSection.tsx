import { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BookingBar from "./BookingBar";
import { OptimizedImage } from "./OptimizedImage";

// Chennai hero images
import c1 from "@/assets/CHennai_Front_Page_Website-3-001/CHennai_Front_Page_Website/Building_outer_002.webp";
import c2 from "@/assets/CHennai_Front_Page_Website-3-001/CHennai_Front_Page_Website/_SPY0060.webp";
import c3 from "@/assets/CHennai_Front_Page_Website-3-001/CHennai_Front_Page_Website/_SPY0055.webp";
import c4 from "@/assets/CHennai_Front_Page_Website-3-001/CHennai_Front_Page_Website/Corridor_11.webp";
import c5 from "@/assets/CHennai_Front_Page_Website-3-001/CHennai_Front_Page_Website/_SPY0127.webp";
import c6 from "@/assets/CHennai_Front_Page_Website-3-001/CHennai_Front_Page_Website/IMG_20240815_184010_HDR.webp";

// Ooty hero images
import o1 from "@/assets/OOTY_FRONT_Page_Website-3-001/OOTY_FRONT_Page_Website/IMG_20251218_071327.webp";
import o2 from "@/assets/OOTY_FRONT_Page_Website-3-001/OOTY_FRONT_Page_Website/DSC_0108.webp";
import o3 from "@/assets/OOTY_FRONT_Page_Website-3-001/OOTY_FRONT_Page_Website/IMG20260421203017.webp";
import o4 from "@/assets/OOTY_FRONT_Page_Website-3-001/OOTY_FRONT_Page_Website/IMG20260421192113.webp";
import o5 from "@/assets/OOTY_FRONT_Page_Website-3-001/OOTY_FRONT_Page_Website/IMG20260421203836.webp";

interface HeroSlide {
  image: string;
  location: string;
  tagline: string;
}

const heroSlides: HeroSlide[] = [
  { image: c1, location: "DDI CHENNAI", tagline: "Sophisticated Urban Comfort" },
  { image: o1, location: "DDI OOTY", tagline: "Breathtaking Valley Views" },
  { image: c2, location: "DDI CHENNAI", tagline: "Elegantly Appointed Rooms" },
  { image: o2, location: "DDI OOTY", tagline: "Elegant Mountain Sanctuary" },
  { image: c3, location: "DDI CHENNAI", tagline: "Modern Living in OMR" },
  { image: o3, location: "DDI OOTY", tagline: "Serene Garden Evenings" },
  { image: c4, location: "DDI CHENNAI", tagline: "Contemporary Architectural Design" },
  { image: o4, location: "DDI OOTY", tagline: "Warm Alpine Hospitality" },
  { image: c5, location: "DDI CHENNAI", tagline: "Your Gateway to the IT Hub" },
  { image: c6, location: "DDI CHENNAI", tagline: "Elegant Night Ambience" },
  { image: o5, location: "DDI OOTY", tagline: "Experience the Nilgiris" },
];

const SLIDE_DURATION = 6000;

function ShimmerParticles() {
  const particles = useMemo(
    () =>
      Array.from({ length: 35 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size: Math.random() * 3 + 1,
        delay: Math.random() * 6,
        duration: Math.random() * 5 + 5,
        opacity: Math.random() * 0.5 + 0.1,
      })),
    []
  );

  return (
    <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-white shadow-[0_0_10px_white]"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: [0, -40, 0],
            opacity: [0, p.opacity, 0],
            scale: [0.5, 1.2, 0.5],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// SlideIndicators removed as per request to eliminate background changing lines

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [prevSlide, setPrevSlide] = useState(0);
  const [direction, setDirection] = useState(1);

  const goToSlide = useCallback(
    (index: number) => {
      setDirection(index > currentSlide ? 1 : -1);
      setPrevSlide(currentSlide);
      setCurrentSlide(index);
    },
    [currentSlide]
  );

  useEffect(() => {
    // Preload all hero background images on mount to ensure smooth, flicker-free transitions
    heroSlides.forEach((slide) => {
      const img = new Image();
      img.src = slide.image;
    });
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setPrevSlide(currentSlide);
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, SLIDE_DURATION);

    return () => clearInterval(timer);
  }, [currentSlide]);

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const slide = heroSlides[currentSlide];

  return (
    <section className="relative w-full h-[90vh] sm:h-[95vh] min-h-[500px] sm:min-h-[650px] md:min-h-[750px] overflow-hidden bg-[#0a0a0a]">
      {/* Bottom Layer (exiting slide remains 100% solid underneath to prevent black showing through) */}
      <div className="absolute inset-0 w-full h-full">
        <OptimizedImage
          src={heroSlides[prevSlide].image}
          alt="previous hero slide"
          className="absolute inset-0 w-full h-full brightness-[0.85] contrast-[1.05]"
        />
      </div>

      {/* Top Layer (new slide fades in on top dynamically with GPU-accelerated spring-parallax) */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          className="absolute inset-0 w-full h-full"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{
            opacity: 1,
            scale: 1.02,
            x: mousePos.x,
            y: mousePos.y
          }}
          exit={{ opacity: 0 }}
          transition={{
            opacity: { duration: 1.2, ease: "easeInOut" },
            scale: { duration: 1.2, ease: "easeInOut" },
            x: { type: "spring", stiffness: 50, damping: 30 },
            y: { type: "spring", stiffness: 50, damping: 30 }
          }}
        >
          <OptimizedImage
            src={slide.image}
            alt={slide.location}
            className="absolute inset-0 w-full h-full brightness-[0.85] contrast-[1.05]"
            priority={currentSlide === 0}
          />
        </motion.div>
      </AnimatePresence>

      {/* Modern Overlays (Lightened) */}
      <div className="absolute inset-0 z-[5]">
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/80 via-transparent to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,0,0,0.2)_100%)]" />
      </div>

      <ShimmerParticles />

      {/* Main Content Area */}
      <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-4 pt-20">

        {/* Animated Badge */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`badge-${currentSlide}`}
            initial={{ opacity: 0, y: 20, letterSpacing: "0.2em" }}
            animate={{ opacity: 1, y: 0, letterSpacing: "0.3em" }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-8"
          >
            <span className="px-5 sm:px-6 py-2 rounded-full border border-[#C5A861]/40 bg-black/40 backdrop-blur-md text-[#C5A861] text-[10px] sm:text-xs md:text-sm uppercase font-bold tracking-[0.2em] sm:tracking-[0.3em] flex items-center gap-2 sm:gap-3">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C5A861] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C5A861]"></span>
              </span>
              {slide.location} — {slide.tagline}
            </span>
          </motion.div>
        </AnimatePresence>

        {/* Text Reveal Heading */}
        <div className="overflow-hidden mb-6">
          <motion.h1
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="text-2xl sm:text-4xl md:text-6xl lg:text-8xl font-bold tracking-tighter leading-[1.2] text-white"
            style={{ fontWeight: 700, letterSpacing: "-0.02em" }}
          >
            Welcome to
            <br />
            DrizzleDrop Inn
          </motion.h1>
        </div>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1.2 }}
          className="text-[10px] sm:text-xs md:text-sm lg:text-base text-gray-400 font-light tracking-[0.2em] sm:tracking-[0.3em] max-w-3xl mb-8 sm:mb-12 px-2 uppercase"
        >
          A PLACE TO FIND SERENITY
        </motion.p>

        {/* === CENTRAL BOOKING CONTAINER === */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-5xl"
        >
          <BookingBar />
        </motion.div>

      </div>



    </section>
  );
}
