import { useState } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Facebook, Instagram, MessageCircle, Plus, X } from "lucide-react";

/**
 * Professional Social Media Floating Menu
 * Mobile-responsive: Collapses into a single bubble to save space.
 * Dynamic: Adapts WhatsApp link based on current location (Chennai/Ooty).
 */

const WHATSAPP_NUMS = {
  chennai: "919791178349",
  ooty: "919150486153",
  default: "919150486153",
};

export default function SocialFloatingIcons() {
  const [isOpen, setIsOpen] = useState(false);
  const routerLocation = useLocation();

  // Determine current location context
  const locKey = /chennai/i.test(routerLocation.pathname) ? "chennai" :
    /ooty/i.test(routerLocation.pathname) ? "ooty" : "default";

  const socialIcons = [
    {
      name: "WhatsApp",
      icon: <MessageCircle className="w-5 h-5 md:w-6 md:h-6" />,
      color: "bg-[#25D366]",
      href: `https://wa.me/${WHATSAPP_NUMS[locKey]}`,
      label: "Chat on WhatsApp",
    },
    {
      name: "Facebook",
      icon: <Facebook className="w-5 h-5 md:w-6 md:h-6" />,
      color: "bg-[#1877F2]",
      href: "https://facebook.com/drizzledrop",
      label: "Follow on Facebook",
    },
    {
      name: "Instagram",
      icon: <Instagram className="w-5 h-5 md:w-6 md:h-6" />,
      color: "bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]",
      href: "https://instagram.com/drizzledrop",
      label: "Follow on Instagram",
    },
  ];

  return (
    <div className="fixed right-4 md:right-6 bottom-24 md:bottom-28 z-[100] flex flex-col items-end gap-3">
      {/* Expanded Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="flex flex-col gap-3 mb-1"
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.8 }}
          >
            {socialIcons.map((social) => (
              <motion.a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, x: -5 }}
                whileTap={{ scale: 0.9 }}
                className={`relative w-10 h-10 md:w-12 md:h-12 ${social.color} text-white rounded-full shadow-2xl flex items-center justify-center group pointer-events-auto`}
                aria-label={social.label}
              >
                {social.icon}

                {/* Desktop Label */}
                <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-black/80 backdrop-blur-md text-white text-[9px] font-bold uppercase tracking-widest rounded shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap hidden md:block">
                  {social.label}
                </div>
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Main Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`w-12 h-12 md:w-14 md:h-14 ${isOpen ? "bg-black" : "bg-[#C5A861]"} text-white rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.2)] flex items-center justify-center transition-colors duration-300 z-[101]`}
      >
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {isOpen ? <X className="w-6 h-6 md:w-7 md:h-7" /> : <Plus className="w-6 h-6 md:w-7 md:h-7" />}
        </motion.div>

        {/* Pulse effect when closed */}
        {!isOpen && (
          <span className="absolute inset-0 rounded-full bg-[#C5A861] animate-ping opacity-25 -z-10" />
        )}
      </motion.button>
    </div>
  );
}
