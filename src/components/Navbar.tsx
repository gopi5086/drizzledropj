import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, UserCircle } from "lucide-react";
import driLogo from "../assets/drilogo.png";
import { useBooking } from "@/context/BookingContext";
import { useAuth } from "@/context/AuthContext";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Facilities", path: "/facilities" },
  { label: "Room / Tariff", path: "/rooms" },
  {
    label: "Gallery",
    path: "/gallery",
    dropdown: [
      { label: "Chennai", path: "/gallery?location=chennai" },
      { label: "Ooty", path: "/gallery?location=ooty" },
    ],
  },
  { label: "Deals", path: "/deals" },
  { label: "Dining", path: "/dining" },
  { label: "Overview", path: "/overview" },
  { label: "Contact", path: "#contact" },
];

export default function Navbar() {
  const { openBooking } = useBooking();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [location]);

  // Over hero → transparent bg, white text
  // After scroll → white/light bg, dark teal text
  const isTransparent = !scrolled && !mobileOpen;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
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
          {navLinks.map((link) => {
            const isHash = link.path.startsWith("#");
            const isActive = isHash ? false : location.pathname === link.path;

            const handleClick = (e: React.MouseEvent) => {
              if (isHash && location.pathname === "/") {
                e.preventDefault();
                const el = document.getElementById(link.path.substring(1));
                el?.scrollIntoView({ behavior: "smooth" });
              } else if (link.path === "/" && location.pathname === "/") {
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
                  className={`px-3.5 py-2 text-sm font-semibold tracking-wide transition-all duration-300 relative group flex items-center gap-1 rounded-md ${isActive
                    ? isTransparent
                      ? "text-[#3a7d5a]"
                      : "text-[#2E6B8A]"
                    : isTransparent
                      ? "text-white/90 hover:text-white"
                      : "text-[#2a2a2a]/80 hover:text-[#2E6B8A]"
                    }`}
                >
                  {link.label}
                  {link.dropdown && <ChevronDown className="w-3 h-3 opacity-70" />}
                  {/* Underline accent */}
                  <span
                    className={`absolute bottom-0 left-3 right-3 h-[2px] rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left ${isTransparent ? "bg-[#3a7d5a]" : "bg-[#2E6B8A]"
                      }`}
                  />
                </Link>

                {/* Dropdown */}
                {link.dropdown && (
                  <AnimatePresence>
                    {galleryOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-2 bg-white rounded-xl py-2 min-w-[160px] shadow-xl border border-[#2E6B8A]/15"
                      >
                        {link.dropdown.map((item) => (
                          <Link
                            key={item.path}
                            to={item.path}
                            className="block px-5 py-2.5 text-sm text-[#2a2a2a]/70 hover:text-[#2E6B8A] hover:bg-[#2E6B8A]/8 transition-colors font-medium"
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

        {/* Right side: Book Now + Admin Icon + mobile toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => openBooking()}
            className={`hidden sm:inline-flex items-center px-6 py-2.5 text-sm font-bold tracking-widest uppercase transition-all duration-300 rounded-md hover:scale-105 active:scale-95 ${isTransparent
              ? "bg-[#3a7d5a] hover:bg-[#3a7d5a] text-white shadow-lg shadow-black/20"
              : "bg-[#2E6B8A] hover:bg-[#255a75] text-white shadow-md"
              }`}
          >
            Book Now
          </button>
          <button
            onClick={() => navigate(isAuthenticated ? "/admin/dashboard" : "/admin/login")}
            className={`hidden items-center justify-center w-10 h-10 rounded-full transition-all duration-300 hover:scale-110 active:scale-95 ${
              isTransparent
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
                onClick={() => {
                  setMobileOpen(false);
                  openBooking();
                }}
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
