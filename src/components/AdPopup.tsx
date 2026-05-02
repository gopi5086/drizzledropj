import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Utensils, Sparkles, Tag, ArrowRight } from "lucide-react";
import { useBooking } from "@/context/BookingContext";

interface Ad {
  _id: string;
  title: string;
  description: string;
  images: string[];
  redirectLink: string;
  isActive: boolean;
}

const BACKEND_BASE = "https://drizzledropj-2.onrender.com";
const API_BASE = `${BACKEND_BASE}/api`;

export default function AdPopup() {
  const [ads, setAds] = useState<Ad[]>([]);
  const [currentAdIndex, setCurrentAdIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { openBooking } = useBooking();

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const res = await fetch(`${API_BASE}/ads/active`);
        if (res.ok) {
          const data = await res.json();
          if (data.length > 0) {
            setAds(data);
            setTimeout(() => setIsVisible(true), 2500);
          }
        }
      } catch (error) {
        console.log("Ad server not available");
      }
    };
    fetchAds();
  }, []);

  useEffect(() => {
    if (!isVisible || ads.length === 0) return;
    const currentAd = ads[currentAdIndex];
    if (!currentAd || currentAd.images.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % currentAd.images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [isVisible, currentAdIndex, ads]);

  const handleClose = () => setIsVisible(false);

  const handleBookNow = () => {
    const currentAd = ads[currentAdIndex];
    if (currentAd?.redirectLink) {
      window.open(currentAd.redirectLink, "_blank");
    } else {
      openBooking();
    }
    setIsVisible(false);
  };

  if (ads.length === 0) return null;
  const currentAd = ads[currentAdIndex];
  if (!currentAd) return null;

  // Parse custom benefits from description field
  const benefits = (currentAd.description || "").split("|");
  const displayBenefits = [
    benefits[0] || "Enjoy Savings on Room Rates",
    benefits[1] || "Avail Offers across Restaurants",
    benefits[2] || "Special Savings on Spas",
  ];

  const currentImagePath = currentAd.images[currentImageIndex];
  const imageUrl = currentImagePath?.startsWith("data:") || currentImagePath?.startsWith("blob:")
    ? currentImagePath
    : `${currentImagePath?.startsWith("http") ? "" : BACKEND_BASE}${currentImagePath}`;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-md p-4"
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="relative bg-white w-full max-w-4xl flex flex-col md:flex-row overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.5)] border border-black/5"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button - Bold X as per reference */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 z-50 text-black font-bold hover:scale-110 transition-transform"
            >
              <X className="w-6 h-6 stroke-[3px]" />
            </button>

            {/* Left Side: Cinematic Image */}
            <div className="w-full md:w-1/2 aspect-square md:aspect-auto relative overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentImageIndex}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 1.5 }}
                  src={imageUrl}
                  alt="Exclusive Offer"
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>
            </div>

            {/* Right Side: Exact Taj Template */}
            <div className="w-full md:w-1/2 bg-white flex flex-col pt-12 md:pt-16 pb-0 px-6 md:px-10 text-center">

              <div className="mb-8">
                <span className="text-[10px] md:text-[14px] uppercase tracking-[0.4em] text-black/80 font-medium block mb-3">
                  Leaving so soon?
                </span>
                <h2 className="text-3xl md:text-5xl font-serif italic text-[#C5A861] leading-[1.1] mb-4">
                  Avail Exclusive <br /> Offers
                </h2>
                <div className="w-12 h-[1px] bg-black/20 mx-auto" />
              </div>

              {/* Icon Layout - Exact Triple Centered Grid */}
              <div className="flex-1 flex flex-col justify-center gap-10 py-6">
                {/* Top Row: Two Icons */}
                <div className="flex items-start justify-center gap-6">
                  <div className="flex flex-col items-center gap-3 w-1/2">
                    <Tag className="w-6 h-6 text-[#C5A861] mb-1" />
                    <span className="text-[9px] md:text-[11px] text-black/70 uppercase tracking-widest font-semibold leading-relaxed">
                      {displayBenefits[0]}
                    </span>
                  </div>
                  <div className="w-[1px] h-12 bg-black/10 mt-2" />
                  <div className="flex flex-col items-center gap-3 w-1/2">
                    <Utensils className="w-6 h-6 text-[#C5A861] mb-1" />
                    <span className="text-[9px] md:text-[11px] text-black/70 uppercase tracking-widest font-semibold leading-relaxed">
                      {displayBenefits[1]}
                    </span>
                  </div>
                </div>

                {/* Bottom Row: One Icon */}
                <div className="flex flex-col items-center gap-3">
                  <Sparkles className="w-6 h-6 text-[#C5A861] mb-1" />
                  <span className="text-[9px] md:text-[11px] text-black/70 uppercase tracking-widest font-semibold leading-relaxed max-w-[140px]">
                    {displayBenefits[2]}
                  </span>
                </div>
              </div>

              {/* CTA Button - Full Width Bottom as per reference */}
              <button
                onClick={handleBookNow}
                className="w-[calc(100%+80px)] -mx-10 mt-10 py-5 bg-[#C5A861] text-white text-[12px] font-bold uppercase tracking-[0.4em] transition-all duration-500 hover:bg-black"
              >
                View Offers
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
