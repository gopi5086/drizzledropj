import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, MessageCircle, MapPin, Phone, Mail } from "lucide-react";
import logoImage from "@/assets/drilogo.png";

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: MessageCircle, href: "https://wa.me/918667825086", label: "WhatsApp" },
];

const quickLinks = [
  { label: "Home", path: "/" },
  { label: "Rooms & Tariff", path: "/rooms" },
  { label: "Dining", path: "/dining" },
  { label: "Facilities", path: "/facilities" },
  { label: "About", path: "/about" },
  { label: "Deals", path: "/deals" },
  { label: "Gallery", path: "/gallery" },
  { label: "Contact", path: "/contact" },
];

const locationLinks = [
  { label: "Chennai – OMR Property", path: "/chennai" },
  { label: "Ooty – Nilgiris Property", path: "/ooty" },
  { label: "Chennai Gallery", path: "/gallery?location=chennai" },
  { label: "Ooty Gallery", path: "/gallery?location=ooty" },
];

import { useParams } from "react-router-dom";

export default function Footer() {
  const { locationId } = useParams();
  const currentLocKey = locationId?.toLowerCase();

  const showChennai = !currentLocKey || currentLocKey === "chennai";
  const showOoty = !currentLocKey || currentLocKey === "ooty";

  return (
    <footer className="bg-[#F2EAE0] text-black/90 border-t border-white/10">
      <div className="container-luxury section-padding pb-6 sm:pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 md:gap-12 mb-12 sm:mb-16">

          {/* Brand */}
          <div className={!currentLocKey ? "sm:col-span-2 lg:col-span-1" : ""}>
            <img
              src={logoImage}
              alt="DrizzleDrop Hotels Logo"
              className="h-10 sm:h-12 mb-4 sm:mb-6 object-contain"
            />

            <div className="flex gap-3 sm:gap-4 mt-6 sm:mt-8">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 sm:w-10 h-9 sm:h-10 flex items-center justify-center border border-white/10 text-black/60 hover:text-[#C5A861] hover:border-[#C5A861] transition-all duration-500 rounded-full bg-white/5"
                >
                  <Icon className="w-4 sm:w-5 h-4 sm:h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] mb-6 sm:mb-8 text-[#C5A861] font-bold">Quick Links</h4>
            <ul className="space-y-3 sm:space-y-4">
              {(currentLocKey ? [
                { label: "Home", path: `/${currentLocKey}/home` },
                { label: "Facilities", path: `/${currentLocKey}/facilities` },
                { label: "Rooms / Tariff", path: `/${currentLocKey}/rooms` },
                { label: "Gallery", path: `/${currentLocKey}/gallery` },
                { label: "Dining", path: `/${currentLocKey}/dining` },
                { label: "Policies & Terms", path: "/overview" },
              ] : quickLinks).map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-xs sm:text-sm text-black/60 hover:text-[#3a7d5a] transition-all duration-300 flex items-center gap-3 group"
                  >
                    <span className="w-1.5 h-[1px] bg-[#C5A861] group-hover:w-3 transition-all duration-300" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Chennai */}
          {showChennai && (
            <div>
              <h4 className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] mb-6 sm:mb-8 text-[#C5A861] font-bold">Chennai Property</h4>
              <ul className="space-y-3 sm:space-y-4 text-xs sm:text-sm text-black/70">
                <li className="flex items-start gap-3">
                  <MapPin className="w-4 sm:w-5 h-4 sm:h-5 mt-0.5 text-[#C5A861] shrink-0" />
                  <span className="leading-relaxed">
                    A4, 4/476/77, Chandrasekaran Avenue,<br />
                    1st Main Road, Thoraipakkam,<br />
                    Chennai, Tamil Nadu – 600097
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-4 sm:w-5 h-4 sm:h-5 text-[#C5A861] shrink-0" />
                  <a href="tel:+919791178349" className="hover:text-[#C5A861] transition-colors">+91 97911 78349</a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-4 sm:w-5 h-4 sm:h-5 text-[#C19E5F] shrink-0" />
                  <a href="mailto:stay@drizzledropinn.com" className="hover:text-[#C19E5F] transition-colors">stay@drizzledropinn.com</a>
                </li>
              </ul>
              <Link
                to="/chennai/home"
                className="inline-flex items-center gap-2 mt-5 text-[10px] font-bold uppercase tracking-widest text-[#2E6B8A] hover:text-[#C5A861] transition-colors"
              >
                View Chennai Page →
              </Link>
            </div>
          )}

          {/* Ooty */}
          {showOoty && (
            <div>
              <h4 className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] mb-6 sm:mb-8 text-[#C5A861] font-bold">Ooty Property</h4>
              <ul className="space-y-3 sm:space-y-4 text-xs sm:text-sm text-black/70">
                <li className="flex items-start gap-3">
                  <MapPin className="w-4 sm:w-5 h-4 sm:h-5 mt-0.5 text-[#C5A861] shrink-0" />
                  <span className="leading-relaxed">
                    215 H, Dispensary Road,<br />Fern Hill, Ooty, Tamil Nadu – 643004
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-4 sm:w-5 h-4 sm:h-5 text-[#C5A861] shrink-0" />
                  <a href="tel:+919150486153" className="hover:text-[#C5A861] transition-colors">+91 91504 86153</a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-4 sm:w-5 h-4 sm:h-5 text-[#C5A861] shrink-0" />
                  <a href="mailto:stay@drizzledropinn.com" className="hover:text-[#C5A861] transition-colors">stay@drizzledropinn.com</a>
                </li>
              </ul>
              <Link
                to="/ooty/home"
                className="inline-flex items-center gap-2 mt-5 text-[10px] font-bold uppercase tracking-widest text-[#3a7d5a] hover:text-[#C5A861] transition-colors"
              >
                View Ooty Page →
              </Link>
            </div>
          )}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-black/10 pt-8 sm:pt-10 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
          <div className="flex flex-col gap-2 sm:gap-3">
            <p className="text-[10px] sm:text-[11px] text-black/40 tracking-wider">
              © 2026 DRIZZLEDROP HOTELS. PRIVATE SANCTUARY.
            </p>
            <div className="flex gap-4 sm:gap-6 text-[9px] sm:text-[10px] text-black/40 font-bold uppercase tracking-widest">
              <Link to="/overview" className="hover:text-[#C5A861] transition-colors">Terms</Link>
              <Link to="/overview" className="hover:text-[#C5A861] transition-colors">Privacy</Link>
              <Link to="/chennai/home" className="hover:text-[#C5A861] transition-colors">Chennai</Link>
              <Link to="/ooty/home" className="hover:text-[#C5A861] transition-colors">Ooty</Link>
            </div>
          </div>
          <div className="flex items-center gap-3 text-[10px] text-black/40">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            <span>Available 24/7 for reservations</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
