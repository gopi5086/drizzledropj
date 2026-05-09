import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MessageCircle, ChevronRight, Search, MessageSquare } from "lucide-react";
import { API_BASE } from "@/config";

interface FAQ {
  _id: string;
  question: string;
  answer: string;
  location: string;
  isActive: boolean;
}

export default function DrizzleChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFaq, setSelectedFaq] = useState<FAQ | null>(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const res = await fetch(`${API_BASE}/faqs`);
        if (res.ok) {
          const data = await res.json();
          // Filter only active FAQs
          setFaqs(data.filter((f: FAQ) => f.isActive !== false));
        }
      } catch (err) {
        console.error("Error fetching FAQs for chatbot:", err);
      }
    };

    fetchFaqs();

    const timer = setTimeout(() => {
      if (!isOpen) setShowTooltip(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, [isOpen]);

  const filteredFaqs = faqs.filter(f => 
    f.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectFaq = (faq: FAQ) => {
    setSelectedFaq(faq);
    setSearchQuery("");
    // Small delay to allow content to render before scrolling
    setTimeout(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop = 0;
      }
    }, 100);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end">
      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95, transformOrigin: "bottom right" }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="mb-4 w-[320px] sm:w-[380px] h-[500px] bg-white rounded-[2.5rem] shadow-[0_20px_60px_rgba(46,107,138,0.25)] border border-gray-100 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-[#2E6B8A] p-6 text-white flex items-center justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl" />
              <div className="flex items-center gap-4 relative z-10">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/10">
                  <MessageSquare className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-lg tracking-tight">DrizzleBot</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-[#2E6B8A] rounded-full animate-pulse" />
                    <p className="text-[10px] opacity-80 uppercase tracking-[0.2em] font-bold">Online Help</p>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)} 
                className="p-2 hover:bg-white/10 rounded-xl transition-all relative z-10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-5 space-y-5 bg-gradient-to-b from-slate-50/50 to-white" ref={scrollRef}>
              {selectedFaq ? (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-5"
                >
                  <div className="flex justify-end">
                    <div className="bg-[#2E6B8A] text-white p-4 rounded-2xl rounded-tr-none text-sm max-w-[85%] shadow-lg shadow-[#2E6B8A]/10">
                      {selectedFaq.question}
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <div className="bg-white border border-gray-100 p-5 rounded-2xl rounded-tl-none text-sm max-w-[90%] shadow-sm text-gray-800 leading-relaxed font-medium">
                      {selectedFaq.answer}
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => setSelectedFaq(null)}
                    className="w-full py-3 border-2 border-[#2E6B8A]/10 text-[#2E6B8A] rounded-xl text-xs font-bold hover:bg-[#2E6B8A] hover:text-white transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" /> Ask something else
                  </button>
                </motion.div>
              ) : (
                <div className="space-y-6">
                  {/* Greeting */}
                  <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
                    <p className="text-sm font-bold text-gray-800 mb-4 tracking-tight">How can we assist you today?</p>
                    <div className="relative group">
                      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-[#2E6B8A] transition-colors" />
                      <input 
                        type="text" 
                        placeholder="Search for answers..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-transparent rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2E6B8A]/20 focus:bg-white focus:border-[#2E6B8A]/10 transition-all"
                      />
                    </div>
                  </div>

                  {/* FAQ List */}
                  <div className="space-y-2.5">
                    <p className="text-[10px] uppercase tracking-[0.2em] font-black text-gray-400 mb-3 ml-1">Suggested Questions</p>
                    {filteredFaqs.length > 0 ? (
                      filteredFaqs.map((faq, idx) => (
                        <motion.button
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.05 }}
                          key={faq._id}
                          onClick={() => handleSelectFaq(faq)}
                          className="w-full text-left p-4 bg-white hover:bg-white hover:shadow-md hover:border-[#2E6B8A]/30 border border-gray-100 rounded-2xl text-[13px] font-bold text-gray-700 transition-all flex items-center justify-between group"
                        >
                          <span className="line-clamp-2 pr-4">{faq.question}</span>
                          <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-[#2E6B8A] group-hover:translate-x-1 transition-all flex-shrink-0" />
                        </motion.button>
                      ))
                    ) : (
                      <div className="text-center py-10 px-4">
                        <Search className="w-10 h-10 text-gray-200 mx-auto mb-3" />
                        <p className="text-sm text-gray-500">No results found for your search.</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-white border-t border-gray-50 text-center">
              <p className="text-[10px] font-bold text-gray-300 uppercase tracking-[0.2em]">DrizzleDrop Guest Services</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button and Tooltip */}
      <div className="relative group flex flex-col items-end">
        <AnimatePresence>
          {showTooltip && !isOpen && (
            <motion.div
              initial={{ opacity: 0, x: 20, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="mb-4 mr-2 bg-white border border-gray-100 shadow-2xl rounded-2xl p-4 min-w-[220px] hidden sm:block relative cursor-pointer"
              onClick={() => { setIsOpen(true); setShowTooltip(false); }}
            >
              <button 
                onClick={(e) => { e.stopPropagation(); setShowTooltip(false); }}
                className="absolute -top-2 -left-2 bg-white border border-gray-100 shadow-sm rounded-full p-1 hover:bg-gray-50 transition-colors"
              >
                <X className="w-3 h-3 text-gray-400" />
              </button>
              <p className="text-xs font-bold text-[#2a2a2a] mb-1">Need assistance?</p>
              <p className="text-[10px] text-gray-500 font-medium">Click here to chat with our team!</p>
              
              {/* Arrow pointing down */}
              <div className="absolute right-6 -bottom-2 w-4 h-4 bg-white border-r border-b border-gray-100 rotate-45" />
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            setIsOpen(!isOpen);
            setShowTooltip(false);
          }}
          className={`w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-all duration-500 ${
            isOpen 
              ? "bg-white text-[#2E6B8A] border-2 border-[#2E6B8A]/10 rotate-90" 
              : "bg-[#2E6B8A] text-white hover:shadow-[#2E6B8A]/40"
          }`}
        >
          {isOpen ? <X className="w-7 h-7" /> : <MessageSquare className="w-7 h-7" />}
          
          {!isOpen && (
            <div className="absolute -top-1 -right-1 flex h-5 w-5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2E6B8A] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-5 w-5 bg-[#2E6B8A] border-[3px] border-white shadow-sm"></span>
            </div>
          )}
        </motion.button>
      </div>
    </div>
  );
}

// Sub-component for back arrow since I forgot it in imports
function ArrowLeft(props: any) {
  return (
    <svg 
      {...props} 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>
    </svg>
  );
}
