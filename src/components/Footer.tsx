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
    <footer className="bg-[#2E6B8A] text-white/90 border-t border-white/10">
      <div className="container-luxury section-padding pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div>
            <img
              src={logoImage}
              alt="DrizzleDrop Hotels Logo"
              className="h-16 mb-6 object-contain"
            />
            <p className="text-sm text-white/60 leading-relaxed max-w-xs">
              Hassle-free accommodation for your business stay in Chennai and vacation in scenic Ooty. Experience nature and hospitality in its purest form.
            </p>
            <div className="flex gap-4 mt-8">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-10 h-10 flex items-center justify-center border border-white/10 text-white/60 hover:text-[#C5A861] hover:border-[#C5A861] transition-all duration-500 rounded-full bg-white/5"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[11px] uppercase tracking-[0.25em] mb-8 text-[#C5A861] font-bold">Quick Links</h4>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-white/60 hover:text-white transition-all duration-300 flex items-center gap-3 group"
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
            <h4 className="text-[11px] uppercase tracking-[0.25em] mb-8 text-[#C5A861] font-bold">Chennai Property</h4>
            <ul className="space-y-4 text-sm text-white/60">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-0.5 text-[#C5A861] shrink-0" />
                <span className="leading-relaxed text-white/70">
                  Thoriaipakkam, OMR IT Corridor, Rajiv Gandhi Salai, Chennai
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#C5A861] shrink-0" />
                <span className="text-white/70">+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#C5A861] shrink-0" />
                <span className="text-white/70">info@drizzledrop.com</span>
              </li>
            </ul>
          </div>

          {/* Ooty */}
          <div>
            <h4 className="text-[11px] uppercase tracking-[0.25em] mb-8 text-[#C5A861] font-bold">Ooty Property</h4>
            <ul className="space-y-4 text-sm text-white/60">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-0.5 text-[#C5A861] shrink-0" />
                <span className="leading-relaxed text-white/70">
                  2km from Ooty Bus-stand & Railway station, Nilgiris
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#C5A861] shrink-0" />
                <span className="text-white/70">+91 98765 43211</span>
              </li>
              <li className="flex items-center gap-3 opacity-0 lg:opacity-100">
                <div className="h-4" />
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col gap-3">
            <p className="text-[11px] text-white/40 tracking-wider">
              © 2026 DRIZZLEDROP HOTELS. PRIVATE SANCTUARY.
            </p>
            <div className="flex gap-6 text-[10px] text-white/40 font-bold uppercase tracking-widest">
              <Link to="/overview" className="hover:text-[#C5A861] transition-colors">Terms</Link>
              <Link to="/overview" className="hover:text-[#C5A861] transition-colors">Privacy</Link>
            </div>
          </div>

          <div className="flex items-center gap-8">
            <span className="text-[9px] tracking-[0.3em] text-white/30 font-bold uppercase">Payment Excellence</span>
            <div className="flex items-center gap-6 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-700">
              <span className="text-[10px] font-bold text-white tracking-widest">GPAY</span>
              <span className="text-[10px] font-bold text-white tracking-widest">PHONEPE</span>
              <span className="text-[10px] font-bold text-white tracking-widest">PAYTM</span>
              <span className="text-[10px] font-bold text-white tracking-widest">WHATSAPP</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
