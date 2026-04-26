import { motion } from "framer-motion";
import { Wifi, Tv, BedDouble, Car, Coffee, Wind, Droplets, ArrowRight, Star, ShieldAlert, Users, Receipt, Info } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import { useBooking } from "@/context/BookingContext";

// ── Rooms Images ──────────────────────────────────────────────────────────
// Chennai
import chennaiStdRoom from "@/assets/Gallery/Chennai-images/STANDARD-ROOMS/Standard Room - DDI Chennai/Standard_Room_1.webp";
import chennaiDeluxeRoom from "@/assets/Gallery/Chennai-images/DELUXE-ROOMS/107_DeluxeRoom_1.webp";
import chennaiFamilyRoom from "@/assets/Gallery/Chennai-images/FAMILY-ROOMS/Family Room - DDI Chennai/Family_Room.webp";
import chennaiTripleRoom from "@/assets/Gallery/Chennai-images/TRIPLE-ROOMS/Triple Room - DDI CHennai/106_Deluxe_TripleRoom.webp";
// Ooty
import ootyStdRoom from "@/assets/Gallery/Ooty-Images/ECO-STD ROOM/BROL6978.webp";
import ootyDeluxeRoom from "@/assets/Gallery/Ooty-Images/DELUXE-ROOMS/BROL6924.webp";
import ootyFamilyRoom from "@/assets/Gallery/Ooty-Images/FAMILY-ROOMS/BROL6995.webp";
import ootyTripleRoom from "@/assets/Gallery/Ooty-Images/VILLA/BROL7104.webp";
import heroImg from "@/assets/Gallery/Chennai-images/DELUXE-ROOMS/_SPY0088.webp";
import ootyRoomsHero from "@/assets/Gallery/Ooty-Images/VIEW/BROL6956.webp";
import chennaiRoomsHero from "@/assets/Gallery/Chennai-images/DELUXE-ROOMS/_SPY0088.webp";

interface Room {
  name: string;
  desc: string;
  price?: string;
  epPrice?: string;
  cpPrice?: string;
  image: string;
  amenities: string[];
  type: string;
}

const chennaiRooms: Room[] = [
  { 
    name: "Standard Room", 
    type: "Business Comfort", 
    desc: "Well-furnished room ideal for business travelers, featuring smart Google TV and ergonomic work space.", 
    epPrice: "₹2,450", 
    cpPrice: "₹2,650",
    image: chennaiStdRoom, 
    amenities: ["WiFi", "Google TV", "Work Desk", "Toiletries"] 
  },
  { 
    name: "Deluxe Room", 
    type: "Executive Luxury", 
    desc: "Sophisticated accommodation with upscale furnishings and premium hospitality.", 
    epPrice: "₹2,800", 
    cpPrice: "₹3,000",
    image: chennaiDeluxeRoom, 
    amenities: ["WiFi", "Google TV", "Mini Bar", "Laundry"] 
  },
  { 
    name: "Triple Room", 
    type: "Group Stay", 
    desc: "Perfect for small groups or families, offering comfortable bedding for three with modern amenities.", 
    epPrice: "₹3,200", 
    cpPrice: "₹3,500",
    image: chennaiTripleRoom, 
    amenities: ["WiFi", "Google TV", "Extra Bed", "Toiletries"] 
  },
  { 
    name: "Family Room", 
    type: "Spacious Retreat", 
    desc: "Large rooms designed for families, featuring multiple beds and extra space to relax.", 
    epPrice: "₹3,700", 
    cpPrice: "₹4,100",
    image: chennaiFamilyRoom, 
    amenities: ["WiFi", "Google TV", "Spacious", "24h Hot Water"] 
  },
];

