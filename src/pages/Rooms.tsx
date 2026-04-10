import { motion } from "framer-motion";
import { Wifi, Tv, BedDouble, Car, Coffee, Wind, Droplets, ArrowRight, Star } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import { useBooking } from "@/context/BookingContext";

// ── Rooms Images ──────────────────────────────────────────────────────────
import roomStandard from "@/asset_images/WhatsApp Image 2026-03-16 at 3.46.33 PM (1).jpeg";
import roomTriple from "@/asset_images/WhatsApp Image 2026-03-16 at 3.46.33 PM (2).jpeg";
import roomFamily from "@/asset_images/WhatsApp Image 2026-03-16 at 3.46.33 PM (44).jpeg";
import roomDeluxe from "@/asset_images/WhatsApp Image 2026-03-16 at 3.46.33 PM (46).jpeg";
import heroImg from "@/asset_images/WhatsApp Image 2026-03-16 at 3.46.33 PM (52).jpeg";

interface Room {
  name: string;
  desc: string;
  price: string;
  image: string;
  amenities: string[];
  type: string;
}

const chennaiRooms: Room[] = [
  { name: "Standard Room", type: "Business Comfort", desc: "Well-furnished room ideal for business travelers, featuring smart Google TV and ergonomic work space.", price: "₹2,999", image: roomStandard, amenities: ["WiFi", "Google TV", "Work Desk", "Toiletries"] },
  { name: "Triple Room", type: "Group Stay", desc: "Perfect for small groups or families, offering comfortable bedding for three with modern amenities.", price: "₹3,999", image: roomTriple, amenities: ["WiFi", "Google TV", "Extra Bed", "Toiletries"] },
  { name: "Family Room", type: "Spacious Retreat", desc: "Large rooms designed for families, featuring multiple beds and extra space to relax.", price: "₹4,999", image: roomFamily, amenities: ["WiFi", "Google TV", "Spacious", "24h Hot Water"] },
  { name: "Deluxe Room", type: "Executive Luxury", desc: "Sophisticated accommodation with upscale furnishings and premium hospitality.", price: "₹4,499", image: roomDeluxe, amenities: ["WiFi", "Google TV", "Mini Bar", "Laundry"] },
];

const ootyRooms: Room[] = [
  { name: "Standard Room", type: "Alpine Solace", desc: "Individual apartment-type room with private balcony offering excellent panoramic hill views.", price: "₹3,499", image: roomStandard, amenities: ["Balcony", "WiFi", "Google TV", "Scenic View"] },
  { name: "Deluxe Room", type: "Luxury View", desc: "Enchanting hill-view room with premium furnishings and a private balcony to enjoy the Nilgiris.", price: "₹4,999", image: roomDeluxe, amenities: ["Hill View", "Private Balcony", "Heater", "WiFi"] },
  { name: "Triple Room", type: "Cozy Trio", desc: "Mountain retreat for three, perfectly located to view the famous Nilgiris toy train.", price: "₹4,499", image: roomTriple, amenities: ["Mountain View", "Extra Bed", "Heater", "WiFi"] },
  { name: "Family Room", type: "Grand Vista", desc: "Large hill-station getaway for the whole family, featuring multiple beds and breathtaking views.", price: "₹5,999", image: roomFamily, amenities: ["Panoramic View", "Private Balcony", "Spacious", "WiFi"] },
];

