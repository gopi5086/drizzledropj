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
  { label: "Facilities", path: "/facilities" },
  { label: "Room / Tariff", path: "/rooms" },
  { label: "Gallery", path: "/gallery" },
  { label: "Deals", path: "/deals" },
  { label: "Dining", path: "/dining" },
  { label: "Policies & Terms", path: "/overview" },
];

export default function Footer() {
  return (
    <footer className="bg-[#F2EAE0] text-black/90 border-t border-white/10">
      <div className="container-luxury section-padding pb-6 sm:pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 md:gap-12 mb-12 sm:mb-16">
          {/* Brand */}
          <div>
            <img
              src={logoImage}
              alt="DrizzleDrop Hotels Logo"
              className="h-12 sm:h-16 mb-4 sm:mb-6 object-contain"
            />
            <p className="text-xs sm:text-sm text-black/60 leading-relaxed max-w-xs">
              Hassle-free accommodation for your business stay in Chennai and vacation in scenic Ooty. Experience nature and hospitality in its purest form.
            </p>
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
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-xs sm:text-sm text-black/60 hover:text-green transition-all duration-300 flex items-center gap-3 group"
                  >
                    <span className="w-1.5 h-[1px] bg-[#C5A861] group-hover:w-3 transition-all duration-300" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Chennai */}
          <div>
            <h4 className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] mb-6 sm:mb-8 text-[#C5A861] font-bold">Chennai Property</h4>
            <ul className="space-y-3 sm:space-y-4 text-xs sm:text-sm text-black/70">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 sm:w-5 h-4 sm:h-5 mt-0.5 text-[#C5A861] shrink-0" />
                <span className="leading-relaxed">
                  Thoriaipakkam, OMR IT Corridor, Rajiv Gandhi Salai, Chennai
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 sm:w-5 h-4 sm:h-5 text-[#C5A861] shrink-0" />
                <span className="text-black/70">+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 sm:w-5 h-4 sm:h-5 text-[#C5A861] shrink-0" />
                <span className="text-black/70">info@drizzledrop.com</span>
              </li>
            </ul>
          </div>

          {/* Ooty */}
          <div>
            <h4 className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] mb-6 sm:mb-8 text-[#C5A861] font-bold">Ooty Property</h4>
            <ul className="space-y-3 sm:space-y-4 text-xs sm:text-sm text-black/70">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 sm:w-5 h-4 sm:h-5 mt-0.5 text-[#C5A861] shrink-0" />
                <span className="leading-relaxed">
                  Ooty Bus-stand & Railway station, Nilgiris
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 sm:w-5 h-4 sm:h-5 text-[#C5A861] shrink-0" />
                <span className="text-black/70">+91 98765 43211</span>
              </li>
              <li className="flex items-center gap-3 opacity-0 lg:opacity-100">
                <div className="h-4" />
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 sm:pt-10 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
          <div className="flex flex-col gap-2 sm:gap-3">
            <p className="text-[10px] sm:text-[11px] text-black/40 tracking-wider">
              © 2026 DRIZZLEDROP HOTELS. PRIVATE SANCTUARY.
            </p>
            <div className="flex gap-4 sm:gap-6 text-[9px] sm:text-[10px] text-black/40 font-bold uppercase tracking-widest">
              <Link to="/overview" className="hover:text-[#C5A861] transition-colors">Terms</Link>
              <Link to="/overview" className="hover:text-[#C5A861] transition-colors">Privacy</Link>
            </div>
          </div>

          
        </div>
      </div>
    </footer>
  );
}
