import { useParams, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, MapPin, Wifi, Tv, Users, ShieldCheck, Coffee, ChevronRight, ArrowRight, Wind, Waves, Sparkles, Building2, Utensils, Zap, Clock, Key, BedDouble, Car, Droplets, Receipt, Info } from "lucide-react";
import { BACKEND_BASE, API_BASE } from "@/config";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import { useBooking } from "@/context/BookingContext";
import SEO from "@/components/SEO";
import { useState, useEffect } from "react";

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
import ootyVilla from "@/assets/Gallery/Ooty-Images/VILLA/BROL7104.webp";
import heroImg from "@/assets/Gallery/Chennai-images/DELUXE-ROOMS/_SPY0088.webp";
import ootyRoomsHero from "@/assets/Gallery/Ooty-Images/VIEW/BROL6956.webp";
import chennaiRoomsHero from "@/assets/Gallery/Chennai-images/DELUXE-ROOMS/_SPY0088.webp";

interface Room {
  _id?: string;
  name: string;
  location: "CHENNAI" | "OOTY";
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
    location: "CHENNAI",
    type: "Business Comfort", 
    desc: "Well-furnished room ideal for business travelers, featuring smart Google TV and ergonomic work space.", 
    epPrice: "₹2,450", 
    cpPrice: "₹2,650",
    image: chennaiStdRoom, 
    amenities: ["WiFi", "Google TV", "Work Desk", "Toiletries"] 
  },
  { 
    name: "Deluxe Room", 
    location: "CHENNAI",
    type: "Executive Luxury", 
    desc: "Sophisticated accommodation with upscale furnishings and premium hospitality.", 
    epPrice: "₹2,800", 
    cpPrice: "₹3,000",
    image: chennaiDeluxeRoom, 
    amenities: ["WiFi", "Google TV", "Mini Bar", "Laundry"] 
  },
  { 
    name: "Triple Room", 
    location: "CHENNAI",
    type: "Group Stay", 
    desc: "Perfect for small groups or families, offering comfortable bedding for three with modern amenities.", 
    epPrice: "₹3,200", 
    cpPrice: "₹3,500",
    image: chennaiTripleRoom, 
    amenities: ["WiFi", "Google TV", "Extra Bed", "Toiletries"] 
  },
  { 
    name: "Family Room", 
    location: "CHENNAI",
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
    location: "OOTY",
    type: "Alpine Solace", 
    desc: "Individual apartment-type room with private balcony offering excellent panoramic hill views.", 
    epPrice: "₹2,450", 
    cpPrice: "₹2,650", 
    image: ootyStdRoom, 
    amenities: ["Balcony", "WiFi", "Google TV", "Scenic View"] 
  },
  { 
    name: "Deluxe Room", 
    location: "OOTY",
    type: "Luxury View", 
    desc: "Enchanting hill-view room with premium furnishings and a private balcony to enjoy the Nilgiris.", 
    epPrice: "₹2,800", 
    cpPrice: "₹3,000", 
    image: ootyDeluxeRoom, 
    amenities: ["Hill View", "Private Balcony", "Heater", "WiFi"] 
  },
  { 
    name: "Double Bed Room Villa", 
    location: "OOTY",
    type: "Spacious Luxury", 
    desc: "Luxurious two-bedroom villa offering ultimate privacy, a spacious private balcony, and premium amenities with panoramic Nilgiri views.", 
    epPrice: "₹3,200", 
    cpPrice: "₹3,500", 
    image: ootyVilla, 
    amenities: ["Mountain View", "Private Balcony", "Heater", "WiFi"] 
  },
  { 
    name: "Family Room", 
    location: "OOTY",
    type: "Grand Vista", 
    desc: "Large hill-station getaway for the whole family, featuring multiple beds and breathtaking views.", 
    epPrice: "₹3,700", 
    cpPrice: "₹4,100", 
    image: ootyFamilyRoom, 
    amenities: ["Panoramic View", "Private Balcony", "Spacious", "WiFi"] 
  },
];

