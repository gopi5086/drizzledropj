import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Tag, Clock, ChevronRight } from "lucide-react";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { useBooking } from "@/context/BookingContext";

interface Deal {
  _id: string;
  title: string;
  description: string;
  dealType: string;
  location: string;
  discountPercentage: number;
  customPrice: string;
  image: string;
  validTo: string;
  isActive: boolean;
  priority: number;
}

const BACKEND_BASE = "https://drizzledropj-1.onrender.com";

export default function DealsSection({ location }: { location: "Chennai" | "Ooty" }) {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(true);
  const { openBooking } = useBooking();

  useEffect(() => {
    const fetchDeals = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${BACKEND_BASE}/api/deals?location=${location}&activeOnly=true`);
        if (res.ok) {
          const data = await res.json();
          setDeals(data);
        }
      } catch (error) {
        console.error("Failed to fetch deals:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDeals();
  }, [location]);

  if (loading) {
    return (
      <section className="section-padding bg-secondary/5">
        <div className="container-luxury flex justify-center items-center min-h-[300px]">
          <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
        </div>
      </section>
    );
  }

  if (deals.length === 0) {
    return (
      <section id="deals" className="section-padding bg-secondary/5">
        <div className="container-luxury text-center">
          <Reveal width="100%">
            <SectionHeading 
              label="Exclusive Offers" 
              title={location === "Chennai" ? "Chennai Special Deals" : "Ooty Hillside Offers"} 
            />
          </Reveal>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-12 p-8 bg-white/60 backdrop-blur-sm rounded-2xl shadow-sm border border-border/40 max-w-2xl mx-auto"
          >
            <Tag className="w-12 h-12 text-primary/20 mx-auto mb-4" />
            <h3 className="text-xl font-medium mb-2 font-display">No active offers at the moment</h3>
            <p className="text-muted-foreground text-sm">
              We currently don't have any special deals for {location}. Please check back later or contact us directly for the best available rates.
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="deals" className="section-padding bg-secondary/5">
      <div className="container-luxury">
        <Reveal width="100%">
          <SectionHeading 
            label="Exclusive Offers" 
            title={location === "Chennai" ? "Chennai Special Deals" : "Ooty Hillside Offers"} 
          />
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {deals.map((deal, i) => (
            <Reveal key={deal._id} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl overflow-hidden shadow-md group border border-border/40 flex flex-col h-full"
              >
                {/* Image & Badges */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img 
                    src={deal.image} 
                    alt={deal.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {deal.discountPercentage > 0 && (
                      <span className="bg-red-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
                        {deal.discountPercentage}% OFF
                      </span>
                    )}
                    <span className="bg-primary text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg flex items-center gap-1">
                      <Tag className="w-3 h-3" />
                      {formatDealType(deal.dealType)}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                    {deal.title}
                  </h3>
                  <p className="text-muted-foreground text-sm line-clamp-3 mb-6">
                    {deal.description}
                  </p>
                  
                  <div className="mt-auto pt-6 border-t border-border/20 flex items-center justify-between">
                    <div>
                      {deal.customPrice && (
                        <p className="text-secondary-foreground font-bold text-lg">{deal.customPrice}</p>
                      )}
                      <p className="text-[10px] text-gray-400 flex items-center gap-1 uppercase tracking-widest font-bold">
                        <Clock className="w-3 h-3" />
                        Valid until {new Date(deal.validTo).toLocaleDateString()}
                      </p>
                    </div>
                    
                    <button 
                      onClick={() => openBooking()}
                      className="p-2 bg-primary/10 hover:bg-primary text-primary hover:text-white rounded-full transition-all duration-300"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function formatDealType(type: string) {
  const map: any = {
    "DealsOfDay": "Deal of the Day",
    "LastMinute": "Last Minute",
    "LOS": "Extended Stay",
    "Family": "Family Offer",
    "Corporate": "Corporate Rate",
    "Group": "Group Discount",
    "DayUse": "Day Use",
    "AdvanceBooking": "Advance Booking"
  };
  return map[type] || type;
}
