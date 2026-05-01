import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useBooking } from "@/context/BookingContext";
import Magnetic from "./Magnetic";

export default function StickyBookingCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const { openBooking, isModalOpen } = useBooking();

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          // Reveal after scrolling 400px and if modal is NOT open
          if (window.scrollY > 400 && !isModalOpen) {
            setIsVisible(true);
          } else {
            setIsVisible(false);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isModalOpen]);

  return (
    <AnimatePresence>
      {isVisible && !isModalOpen && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 30, stiffness: 300 }}
          className="fixed bottom-8 left-0 right-0 z-[150] flex justify-center pointer-events-none"
        >
          <div className="pointer-events-auto">
             <Magnetic strength={0.3}>
                <button
                  onClick={() => openBooking()}
                  className="btn-luxury group bg-gradient-to-r from-[#2E6B8A] to-[#3a7d5a] text-white px-10 py-4 rounded-full text-[12px] font-bold uppercase tracking-[0.4em] flex items-center gap-3 shadow-[0_20px_50px_rgba(46,107,138,0.3)] hover:shadow-[0_20px_50px_rgba(58,125,90,0.5)]"
                >
                  Book Now
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </button>
             </Magnetic>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