const policies = [
  {
    title: "Reservation Policy",
    icon: ShieldCheck,
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

import { Link } from "react-router-dom";

function getCategoryForRoom(name: string, location: string) {
  if (location === "CHENNAI") {
    if (name === "Standard Room") return "STANDARD ROOMS";
    if (name === "Deluxe Room") return "DELUXE ROOMS";
    if (name === "Triple Room") return "TRIPLE ROOMS";
    if (name === "Family Room") return "FAMILY ROOMS";
  } else {
    if (name === "Standard Room") return "ECO STD ROOM";
    if (name === "Deluxe Room") return "DELUXE ROOMS";
    if (name === "Double Bed Room Villa") return "VILLA";
    if (name === "Family Room") return "FAMILY ROOMS";
  }
  return "All";
}

function RoomCard({ room }: { room: Room }) {
  const { openBooking } = useBooking();
  const galleryCategory = getCategoryForRoom(room.name, room.location);

  return (
    <Reveal direction="up" className="h-full">
      <div id={`${room.location.toLowerCase()}-${room.name.toLowerCase().replace(/\s+/g, '-')}`} className="group bg-white rounded-3xl overflow-hidden border border-border/40 hover:border-[#C5A861]/30 transition-all duration-700 hover:shadow-[0_30px_60px_rgba(0,0,0,0.08)] h-full flex flex-col">
        <Link to={`/${room.location.toLowerCase()}/gallery?category=${encodeURIComponent(galleryCategory)}`} className="relative h-72 overflow-hidden block">
          <img 
            src={room.image?.startsWith("/uploads") ? `${BACKEND_BASE}${room.image}` : room.image} 
            alt={room.name} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s]" 
          />
          
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
             <span className="bg-black/60 text-white px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase flex items-center gap-2 backdrop-blur-sm">
                View Photos
             </span>
          </div>
          
          <div className="absolute bottom-6 left-6 z-10">
            <span className="px-3 py-1 bg-[#C5A861] text-white text-[9px] font-bold uppercase tracking-widest rounded-full shadow-md">{room.type}</span>
          </div>
        </Link>

        <div className="p-6 lg:p-7 flex-1 flex flex-col">
          <div className="flex items-center justify-between mb-3">
             <h3 className="text-2xl font-medium group-hover:text-[#C5A861] transition-colors">{room.name}</h3>
             <div className="flex items-center gap-1.5 text-muted-foreground group-hover:text-primary transition-colors duration-500">
                <MapPin className="w-3.5 h-3.5" />
                <span className="text-[10px] font-bold uppercase tracking-widest">{room.location === 'OOTY' ? 'Ooty – Nilgiris' : 'Chennai – OMR'}</span>
             </div>
          </div>
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
            onClick={() => openBooking({ roomType: room.name, location: room.location })}
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


export default function Rooms() {
  const { locationId } = useParams();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await fetch(`${API_BASE}/rooms`);
        if (res.ok) {
          const data = await res.json();
          setRooms(data);
        }
      } catch (error) {
        console.error("Failed to fetch rooms:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRooms();
  }, []);

  const location = useLocation();
  useEffect(() => {
    if (!loading && location.hash) {
      const id = location.hash.substring(1);
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          const headerOffset = 150;
          const elementPosition = el.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });
        }
      }, 600);
    }
  }, [loading, location.hash]);

  const isOoty = locationId?.toLowerCase() === "ooty";
  const isChennai = locationId?.toLowerCase() === "chennai";
  const showChennai = !locationId || locationId.toLowerCase() === "chennai";
  const showOoty = !locationId || locationId.toLowerCase() === "ooty";

  const chennaiRoomsData = rooms.filter(r => r.location === "CHENNAI");
  const ootyRoomsData = rooms.filter(r => r.location === "OOTY");

  const seoTitle = isOoty ? "Luxury Rooms & Suites in Ooty | DrizzleDrop Inn" : isChennai ? "Executive Business Rooms Chennai OMR | DrizzleDrop Inn" : "Our Rooms & Suites | DrizzleDrop Inn";
  const seoDesc = isOoty ? "Stay in our alpine suites with private balconies and Nilgiri hill views. Perfect for families and couples." : isChennai ? "Comfortable business rooms in Thoraipakkam, OMR. Smart TVs, high-speed Wi-Fi, and 3-star luxury." : "Explore luxury accommodations at DrizzleDrop Inn. From hill-view suites in Ooty to business rooms in Chennai.";

  return (
    <div className="pt-20 bg-[#fdfdfd]">
      <SEO 
        title={seoTitle}
        description={seoDesc}
        url={`https://drizzledropinn.com/${locationId ? locationId + '/rooms' : 'rooms'}`}
      />
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
                  <p className="body-text text-sm md:text-lg">Sophisticated urban sanctuaries located in the heart of the OMR IT Corridor. Choose from our EP or CP plans tailored for the modern professional and family traveler.</p>
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
              {(chennaiRoomsData.length > 0 ? chennaiRoomsData : chennaiRooms).map((room) => (
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
              {(ootyRoomsData.length > 0 ? ootyRoomsData : ootyRooms).map((room) => (
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
