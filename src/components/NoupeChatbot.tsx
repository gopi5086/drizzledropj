import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export default function NoupeChatbot() {
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    // Check if the script is already added
    const existingScript = document.querySelector('script[src*="noupe.com"]');
    if (!existingScript) {
      const script = document.createElement("script");
      script.src = "https://www.noupe.com/embed/019d81f0c0b7746a98004b209ff038ea3ccc.js";
      script.async = true;
      document.body.appendChild(script);
    }

    // Show tooltip after a slight delay (e.g., 5 seconds) to allow widget to load
    const timer = setTimeout(() => {
      setShowTooltip(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {showTooltip && (
        <motion.div
           initial={{ opacity: 0, x: 20, scale: 0.9 }}
           animate={{ opacity: 1, x: 0, scale: 1 }}
           exit={{ opacity: 0, scale: 0.8 }}
           transition={{ duration: 0.5, ease: "easeOut" }}
           className="fixed bottom-[30px] right-[90px] z-[9999] bg-white border border-[#2E6B8A]/10 shadow-[0_15px_30px_rgba(46,107,138,0.15)] rounded-2xl rounded-br-none px-4 py-3 items-center gap-3 hidden sm:flex cursor-pointer"
        >
           <button 
             onClick={(e) => {
               e.stopPropagation();
               setShowTooltip(false);
             }}
             className="absolute -top-2 -left-2 bg-white border border-gray-100 shadow-sm hover:bg-gray-50 text-gray-400 rounded-full p-1 transition-colors z-10"
           >
             <X className="w-3 h-3" />
           </button>
           
           <div className="flex flex-col">
             <span className="text-xs font-bold text-[#2a2a2a] tracking-wide">Need assistance?</span>
             <span className="text-[10px] text-gray-500 font-medium">Chat with our team!</span>
           </div>
           
           <div className="relative flex h-2.5 w-2.5">
             <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
             <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
           </div>

           {/* Tooltip Arrow pointing right */}
           <div className="absolute -right-[6px] bottom-3 w-3 h-3 bg-white border-r border-t border-[#2E6B8A]/10 rotate-45 shadow-[2px_-2px_4px_rgba(46,107,138,0.05)]" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