const ootyRooms: Room[] = [
  { 
    name: "Standard Room", 
    type: "Alpine Solace", 
    desc: "Individual apartment-type room with private balcony offering excellent panoramic hill views.", 
    epPrice: "₹2,450", 
    cpPrice: "₹2,650", 
    image: ootyStdRoom, 
    amenities: ["Balcony", "WiFi", "Google TV", "Scenic View"] 
  },
  { 
    name: "Deluxe Room", 
    type: "Luxury View", 
    desc: "Enchanting hill-view room with premium furnishings and a private balcony to enjoy the Nilgiris.", 
    epPrice: "₹2,800", 
    cpPrice: "₹3,000", 
    image: ootyDeluxeRoom, 
    amenities: ["Hill View", "Private Balcony", "Heater", "WiFi"] 
  },
  { 
    name: "Family Room", 
    type: "Grand Vista", 
    desc: "Large hill-station getaway for the whole family, featuring multiple beds and breathtaking views.", 
    epPrice: "₹3,700", 
    cpPrice: "₹4,100", 
    image: ootyFamilyRoom, 
    amenities: ["Panoramic View", "Private Balcony", "Spacious", "WiFi"] 
  },
  { 
    name: "Triple Room", 
    type: "Cozy Trio", 
    desc: "Mountain retreat for three, perfectly located to view the famous Nilgiris toy train route.", 
    epPrice: "₹3,200", 
    cpPrice: "₹3,500", 
    image: ootyTripleRoom, 
    amenities: ["Mountain View", "Extra Bed", "Heater", "WiFi"] 
  },
];

const policies = [
  {
    title: "Reservation Policy",
    icon: ShieldAlert,
    content: "As per booking policy, First Night Rent OR 30% of total rent should be paid as prepayment (Advance Amount).",
    color: "#2E6B8A"
  },
  {
    title: "Cancellation Policy",
    icon: Wind,
    content: "• Free cancellation until 3 days before arrival\n• First night charge if cancelled within 3 days",
    color: "#e65a5a"
  },
  {
    title: "Child Policy",
    icon: Users,
    content: "• Children under 6 years: Free stay with parents (including extra bed & breakfast)\n• Children aged 8–15 years: ₹500 per child",
    color: "#3a7d5a"
  },
  {
    title: "Tax Policy",
    icon: Receipt,
    content: "All taxes applicable as per Government rules.",
    color: "#C5A861"
  }
];

