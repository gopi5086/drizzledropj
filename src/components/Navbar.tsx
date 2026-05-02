import { useState, useEffect, useRef, useMemo } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, UserCircle, MapPin, Phone, Mail, Wifi, Tv, Car, Utensils, Mountain, ShieldCheck, Shirt, Bell, BedDouble, Users, Flame, Coffee } from "lucide-react";
import driLogo from "../assets/drilogo.webp";
import { useBooking } from "@/context/BookingContext";
import { useAuth } from "@/context/AuthContext";
import { useLocationContext } from "@/context/LocationContext";
import Magnetic from "./Magnetic";

const locations = [
  {
    key: "chennai",
    label: "Chennai – OMR",
    path: "/chennai",
    sublabel: "Thoraipakkam, Chennai",
    phone: "+91 97911 78349",
    color: "#2E6B8A",
  },
  {
    key: "ooty",
    label: "Ooty – Nilgiris",
    path: "/ooty",
    sublabel: "Fern Hill, Ooty",
    phone: "+91 91504 86153",
    color: "#3a7d5a",
  },
];

export default function Navbar() {
  const { openBooking } = useBooking();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [locationOpen, setLocationOpen] = useState(false);
  const [facilitiesOpen, setFacilitiesOpen] = useState(false);
  const [roomsOpen, setRoomsOpen] = useState(false);
  const [diningOpen, setDiningOpen] = useState(false);
  const [mobileLocOpen, setMobileLocOpen] = useState(false);
  const locationDropRef = useRef<HTMLDivElement>(null);

  const { currentLocation, setCurrentLocation } = useLocationContext();

  // Determine current location key from URL
  const pathParts = location.pathname.split("/");
  const currentLocKey = locations.find(l => pathParts[1] === l.key)?.key;

  // Sync valid URL location to context
  useEffect(() => {
    if (currentLocKey && currentLocKey !== currentLocation) {
      setCurrentLocation(currentLocKey as any);
    }
  }, [currentLocKey, currentLocation, setCurrentLocation]);

  // If we are on a common page (no specific location in URL), we show the common links
  const isCommonPage = !currentLocKey;
  const activeLocKey = isCommonPage ? "" : currentLocKey;

  const getNavLinks = (locKey: string) => {
    const prefix = locKey ? `/${locKey}` : "";
    return [
      { label: "Home", path: locKey ? `${prefix}` : "/" },
      {
        label: "Rooms & Suites",
        path: `${prefix}/rooms`,
        isRooms: true
      },
      {
        label: "Dining",
        path: `${prefix}/dining`,
        isDining: true
      },
      {
        label: "Facilities",
        path: `${prefix}/facilities`,
        isFacilities: true
      },
      {
        label: "Gallery",
        path: `${prefix}/gallery`,
        dropdown: locKey ? undefined : [
          { label: "Chennai Gallery", path: "/chennai/gallery" },
          { label: "Ooty Gallery", path: "/ooty/gallery" },
        ],
      },
      { label: "Offers", path: `${prefix}/deals` },
      { label: "Contact", path: `${prefix}/contact` },
    ];
  };

  const facilitiesList = useMemo(() => {
    if (activeLocKey === "ooty") {
      return [
        { name: "Hill & Valley Views", icon: Mountain },
        { name: "Private Balcony", icon: Tv },
        { name: "Bonfire & Barbeque", icon: Flame },
        { name: "Free Hi-Speed Wi-Fi", icon: Wifi },
        { name: "Smart Google TV", icon: Tv },
        { name: "Secure Parking", icon: Car },
        { name: "Lawn & Nature Walk", icon: Mountain },
        { name: "24/7 Support", icon: ShieldCheck },
      ];
    }
    if (activeLocKey === "chennai") {
      return [
        { name: "Free Hi-Speed Wi-Fi", icon: Wifi },
        { name: "Smart Google TV", icon: Tv },
        { name: "Secure Parking", icon: Car },
        { name: "Rooftop Dining", icon: Utensils },
        { name: "24/7 Security", icon: ShieldCheck },
        { name: "Laundry Service", icon: Shirt },
        { name: "Room Service", icon: Bell },
        { name: "OMR Proximity", icon: MapPin },
      ];
    }
    return [
      { name: "Modern Facilities", icon: Wifi },
      { name: "Secure Parking", icon: Car },
      { name: "Prime Locations", icon: MapPin },
      { name: "24/7 Security", icon: ShieldCheck },
      { name: "Guest Support", icon: Bell },
      { name: "Smart TVs", icon: Tv },
    ];
  }, [activeLocKey]);

  const roomsList = useMemo(() => {
    if (activeLocKey === "ooty") {
      return [
        { name: "Alpine Solace (Std)", icon: BedDouble },
        { name: "Luxury View (Deluxe)", icon: Tv },
        { name: "Cozy Trio (Triple)", icon: Users },
        { name: "Grand Vista (Family)", icon: Mountain },
      ];
    }
    if (activeLocKey === "chennai") {
      return [
        { name: "Standard Room", icon: BedDouble },
        { name: "Deluxe Room", icon: Tv },
        { name: "Triple Room", icon: Users },
        { name: "Family Room", icon: Users },
      ];
    }
    return [
      { name: "Standard Rooms", icon: BedDouble },
      { name: "Deluxe Rooms", icon: Tv },
      { name: "Triple Rooms", icon: Users },
      { name: "Family Suites", icon: Users },
    ];
  }, [activeLocKey]);

  const diningList = useMemo(() => {
    if (activeLocKey === "ooty") {
      return [
        { name: "In-Room Dining", icon: Bell },
        { name: "Barbeque Nights", icon: Flame },
        { name: "Bonfire Experience", icon: Flame },
        { name: "Scenic Breakfast", icon: Mountain },
      ];
    }
    if (activeLocKey === "chennai") {
      return [
        { name: "Rooftop Restaurant", icon: Utensils },
        { name: "Multi-Cuisine", icon: Utensils },
        { name: "Asian Delicacies", icon: Utensils },
        { name: "24/7 Room Service", icon: Bell },
      ];
    }
    return [
      { name: "Fine Dining", icon: Utensils },
      { name: "Room Service", icon: Bell },
      { name: "Local Flavors", icon: MapPin },
      { name: "Global Cuisine", icon: Utensils },
    ];
  }, [activeLocKey]);

  const navLinks = getNavLinks(activeLocKey);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 60);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [location]);

  // Close location dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (locationDropRef.current && !locationDropRef.current.contains(e.target as Node)) {
        setLocationOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const isTransparent = !scrolled && !mobileOpen;

  const currentLocObj = locations.find((l) => activeLocKey === l.key);

  const handleLocationSelect = (loc: any) => {
    setCurrentLocation(loc.key);
    setLocationOpen(false);
    setMobileLocOpen(false);
  };

  return (
    <header
      className={`fixed left-0 right-0 z-[100] transition-all duration-300 ${scrolled
        ? "top-0 bg-white/98 backdrop-blur-md shadow-lg border-b border-[#2E6B8A]/15 py-1.5"
        : isCommonPage
          ? "top-0 bg-black/20 backdrop-blur-sm py-3"
          : "top-[92px] md:top-9 bg-black/20 backdrop-blur-sm py-3"
        }`}
    >
      <div className="container-luxury flex items-center justify-between relative">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 flex-shrink-0 z-10">
          <img
            src={driLogo}
            alt="DrizzleDrop Inn"
            className="h-[44px] sm:h-[60px] lg:h-[72px] w-auto object-contain"
          />
        </Link>

        {/* Mobile-Only Centered Location Switcher */}
        <div className="lg:hidden absolute left-1/2 -translate-x-1/2 flex items-center">
          <div
            className="relative"
            onMouseEnter={() => setLocationOpen(true)}
            onMouseLeave={() => setLocationOpen(false)}
          >
            <button
              onClick={() => setLocationOpen(!locationOpen)}
              className={`px-2 py-1.5 text-[10px] font-bold tracking-wide transition-all duration-300 flex items-center gap-1 rounded-full border border-primary/20 bg-primary/5 ${currentLocObj ? "text-[#C5A861]" : "text-[#2a2a2a]/80"}`}
            >
              <MapPin className="w-3 h-3 text-primary" />
              <span className="max-w-[70px] truncate uppercase tracking-tighter">
                {currentLocObj ? currentLocObj.label.split(' – ')[0] : "Locations"}
              </span>
              <ChevronDown className={`w-2.5 h-2.5 opacity-70 transition-transform duration-300 ${locationOpen ? "rotate-180" : ""}`} />
            </button>
            
            <AnimatePresence>
              {locationOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-3 bg-white rounded-2xl min-w-[220px] shadow-2xl border border-primary/10 overflow-hidden z-[110]"
                >
                  <Link
                    to="/"
                    onClick={() => { setLocationOpen(false); setMobileLocOpen(false); setCurrentLocation(null); }}
                    className="flex items-start gap-3 px-4 py-3 hover:bg-gray-50 border-b border-gray-100"
                  >
                    <div className="w-2 h-2 rounded-full mt-1.5 bg-gray-400" />
                    <div>
                      <span className="text-xs font-bold text-gray-800">All Locations</span>
                    </div>
                  </Link>
                  {locations.filter(loc => loc.key !== activeLocKey).map((loc) => (
                    <Link
                      key={loc.key}
                      to={loc.path}
                      onClick={() => handleLocationSelect(loc)}
                      className="flex items-start gap-3 px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-0"
                    >
                      <div className="w-2 h-2 rounded-full mt-1.5" style={{ backgroundColor: loc.color }} />
                      <div className="text-xs font-bold text-gray-800">{loc.label}</div>
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Desktop Nav - Hidden on Mobile */}
        <nav className="hidden lg:flex items-center gap-0.5">
          {/* Desktop Location Switcher - After Logo */}
          <div
            className="relative mr-2"
            ref={locationDropRef}
            onMouseEnter={() => setLocationOpen(true)}
            onMouseLeave={() => setLocationOpen(false)}
          >
            <button
              onClick={() => setLocationOpen(!locationOpen)}
              className={`px-3.5 py-2 text-sm font-medium tracking-wide transition-all duration-300 relative group flex items-center gap-1.5 rounded-md ${currentLocObj
                ? "text-[#C5A861]"
                : isTransparent ? "text-white/90" : "text-[#2a2a2a]/80 hover:text-[#2E6B8A]"
                }`}
            >
              <MapPin className="w-3.5 h-3.5 opacity-70" />
              {currentLocObj ? currentLocObj.label : "Our Locations"}
              <ChevronDown className={`w-3 h-3 opacity-70 transition-transform duration-300 ${locationOpen ? "rotate-180" : ""}`} />
            </button>

            <AnimatePresence>
              {locationOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-0 mt-2 bg-white rounded-xl min-w-[240px] shadow-2xl border border-[#2E6B8A]/15 overflow-hidden"
                >
                  <Link
                    to="/"
                    onClick={() => { setLocationOpen(false); setMobileLocOpen(false); setCurrentLocation(null); }}
                    className={`flex items-start gap-3 px-5 py-4 transition-colors hover:bg-gray-50 border-b border-gray-100 ${isCommonPage ? "bg-gray-50" : ""}`}
                  >
                    <div className="w-2.5 h-2.5 rounded-full mt-1.5 flex-shrink-0 bg-gray-400" />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-[#2a2a2a]">All Locations (Main)</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5">Explore our brand properties</p>
                    </div>
                  </Link>

                  {locations.filter(loc => loc.key !== activeLocKey).map((loc) => {
                    const pathParts = location.pathname.split("/");
                    let targetPath = loc.path;
                    if (pathParts.length >= 3 && (pathParts[1] === "chennai" || pathParts[1] === "ooty")) {
                      targetPath = `${loc.path}/${pathParts.slice(2).join("/")}`;
                    } else if (pathParts.length === 2 && pathParts[1] && pathParts[1] !== "chennai" && pathParts[1] !== "ooty") {
                      targetPath = `${loc.path}/${pathParts[1]}`;
                    }
                    return (
                      <Link
                        key={loc.key}
                        to={targetPath}
                        onClick={() => handleLocationSelect(loc)}
                        className="flex items-start gap-3 px-5 py-4 transition-colors hover:bg-gray-50 border-b border-gray-100 last:border-0"
                      >
                        <div className="w-2.5 h-2.5 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: loc.color }} />
                        <div>
                          <div className="text-sm font-bold text-[#2a2a2a]">{loc.label}</div>
                          <p className="text-[10px] text-gray-400 mt-0.5 uppercase tracking-wider">{loc.sublabel}</p>
                        </div>
                      </Link>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {navLinks.map((link) => {
            const isHash = link.path.startsWith("#");
            const isActive = isHash ? false : location.pathname === link.path;

            const handleClick = (e: React.MouseEvent) => {
              if (link.path === "/" && location.pathname === "/") {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            };

            return (
              <div
                key={link.path}
                className="relative"
                onMouseEnter={() => {
                  if (link.dropdown) setGalleryOpen(true);
                  if (link.isFacilities) setFacilitiesOpen(true);
                  if (link.isRooms) setRoomsOpen(true);
                  if (link.isDining) setDiningOpen(true);
                }}
                onMouseLeave={() => {
                  if (link.dropdown) setGalleryOpen(false);
                  if (link.isFacilities) setFacilitiesOpen(false);
                  if (link.isRooms) setRoomsOpen(false);
                  if (link.isDining) setDiningOpen(false);
                }}
              >
                <Link
                  to={link.path}
                  onClick={handleClick}
                  className={`px-3.5 py-2 text-sm font-medium tracking-wide transition-all duration-300 relative group flex items-center gap-1 rounded-md ${isActive
                    ? isTransparent ? "text-[#3a7d5a]" : "text-[#2E6B8A]"
                    : isTransparent
                      ? "text-white hover:text-white"
                      : "text-[#2a2a2a]/80 hover:text-[#2E6B8A]"
                    }`}
                >
                  {link.label}
                  {(link.dropdown || link.isFacilities || link.isRooms || link.isDining) && <ChevronDown className="w-3 h-3 opacity-70" />}
                  <span
                    className={`absolute bottom-0 left-3 right-3 h-[2px] rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left ${isTransparent ? "bg-[#3a7d5a]" : "bg-[#2E6B8A]"
                      }`}
                  />
                </Link>

                {link.dropdown && (
                  <AnimatePresence>
                    {galleryOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-2 bg-white rounded-xl py-2 min-w-[200px] shadow-xl border border-[#2E6B8A]/15"
                      >
                        {link.dropdown.map((item) => (
                          <Link
                            key={item.path}
                            to={item.path}
                            className="block px-5 py-2.5 text-sm text-[#2a2a2a]/70 hover:text-[#2E6B8A] hover:bg-[#2E6B8A]/8 transition-colors font-medium text-center"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}

                {link.isRooms && (
                  <AnimatePresence>
                    {roomsOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-[-100px] mt-2 bg-white rounded-2xl p-6 min-w-[450px] shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-[#2E6B8A]/10 grid grid-cols-2 gap-4"
                      >
                        {roomsList.map((item) => {
                          const Icon = item.icon;
                          return (
                            <div key={item.name} className="flex items-center gap-4 p-2 rounded-xl transition-all duration-300 hover:bg-[#2E6B8A]/5 group/item">
                              <div className="w-10 h-10 rounded-lg bg-[#2E6B8A]/5 flex items-center justify-center text-[#2E6B8A] group-hover/item:bg-[#2E6B8A]/10 transition-colors">
                                <Icon className="w-5 h-5" />
                              </div>
                              <span className="text-sm font-semibold text-gray-700 group-hover/item:text-[#2E6B8A] transition-colors">
                                {item.name}
                              </span>
                            </div>
                          );
                        })}

                        <div className="col-span-2 pt-4 border-t border-gray-100 mt-2">
                          <Link
                            to={link.path}
                            className="text-xs font-bold text-[#C5A861] uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:gap-4 transition-all"
                          >
                            View All Rooms
                            <ChevronDown className="-rotate-90 w-3 h-3" />
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}

                {link.isDining && (
                  <AnimatePresence>
                    {diningOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-[-100px] mt-2 bg-white rounded-2xl p-6 min-w-[450px] shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-[#2E6B8A]/10 grid grid-cols-2 gap-4"
                      >
                        {diningList.map((item) => {
                          const Icon = item.icon;
                          return (
                            <div key={item.name} className="flex items-center gap-4 p-2 rounded-xl transition-all duration-300 hover:bg-[#2E6B8A]/5 group/item">
                              <div className="w-10 h-10 rounded-lg bg-[#2E6B8A]/5 flex items-center justify-center text-[#2E6B8A] group-hover/item:bg-[#2E6B8A]/10 transition-colors">
                                <Icon className="w-5 h-5" />
                              </div>
                              <span className="text-sm font-semibold text-gray-700 group-hover/item:text-[#2E6B8A] transition-colors">
                                {item.name}
                              </span>
                            </div>
                          );
                        })}

                        <div className="col-span-2 pt-4 border-t border-gray-100 mt-2">
                          <Link
                            to={link.path}
                            className="text-xs font-bold text-[#C5A861] uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:gap-4 transition-all"
                          >
                            Explore Dining Experience
                            <ChevronDown className="-rotate-90 w-3 h-3" />
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}

                {link.isFacilities && (
                  <AnimatePresence>
                    {facilitiesOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-[-150px] mt-2 bg-white rounded-2xl p-6 min-w-[500px] shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-[#2E6B8A]/10 grid grid-cols-2 gap-4"
                      >
                        {facilitiesList.map((item) => {
                          const Icon = item.icon;
                          return (
                            <div key={item.name} className="flex items-center gap-4 p-2 rounded-xl transition-all duration-300 hover:bg-[#2E6B8A]/5 group/item">
                              <div className="w-10 h-10 rounded-lg bg-[#2E6B8A]/5 flex items-center justify-center text-[#2E6B8A] group-hover/item:bg-[#2E6B8A]/10 transition-colors">
                                <Icon className="w-5 h-5" />
                              </div>
                              <span className="text-sm font-semibold text-gray-700 group-hover/item:text-[#2E6B8A] transition-colors">
                                {item.name}
                              </span>
                            </div>
                          );
                        })}

                        <div className="col-span-2 pt-4 border-t border-gray-100 mt-2">
                          <Link
                            to={link.path}
                            className="text-xs font-bold text-[#C5A861] uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:gap-4 transition-all"
                          >
                            Explore All Facilities
                            <ChevronDown className="-rotate-90 w-3 h-3" />
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            );
          })}
        </nav>

        {/* Header Actions */}
        <div className="flex items-center gap-2 sm:gap-3 z-10">
          <Magnetic strength={0.2}>
            <button
              onClick={() => openBooking()}
              className={`hidden sm:inline-flex items-center px-6 py-2.5 text-sm font-bold tracking-widest uppercase transition-all duration-300 rounded-md hover:scale-105 active:scale-95 ${isTransparent
                ? "bg-[#3a7d5a] hover:bg-[#3a7d5a] text-white shadow-lg shadow-black/20"
                : "bg-[#2E6B8A] hover:bg-[#255a75] text-white shadow-md"
                }`}
            >
              Book Now
            </button>
          </Magnetic>



          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`p-2 rounded-md transition-colors ${isTransparent ? "text-white hover:bg-white/10" : "text-[#2E6B8A] hover:bg-[#2E6B8A]/10"} lg:hidden`}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-[#2E6B8A]/15 overflow-hidden shadow-lg"
          >
            <nav className="container-luxury py-4 flex flex-col gap-1">

              {/* Mobile Location Switcher */}
              <div>
                <button
                  onClick={() => setMobileLocOpen(!mobileLocOpen)}
                  className="w-full flex items-center justify-between px-4 py-3 text-sm font-semibold rounded-md text-[#2E6B8A] bg-[#2E6B8A]/5 mb-1"
                >
                  <span className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {currentLocObj ? currentLocObj.label : "Our Locations"}
                  </span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${mobileLocOpen ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {mobileLocOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="pl-3 mb-1 overflow-hidden"
                    >
                      <Link
                        to="/"
                        onClick={() => { setMobileLocOpen(false); setMobileOpen(false); setCurrentLocation(null); }}
                        className={`block px-4 py-2.5 text-sm rounded-md mb-1 transition-colors ${isCommonPage
                          ? "font-bold text-gray-700 bg-gray-100"
                          : "text-[#2a2a2a]/70 hover:text-[#2E6B8A] hover:bg-[#2E6B8A]/5"
                          }`}
                      >
                        <div className="font-semibold">All Locations (Main)</div>
                        <div className="text-xs opacity-60">Explore our brand properties</div>
                      </Link>

                      {locations.filter(loc => loc.key !== activeLocKey).map((loc) => {
                        // Intelligent routing: Preserve the current sub-page when switching locations
                        const pathParts = location.pathname.split("/");
                        let targetPath = loc.path;

                        // If user is on a specific location page like /chennai/rooms -> go to /ooty/rooms
                        if (pathParts.length >= 3 && (pathParts[1] === "chennai" || pathParts[1] === "ooty")) {
                          targetPath = `${loc.path}/${pathParts.slice(2).join("/")}`;
                        }
                        // If user is on a shared page like /rooms -> go to /ooty/rooms
                        else if (pathParts.length === 2 && pathParts[1] && pathParts[1] !== "chennai" && pathParts[1] !== "ooty") {
                          targetPath = `${loc.path}${location.pathname}`;
                        }

                        return (
                          <Link
                            key={loc.path}
                            to={targetPath}
                            onClick={() => handleLocationSelect(loc)}
                            className={`block px-4 py-2.5 text-sm rounded-md mb-1 transition-colors text-[#2a2a2a]/70 hover:text-[#2E6B8A] hover:bg-[#2E6B8A]/5`}
                          >
                            <div className="font-semibold">{loc.label}</div>
                            <div className="text-xs opacity-60">{loc.sublabel}</div>
                          </Link>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {navLinks.map((link) => (
                <div key={link.path}>
                  <Link
                    to={link.path}
                    onClick={() => setMobileOpen(false)}
                    className={`block px-4 py-3 text-base font-medium transition-colors ${location.pathname === link.path
                      ? "text-[#2E6B8A]"
                      : "text-foreground/80 hover:text-[#2E6B8A]"
                      }`}
                  >
                    {link.label}
                  </Link>
                  {link.dropdown && (
                    <div className="pl-6 bg-gray-50/50">
                      {link.dropdown.map((item) => (
                        <Link
                          key={item.path}
                          to={item.path}
                          onClick={() => setMobileOpen(false)}
                          className="block px-4 py-3 text-sm text-[#2a2a2a]/60 hover:text-[#2E6B8A] transition-colors"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              <div className="mt-4 pt-4 border-t border-gray-100 flex flex-col gap-3">
                <Link
                  to={isAuthenticated ? "/admin/dashboard" : "/admin/login"}
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-gray-400 hover:text-[#2E6B8A] uppercase tracking-widest text-center"
                >
                  Staff Portal Access
                </Link>

                <button
                  onClick={() => {
                    setMobileOpen(false);
                    openBooking();
                  }}
                  className="mx-2 text-center px-6 py-4 bg-[#2E6B8A] text-white text-sm font-bold tracking-widest uppercase rounded-xl shadow-lg shadow-[#2E6B8A]/20 active:scale-95 transition-all"
                >
                  Book Your Stay Now
                </button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
