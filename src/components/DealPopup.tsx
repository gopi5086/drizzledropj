import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Tag, ArrowRight } from "lucide-react";
import { useBooking } from "@/context/BookingContext";

interface Deal {
  _id: string;
  title: string;
  description: string;
  dealType: string;
  discountPercentage: number;
  image: string;
  isPopup: boolean;
}

const BACKEND_BASE = window.location.hostname === "localhost" ? "http://localhost:5000" : "https://drizzle-background-5.onrender.com";

export default function DealPopup() {
  const [deal, setDeal] = useState<Deal | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const { openBooking } = useBooking();

  useEffect(() => {
    const fetchPopupDeal = async () => {
      try {
        const res = await fetch(`${BACKEND_BASE}/api/deals?activeOnly=true`);
        if (res.ok) {
          const deals = await res.json();
          // Find the highest priority deal that is marked as a popup
          const popupDeal = deals.find((d: any) => d.isPopup);
          if (popupDeal) {
            setDeal(popupDeal);
            // Show after a short delay
            setTimeout(() => setIsOpen(true), 3000);
          }
        }
      } catch (error) {
        console.error("Failed to fetch popup deal:", error);
      }
    };
    
    fetchPopupDeal();
  }, []);

  if (!deal) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-lg bg-white rounded-3xl overflow-hidden shadow-2xl border border-primary/20"
          >
            {/* Close Button */}
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 z-10 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full backdrop-blur-md transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Image Section */}
            <div className="relative aspect-video">
              <img src={deal.image} alt={deal.title} className="w-full h-full object-cover" />
              <div className="absolute top-4 left-4">
                 <span className="bg-red-500 text-white text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg">
                    HOT OFFER
                 </span>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-8 text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-primary/10 text-primary px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                  <Tag className="w-4 h-4" />
                  {deal.dealType.replace(/([A-Z])/g, ' $1').trim()}
                </div>
              </div>
              
              <h2 className="text-3xl font-bold mb-3 font-serif text-gray-900">
                {deal.title}
              </h2>
              
              <p className="text-muted-foreground mb-8 text-sm leading-relaxed">
                {deal.description}
              </p>

              <div className="flex flex-col gap-3">
                <button 
                  onClick={() => {
                    openBooking();
                    setIsOpen(false);
                  }}
                  className="w-full py-4 bg-primary text-white font-bold rounded-xl shadow-lg hover:shadow-primary/30 transition-all flex items-center justify-center gap-2 group"
                >
                  CLAIM {deal.discountPercentage}% DISCOUNT NOW
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 text-xs font-bold uppercase tracking-widest hover:text-gray-600 transition-colors py-2"
                >
                  Maybe Later
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
