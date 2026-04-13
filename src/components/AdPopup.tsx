import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useBooking } from "@/context/BookingContext";

interface Ad {
  _id: string;
  title: string;
  description: string;
  images: string[];
  redirectLink: string;
  isActive: boolean;
}

const BACKEND_BASE = "https://drizzledropj-1.onrender.com";
const API_BASE = `${BACKEND_BASE}/api`;

export default function AdPopup() {
  const [ads, setAds] = useState<Ad[]>([]);
  const [currentAdIndex, setCurrentAdIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { openBooking } = useBooking();

  // Fetch active ads
  useEffect(() => {
    const fetchAds = async () => {
      try {
        const res = await fetch(`${API_BASE}/ads/active`);
        if (res.ok) {
          const data = await res.json();
          if (data.length > 0) {
            setAds(data);
            try {
              localStorage.setItem("drizzledrop_ads_persistent", JSON.stringify(data));
            } catch (e) {
              console.warn("Ads storage quota exceeded");
            }
            // Show popup after a short delay for better UX
            if (!isVisible) setTimeout(() => setIsVisible(true), 1500);
          }
        }
      } catch (error) {
        // Silently fail — don't break homepage if server is down
        console.log("Ad server not available");
      }
    };

    fetchAds();
  }, []);

  // Auto-cycle images within current ad
  useEffect(() => {
    if (!isVisible || ads.length === 0) return;
    const currentAd = ads[currentAdIndex];
    if (!currentAd || currentAd.images.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % currentAd.images.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [isVisible, currentAdIndex, ads]);

  const handleClose = () => {
    setIsVisible(false);
  };

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

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", damping: 22 }}
            className="relative bg-transparent rounded-2xl w-full max-w-4xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 z-20 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-500 hover:text-gray-800 hover:bg-white transition-all shadow-md"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Display a single full-width image occupying the container */}
            <div className="w-full relative min-h-[200px] flex items-center justify-center bg-gray-100/10">
              <img
                src={(() => {
                  const imgPath = currentAd.images[currentImageIndex];
                  if (!imgPath) return "";
                  // If it's a Base64 string from DB or a direct preview, use it as is
                  if (imgPath.startsWith("data:") || imgPath.startsWith("blob:")) return imgPath;

                  // Otherwise, construct the URL with the backend base (for old/legacy items)
                  const base = imgPath.startsWith("http") ? "" : BACKEND_BASE;
                  return `${base}${imgPath}${imgPath.includes("?") ? "&" : "?"}t=${Date.now()}`;
                })()}
                alt={currentAd.title || "Ad"}
                className="w-full h-auto max-h-[80vh] object-cover block mx-auto rounded-lg shadow-lg"
                onError={(e) => {
                  console.error("Ad image load failed:", e.currentTarget.src);
                  setIsVisible(false); // Hide the whole popup if image is broken
                }}
              />
            </div>

            {/* Optional: small pager for multiple images */}
            {currentAd.images.length > 1 && (
              <div className="flex justify-center gap-2 mt-3 pt-3 z-10">
                {currentAd.images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentImageIndex(i)}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${i === currentImageIndex ? "bg-[#C5A861] w-6" : "bg-gray-300 hover:bg-gray-400"
                      }`}
                    aria-label={`Go to image ${i + 1}`}
                  />
                ))}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
