import { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BookingBar from "./BookingBar";
import { LocationConfig } from "@/data/locationData";

const SLIDE_DURATION = 6000;

function ShimmerParticles() {
  const particles = useMemo(
    () =>
      Array.from({ length: 30 }, (_, i) => ({
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
          style={{ left: p.left, top: p.top, width: p.size, height: p.size }}
          animate={{ y: [0, -40, 0], opacity: [0, p.opacity, 0], scale: [0.5, 1.2, 0.5] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

interface Props {
  location: LocationConfig;
}

export default function LocationHero({ location }: Props) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(1);
  const slides = location.heroSlides;

  const goToSlide = useCallback(
    (index: number) => {
      setDirection(index > currentSlide ? 1 : -1);
      setCurrentSlide(index);
    },
    [currentSlide]
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, SLIDE_DURATION);
    return () => clearInterval(timer);
  }, [slides.length, currentSlide]);

  const slide = slides[currentSlide];

  return (
    <section className="relative w-full h-[90vh] sm:h-[95vh] min-h-[500px] sm:min-h-[650px] md:min-h-[750px] overflow-hidden bg-[#0a0a0a]">
      {/* Background Slides */}
      <AnimatePresence mode="popLayout" custom={direction}>
        <motion.div
          key={currentSlide}
          className="absolute inset-0 w-full h-full"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1.05 }}
          exit={{ opacity: 0, scale: 1 }}
          transition={{ duration: 2, ease: [0.4, 0, 0.2, 1] }}
        >
          <img
            src={slide.image}
            alt={`DrizzleDrop ${location.name} – ${slide.tagline}`}
            className="absolute inset-0 w-full h-full object-cover brightness-[0.85] contrast-[1.05]"
          />
        </motion.div>
      </AnimatePresence>

      {/* Overlays */}
      <div className="absolute inset-0 z-[5]">
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/80 via-transparent to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,0,0,0.2)_100%)]" />
      </div>

      <ShimmerParticles />

      {/* Content */}
      <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-4 pt-20">
        {/* Location Badge */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`badge-${currentSlide}`}
            initial={{ opacity: 0, y: 20, letterSpacing: "0.2em" }}
            animate={{ opacity: 1, y: 0, letterSpacing: "0.3em" }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-8"
          >
            <span className="px-4 sm:px-6 py-1.5 sm:py-2 rounded-full border border-[#C5A861]/30 bg-black/20 backdrop-blur-md text-[#C5A861] text-[8px] sm:text-[10px] uppercase font-bold tracking-[0.2em] sm:tracking-[0.3em] flex items-center gap-2 sm:gap-3">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C5A861] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C5A861]"></span>
              </span>
              {slide.location} — {slide.tagline}
            </span>
          </motion.div>
        </AnimatePresence>

        {/* Heading */}
        <div className="overflow-hidden mb-4">
          <motion.h1
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="text-2xl sm:text-4xl md:text-6xl lg:text-8xl font-bold tracking-tighter leading-[1] sm:leading-[1.1] md:leading-[0.9] text-white"
            style={{ fontWeight: 700, letterSpacing: "-0.02em" }}
          >
            Welcome to DrizzleDrop Inn,
            <br />
            <span className="italic bg-gradient-to-r from-[#C5A861] via-[#EBD5A3] to-[#C5A861] bg-clip-text text-transparent filter drop-shadow-[0_2px_15px_rgba(197,168,97,0.3)]">
              {location.name.toUpperCase()}
            </span>
          </motion.h1>
        </div>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1.2 }}
          className="text-xs sm:text-sm md:text-lg lg:text-xl text-white/60 font-light tracking-[0.05em] sm:tracking-[0.1em] max-w-2xl mb-8 sm:mb-12 px-2"
        >
          {location.tagline}
        </motion.p>

        {/* Booking Bar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-5xl"
        >
          <BookingBar />
        </motion.div>
      </div>

      {/* Dot indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goToSlide(i)}
            className={`rounded-full transition-all duration-500 ${
              i === currentSlide
                ? "w-6 h-2 bg-[#C5A861]"
                : "w-2 h-2 bg-white/40 hover:bg-white/70"
            }`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
