import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import SectionHeading from "@/components/SectionHeading";
import { Heart, Clock, Sun } from "lucide-react";
import ootyImg from "@/assets/ooty-valley.jpg";
import roomDeluxe from "@/assets/room-deluxe.jpg";
import diningImg from "@/assets/dining-rooftop.jpg";

const deals = [
  {
    icon: Heart,
    title: "Honeymoon Package",
    desc: "Celebrate love with our curated honeymoon experience. Includes candlelight dinner, spa credits, and valley-view room upgrade.",
    price: "From ₹12,999",
    badge: "Most Popular",
    image: ootyImg,
  },
  {
    icon: Clock,
    title: "Long Stay Offer",
    desc: "Extended stays made affordable. Book 7+ nights and get 30% off with complimentary breakfast and airport transfers.",
    price: "30% Off",
    badge: "Best Value",
    image: roomDeluxe,
  },
  {
    icon: Sun,
    title: "Seasonal Escape",
    desc: "Beat the heat with our summer special at Ooty. Includes nature walks, bonfire nights, and multi-cuisine dining.",
    price: "From ₹8,999",
    badge: "Limited Time",
    image: diningImg,
  },
];

export default function Deals() {
  const { locationId } = useParams<{ locationId?: string }>();
  const loc = locationId ? locationId.toLowerCase() : "";

  return (
    <div className="pt-24">
      <section className="section-padding">
        <div className="container-luxury">
          <SectionHeading
            label={loc ? `${loc.charAt(0).toUpperCase() + loc.slice(1)} Offers` : "Special Offers"}
            title={loc ? `${loc.charAt(0).toUpperCase() + loc.slice(1)} Deals` : "Exclusive Deals"}
            subtitle="Handpicked packages for unforgettable experiences"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            {deals.map((deal, i) => (
              <motion.div
                key={deal.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.6 }}
                className="group border border-border/50 overflow-hidden hover:border-primary/30 transition-all duration-500 hover-gold-glow flex flex-col rounded-lg"
              >
                <div className="relative h-40 sm:h-48 overflow-hidden">
                  <img src={deal.image} alt={deal.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <span className="absolute top-2 sm:top-4 left-2 sm:left-4 px-2 sm:px-3 py-1 text-xs font-semibold bg-primary text-primary-foreground rounded">
                    {deal.badge}
                  </span>
                </div>
                <div className="p-4 sm:p-6 flex-1 flex flex-col">
                  <deal.icon className="w-5 sm:w-6 h-5 sm:h-6 text-primary mb-2 sm:mb-3" />
                  <h3 className="text-lg sm:text-2xl font-medium mb-1 sm:mb-2">{deal.title}</h3>
                  <p className="body-text text-xs sm:text-sm mb-3 sm:mb-4 flex-1">{deal.desc}</p>
                  <div className="flex items-center justify-between gap-2 sm:gap-4">
                    <span className="text-base sm:text-xl font-medium text-primary">{deal.price}</span>
                    <Link
                      to="/rooms"
                      className="px-3 sm:px-5 py-1.5 sm:py-2 bg-primary text-primary-foreground text-xs sm:text-sm font-semibold hover:bg-primary/90 transition-all duration-300 rounded"
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
