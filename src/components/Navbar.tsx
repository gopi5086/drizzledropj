import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, UserCircle, MapPin, Phone, Mail } from "lucide-react";
import driLogo from "../assets/drilogo.png";
import { useBooking } from "@/context/BookingContext";
import { useAuth } from "@/context/AuthContext";
import { useLocationContext } from "@/context/LocationContext";

const locations = [
  {
    key: "chennai",
    label: "Chennai – OMR",
    path: "/chennai",
    sublabel: "Thoriaipakkam, Chennai",
    phone: "+91 86678 25086",
    color: "#2E6B8A",
  },
  {
    key: "ooty",
    label: "Ooty – Nilgiris",
    path: "/ooty",
    sublabel: "2 KM from Ooty Bus Stand",
    phone: "+91 86678 25086",
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

  const activeLocKey = currentLocKey || currentLocation || "";

  const getNavLinks = (locKey: string) => {
    const prefix = locKey ? `/${locKey}` : "";
    return [
      { label: "Home", path: locKey ? `${prefix}` : "/" },
      { label: "Rooms & Tariff", path: `${prefix}/rooms` },
      { label: "Dining", path: `${prefix}/dining` },
      // Special case: Chennai Facilities should go to /chennai/facilities
      { label: "Facilities", path: locKey === "chennai" ? "/chennai/facilities" : `${prefix}/facilities` },
      { label: locKey === "chennai" ? "About" : "About", path: `${prefix}/about` },
      { label: "Deals", path: `${prefix}/deals` },
      {
        label: "Gallery",
        path: `${prefix}/gallery`,
        dropdown: locKey ? undefined : [
          { label: "Chennai Gallery", path: "/chennai/gallery" },
          { label: "Ooty Gallery", path: "/ooty/gallery" },
        ],
      },
      { label: "Contact", path: `${prefix}/contact` },
    ];
  };

  const navLinks = getNavLinks(activeLocKey);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
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
      style={{ top: '2rem' }} // Push navbar below the sticky TopContactBar (height: 2rem = 32px)
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${scrolled
          ? "bg-white/98 backdrop-blur-md shadow-md border-b border-[#2E6B8A]/15 py-2"
          : "bg-black/10 backdrop-blur-sm py-4"
        }`}
    >
      <div className="container-luxury flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 flex-shrink-0">
          <img
            src={driLogo}
            alt="DrizzleDrop Inn"
            className="h-[60px] lg:h-[72px] w-auto object-contain"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-0.5">
          {/* Location Switcher */}
          <div className="relative" ref={locationDropRef}>
            <button
              onClick={() => setLocationOpen(!locationOpen)}
              className={`px-3.5 py-2 text-sm font-medium tracking-wide transition-all duration-300 relative group flex items-center gap-1.5 rounded-md ${currentLocObj
                  ? isTransparent ? "text-[#C5A861]" : "text-[#C5A861]"
                  : isTransparent
                    ? "text-white/90 hover:text-white"
                    : "text-[#2a2a2a]/80 hover:text-[#2E6B8A]"
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
                  {locations.map((loc) => {
                    const isActive = activeLocKey === loc.key;
                    return (
                      <Link
                        key={loc.path}
                        to={loc.path}
                        onClick={() => handleLocationSelect(loc)}
                        className={`flex items-start gap-3 px-5 py-4 transition-colors hover:bg-gray-50 border-b border-gray-100 last:border-0 ${isActive ? "bg-gray-50" : ""
                          }`}
                      >
                        <div
                          className="w-2.5 h-2.5 rounded-full mt-1.5 flex-shrink-0"
                          style={{ background: loc.color }}
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-[#2a2a2a]">{loc.label}</span>
                            {isActive && (
                              <span className="text-[9px] uppercase tracking-widest font-bold px-2 py-0.5 rounded-full text-white" style={{ background: loc.color }}>
                                Current
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-gray-500 mt-0.5">{loc.sublabel}</p>
                          <p className="text-xs font-medium mt-0.5" style={{ color: loc.color }}>{loc.phone}</p>
                        </div>
                      </Link>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Regular nav links */}
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
                onMouseEnter={() => link.dropdown && setGalleryOpen(true)}
                onMouseLeave={() => link.dropdown && setGalleryOpen(false)}
              >
                <Link
                  to={link.path}
                  onClick={handleClick}
                  className={`px-3.5 py-2 text-sm font-medium tracking-wide transition-all duration-300 relative group flex items-center gap-1 rounded-md ${isActive
                      ? isTransparent ? "text-[#3a7d5a]" : "text-[#2E6B8A]"
                      : isTransparent
                        ? "text-white/90 hover:text-white"
                        : "text-[#2a2a2a]/80 hover:text-[#2E6B8A]"
                    }`}
                >
                  {link.label}
                  {link.dropdown && <ChevronDown className="w-3 h-3 opacity-70" />}
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
              </div>
            );
          })}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => openBooking({ location: currentLocObj ? currentLocObj.label : undefined })}
            className={`hidden sm:inline-flex items-center px-6 py-2.5 text-sm font-bold tracking-widest uppercase transition-all duration-300 rounded-md hover:scale-105 active:scale-95 ${isTransparent
                ? "bg-[#3a7d5a] hover:bg-[#3a7d5a] text-white shadow-lg shadow-black/20"
                : "bg-[#2E6B8A] hover:bg-[#255a75] text-white shadow-md"
              }`}
          >
            Book Now
          </button>

          <button
            onClick={() => navigate(isAuthenticated ? "/admin/dashboard" : "/admin/login")}
            className={`hidden items-center justify-center w-10 h-10 rounded-full transition-all duration-300 hover:scale-110 active:scale-95 ${isTransparent
                ? "bg-white/15 hover:bg-white/25 text-white backdrop-blur-sm"
                : "bg-[#2E6B8A]/10 hover:bg-[#2E6B8A]/20 text-[#2E6B8A]"
              }`}
            title="Admin Panel"
          >
            <UserCircle className="w-5 h-5" />
          </button>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`lg:hidden p-2 rounded-md transition-colors ${isTransparent ? "text-white hover:bg-white/10" : "text-[#2E6B8A] hover:bg-[#2E6B8A]/10"
              }`}
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
                      {locations.map((loc) => (
                        <Link
                          key={loc.path}
                          to={loc.path}
                          onClick={() => handleLocationSelect(loc)}
                          className={`block px-4 py-2.5 text-sm rounded-md mb-1 transition-colors ${activeLocKey === loc.key
                              ? "font-bold"
                              : "text-[#2a2a2a]/70 hover:text-[#2E6B8A] hover:bg-[#2E6B8A]/5"
                            }`}
                          style={activeLocKey === loc.key ? { color: loc.color, background: `${loc.color}10` } : {}}
                        >
                          <div className="font-semibold">{loc.label}</div>
                          <div className="text-xs opacity-60">{loc.sublabel}</div>
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {navLinks.map((link) => (
                <div key={link.path}>
                  <Link
                    to={link.path}
                    className={`block px-4 py-3 text-sm font-semibold rounded-md transition-colors ${location.pathname === link.path
                        ? "text-[#2E6B8A] bg-[#2E6B8A]/8"
                        : "text-[#2a2a2a]/70 hover:text-[#2E6B8A] hover:bg-[#2E6B8A]/5"
                      }`}
                  >
                    {link.label}
                  </Link>
                  {link.dropdown && (
                    <div className="pl-6">
                      {link.dropdown.map((item) => (
                        <Link
                          key={item.path}
                          to={item.path}
                          className="block px-4 py-2 text-xs text-[#2a2a2a]/60 hover:text-[#2E6B8A] transition-colors"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              <button
                onClick={() => { setMobileOpen(false); openBooking(); }}
                className="mt-3 mx-2 text-center px-6 py-3 bg-[#3a7d5a] text-white text-sm font-bold tracking-widest uppercase rounded-md hover:bg-[#3a7d5a] transition-colors"
              >
                Book Now
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