function RoomCard({ room }: { room: Room }) {
  const { openBooking } = useBooking();

  return (
    <Reveal direction="up">
      <div className="group bg-white rounded-3xl overflow-hidden border border-border/40 hover:border-[#C5A861]/30 transition-all duration-700 hover:shadow-[0_30px_60px_rgba(0,0,0,0.08)] h-full flex flex-col">
        <div className="relative h-72 overflow-hidden">
          <img src={room.image} alt={room.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s]" />
          <div className="absolute top-6 right-6 px-4 py-2 bg-white/90 backdrop-blur-md rounded-full shadow-xl border border-[#C5A861]/20">
            <span className="text-xl font-bold text-[#2E6B8A]">{room.price}</span>
            <span className="text-[10px] uppercase tracking-tighter text-muted-foreground"> / night</span>
          </div>
          <div className="absolute bottom-6 left-6">
            <span className="px-3 py-1 bg-[#C5A861] text-white text-[9px] font-bold uppercase tracking-widest rounded-full">{room.type}</span>
          </div>
        </div>

        <div className="p-10 flex-1 flex flex-col">
          <h3 className="text-2xl md:text-3xl font-medium mb-4 group-hover:text-[#C5A861] transition-colors">{room.name}</h3>
          <p className="body-text text-sm mb-8 leading-relaxed text-muted-foreground/90">{room.desc}</p>

          <div className="grid grid-cols-2 gap-4 mb-10 mt-auto">
            {room.amenities.map((a) => (
              <div key={a} className="flex items-center gap-3 text-xs font-medium text-foreground/70">
                <div className="h-1.5 w-1.5 rounded-full bg-[#C5A861]" />
                {a}
              </div>
            ))}
          </div>

          <button
            onClick={() => openBooking({ roomType: room.name })}
            className="w-full group/btn relative overflow-hidden px-8 py-4 bg-[#2E6B8A] text-white text-xs font-bold tracking-[0.2em] uppercase rounded-xl transition-all duration-500 hover:shadow-[0_10px_20px_rgba(46,107,138,0.2)]"
          >
            <span className="relative z-10 flex items-center justify-center gap-3">
              Book Sanctuary
              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-2 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-[#C5A861] translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500" />
          </button>
        </div>
      </div>
    </Reveal>
  );
}

import { useParams } from "react-router-dom";

export default function Rooms() {
  const { openBooking } = useBooking();
  const { locationId } = useParams();

  const showChennai = !locationId || locationId.toLowerCase() === "chennai";
  const showOoty = !locationId || locationId.toLowerCase() === "ooty";

  return (
    <div className="pt-20 bg-[#fdfdfd]">
      {/* ── Cinematic Hero ── */}
      <section className="relative h-[70vh] sm:h-[75vh] min-h-[400px] sm:min-h-[500px] overflow-hidden">
        <motion.div
          initial={{ scale: 1.15 }}
          animate={{ scale: 1 }}
          transition={{ duration: 15, ease: "linear" }}
          className="absolute inset-0"
        >
          <img src={heroImg} alt="Luxury Accommodations" className="w-full h-full object-cover brightness-[0.85]" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/20" />
        </motion.div>

        <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-4">
          <Reveal>
            <p className="label-caps !text-[#C5A861] mb-4 sm:mb-6 tracking-[0.4em] font-bold">The Art of Living</p>
            <h1 className="text-3xl sm:text-5xl md:text-7xl text-white font-bold leading-tight mb-4 sm:mb-8">
              Exquisite <br />
              <span className="italic text-[#C5A861] drop-shadow-[0_0_30px_rgba(197,168,97,0.3)]">Dwellings</span>
            </h1>
            <div className="flex items-center gap-3 text-white/70 text-xs sm:text-sm font-medium tracking-widest uppercase mb-8 sm:mb-10">
              {locationId ? (locationId.toUpperCase()) : "Chennai & Ooty"}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Chennai Section */}
      {showChennai && (
        <section className="section-padding overflow-hidden">
          <div className="container-luxury">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 md:gap-10 mb-12 md:mb-20">
              <div className="max-w-2xl">
                <Reveal>
                  <p className="label-caps !text-[#C5A861] mb-4 sm:mb-6">Metropolitan Elegance</p>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 sm:mb-8">DrizzleDrop <br /><span className="italic text-[#C5A861]">Chennai</span></h2>
                  <p className="body-text text-sm md:text-lg">Sophisticated urban sanctuaries located in the heart of the OMR IT Corridor. Perfect for the modern professional and global traveler.</p>
                </Reveal>
              </div>
              <Reveal delay={0.3}>
                <div className="flex gap-1 text-[#C5A861] mb-2">
                  {[1, 2, 3].map(i => <Star key={i} className="w-4 sm:w-5 h-4 sm:h-5 fill-current" />)}
                </div>
                <p className="text-[9px] sm:text-[10px] uppercase tracking-widest font-bold text-muted-foreground">Certified 3-Star Business Hotel</p>
              </Reveal>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {chennaiRooms.map((room) => (
                <RoomCard key={room.name + "chennai"} room={room} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Divider */}
      {showChennai && showOoty && (
        <div className="container-luxury h-px bg-gradient-to-r from-transparent via-border/60 to-transparent" />
      )}

      {/* Ooty Section */}
      {showOoty && (
        <section className="section-padding bg-secondary/5 overflow-hidden">
          <div className="container-luxury">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 md:gap-10 mb-12 md:mb-20 text-right md:text-left">
              <div className="max-w-2xl">
                <Reveal direction="right">
                  <p className="label-caps !text-[#C5A861] mb-4 sm:mb-6">Mountain Sanctuaries</p>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 sm:mb-8">DrizzleDrop <br /><span className="italic text-[#C5A861]">Ooty</span></h2>
                  <p className="body-text text-sm md:text-lg">Alpine retreats with private balconies overlooking the historical Nilgiris. Experience the whisper of the hills and the mist of the valley.</p>
                </Reveal>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {ootyRooms.map((room) => (
                <RoomCard key={room.name + "ooty"} room={room} />
              ))}
            </div>
          </div>
        </section>
      )}


    </div>
  );
}