function RoomCard({ room }: { room: Room }) {
  const { openBooking } = useBooking();

  return (
    <Reveal direction="up" className="h-full">
      <div className="group bg-white rounded-3xl overflow-hidden border border-border/40 hover:border-[#C5A861]/30 transition-all duration-700 hover:shadow-[0_30px_60px_rgba(0,0,0,0.08)] h-full flex flex-col">
        <div className="relative h-72 overflow-hidden">
          <img src={room.image} alt={room.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s]" />
          
          <div className="absolute top-6 right-6 flex flex-col gap-2 items-end">
            {room.price && (
              <div className="px-4 py-2 bg-white/95 backdrop-blur-md rounded-full shadow-xl border border-[#C5A861]/20">
                <span className="text-xl font-bold text-[#2E6B8A]">{room.price}</span>
                <span className="text-[10px] uppercase tracking-tighter text-muted-foreground"> / night</span>
              </div>
            )}
            
            {(room.epPrice || room.cpPrice) && (
              <div className="px-4 py-2.5 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-[#C5A861]/20 flex flex-col gap-1 min-w-[160px] scale-90 origin-top-right">
                {room.epPrice && (
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-500">EP <span className="font-medium opacity-70">(Room Only)</span></span>
                    <span className="text-base font-extrabold text-[#2a2a2a]">{room.epPrice}</span>
                  </div>
                )}
                {room.cpPrice && (
                  <div className="flex items-center justify-between gap-4 border-t border-gray-200/60 pt-1.5 mt-0.5">
                    <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-500">CP <span className="font-medium opacity-70">(W/ BFast)</span></span>
                    <span className="text-base font-extrabold text-[#2a2a2a]">{room.cpPrice}</span>
                  </div>
                )}
              </div>
            )}
          </div>
          
          <div className="absolute bottom-6 left-6">
            <span className="px-3 py-1 bg-[#C5A861] text-white text-[9px] font-bold uppercase tracking-widest rounded-full shadow-md">{room.type}</span>
          </div>
        </div>

        <div className="p-6 lg:p-7 flex-1 flex flex-col">
          <h3 className="text-2xl font-medium mb-3 group-hover:text-[#C5A861] transition-colors">{room.name}</h3>
          <p className="body-text text-sm mb-8 leading-relaxed text-muted-foreground/90">{room.desc}</p>

          <div className="grid grid-cols-2 gap-4 mb-10 mt-auto">
            {room.amenities.map((a) => (
              <div key={a} className="flex items-center gap-3 text-xs font-semibold text-foreground/70">
                <div className="h-1.5 w-1.5 rounded-full bg-[#C5A861] flex-shrink-0" />
                {a}
              </div>
            ))}
          </div>

          <button
            onClick={() => openBooking({ roomType: room.name })}
            className="w-full group/btn relative overflow-hidden px-8 py-4 bg-[#2E6B8A] text-white text-xs font-bold tracking-[0.2em] uppercase rounded-xl transition-all duration-500 hover:shadow-[0_10px_20px_rgba(46,107,138,0.2)]"
          >
            <span className="relative z-10 flex items-center justify-center gap-3">
              Book this room
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
  const { locationId } = useParams();

  const isOoty = locationId?.toLowerCase() === "ooty";
  const isChennai = locationId?.toLowerCase() === "chennai";
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
          <img src={isOoty ? ootyRoomsHero : isChennai ? chennaiRoomsHero : heroImg} alt="Luxury Accommodations" className="w-full h-full object-cover brightness-[0.85]" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/20" />
        </motion.div>

        <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-4">
          <Reveal>
            <p className="label-caps !text-[#C5A861] mb-4 sm:mb-6 tracking-[0.4em] font-bold">The Art of Living</p>
            <h1 className="text-4xl sm:text-5xl md:text-7xl text-white font-bold leading-tight mb-4 sm:mb-8 font-display drop-shadow-xl">
              Rooms <span className="italic text-[#C5A861] font-serif">&</span> Suites {locationId ? `- ${locationId.charAt(0).toUpperCase() + locationId.slice(1)}` : ""}
            </h1>
            <div className="flex items-center gap-3 text-white/80 text-xs sm:text-sm font-semibold tracking-widest uppercase mb-8 sm:mb-10 bg-black/20 px-6 py-2 rounded-full backdrop-blur-sm border border-white/10">
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
                  <p className="body-text text-sm md:text-lg">Sophisticated urban sanctuaries located in the heart of the OMR IT Corridor. Choose from our EP or CP plans tailored for the modern professional and family tracker.</p>
                </Reveal>
              </div>
              <Reveal delay={0.3}>
                <div className="flex gap-1 text-[#C5A861] mb-3">
                  {[1, 2, 3].map(i => <Star key={i} className="w-5 sm:w-6 h-5 sm:h-6 fill-current" />)}
                </div>
                <p className="text-[10px] sm:text-xs uppercase tracking-[0.2em] font-bold text-muted-foreground">Certified 3-Star Business Hotel</p>
              </Reveal>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-24">
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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-24">
              {ootyRooms.map((room) => (
                <RoomCard key={room.name + "ooty"} room={room} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Shared Policies Section for Both Locations */}
      <section className="section-padding overflow-hidden bg-white border-t border-gray-100">
        <div className="container-luxury">
           <Reveal width="100%">
             <SectionHeading label="Guidelines" title="Hotel Policies" subtitle="Important information regarding your reservation and stay" />
           </Reveal>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16 max-w-5xl mx-auto">
             {policies.map((policy, idx) => (
               <Reveal key={idx} delay={0.1 * idx}>
                 <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group h-full flex flex-col">
                    <div className="flex items-center gap-4 mb-6">
                       <div 
                          className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0  group-hover:scale-110 transition-transform shadow-inner"
                          style={{ background: `${policy.color}15`, color: policy.color }}
                       >
                         <policy.icon className="w-6 h-6" />
                       </div>
                       <h4 className="text-xl font-bold font-display text-gray-900">{policy.title}</h4>
                    </div>
                    <div className="text-gray-600 leading-relaxed text-sm format-whitespace whitespace-pre-line font-medium opacity-90">
                       {policy.content}
                    </div>
                 </div>
               </Reveal>
             ))}
           </div>
        </div>
      </section>

    </div>
  );
}
