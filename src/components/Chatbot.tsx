import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, User, Bot, Calendar, Phone, Home, ArrowRight, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLocationContext } from "@/context/LocationContext";

interface Message {
  sender: "user" | "bot";
  text: string;
  timestamp: Date;
  type?: "text" | "options" | "booking-form";
}

const IS_LOCAL = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
const API_BASE = IS_LOCAL ? "http://localhost:5000/api" : "https://drizzledropj-1.onrender.com/api";
const WEB3FORMS_KEY = "868bd7f9-4108-4342-bf38-75a5dd580e00";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [sessionId] = useState(() => `sess_${Math.random().toString(36).substr(2, 9)}`);
  const [bookingStep, setBookingStep] = useState<"idle" | "name" | "phone" | "dates" | "submitting" | "success">("idle");
  const [bookingData, setBookingData] = useState({
    name: "",
    phone: "",
    checkIn: "",
    checkOut: "",
  });
  
  const { currentLocation } = useLocationContext();
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  // Initial greeting
  useEffect(() => {
    if (messages.length === 0) {
      addBotMessage("Hello! 👋 Welcome to DrizzleDrop Inn. How can I assist you today?", "options");
    }
  }, []);

  const addBotMessage = (text: string, type: Message["type"] = "text") => {
    setIsTyping(true);
    setTimeout(() => {
      const newMessage: Message = { sender: "bot", text, timestamp: new Date(), type };
      setMessages((prev) => [...prev, newMessage]);
      setIsTyping(false);
      saveToBackend(newMessage);
    }, 1000);
  };

  const addUserMessage = (text: string) => {
    const newMessage: Message = { sender: "user", text, timestamp: new Date(), type: "text" };
    setMessages((prev) => [...prev, newMessage]);
    saveToBackend(newMessage);
    handleBotLogic(text);
  };

  const saveToBackend = async (msg: Message) => {
    try {
      await fetch(`${API_BASE}/chat/message`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          message: msg,
          metadata: { location: currentLocation }
        }),
      });
    } catch (e) {
      console.error("Failed to sync chat:", e);
    }
  };

  const handleBotLogic = (text: string) => {
    const lowerText = text.toLowerCase();
    
    if (lowerText.includes("room")) {
      addBotMessage("We offer Standard, Triple, Family, and Deluxe rooms. All feature modern amenities and high-speed WiFi.");
    } else if (lowerText.includes("tariff") || lowerText.includes("price")) {
      addBotMessage("Our tariffs start from ₹2,450. You can view detailed pricing in the 'Rooms & Tariff' section.");
    } else if (lowerText.includes("contact")) {
      addBotMessage("You can reach us at stay@drizzledropinn.com or call our Chennai property at +91 44 24580009.");
    } else if (lowerText.includes("book")) {
      startBookingFlow();
    } else {
      addBotMessage("I'm not sure I understand. Would you like to check rooms, pricing, or book a stay?", "options");
    }
  };

  const startBookingFlow = () => {
    setBookingStep("name");
    addBotMessage("Great! I'll help you with that. First, may I know your full name?", "booking-form");
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (bookingStep === "name") {
      setBookingStep("phone");
      addBotMessage(`Nice to meet you, ${bookingData.name}! What is your phone number?`, "booking-form");
    } else if (bookingStep === "phone") {
      setBookingStep("dates");
      addBotMessage("Perfect. Lastly, what are your expected check-in and check-out dates?", "booking-form");
    } else if (bookingStep === "dates") {
        submitFinalBooking();
    }
  };

  const submitFinalBooking = async () => {
    setBookingStep("submitting");
    try {
      const payload = {
        access_key: WEB3FORMS_KEY,
        subject: `New Chat Booking - ${bookingData.name}`,
        from_name: "DrizzleBot Assistant",
        Name: bookingData.name,
        Phone: bookingData.phone,
        Location: currentLocation || "General",
        Message: `Booking inquiry for dates: ${bookingData.checkIn} to ${bookingData.checkOut}`,
        Source: "Chatbot"
      };

      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setBookingStep("success");
        addBotMessage(`Thank you, ${bookingData.name}! Your request has been sent. Our team will contact you at ${bookingData.phone} shortly to confirm.`);
        
        // Also save to internal bookings
        await fetch(`${API_BASE}/bookings`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: bookingData.name,
                phone: bookingData.phone,
                email: "chat-lead@drizzledrop.com",
                location: currentLocation === "ooty" ? "DrizzleDrop Inn, Ooty" : "DrizzleDrop Inn, Chennai",
                roomType: "Interested (Chat)",
                adults: 1
            })
        });
      }
    } catch (e) {
      setBookingStep("idle");
      addBotMessage("Oops, something went wrong. Please try again or call us directly.");
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[1000] flex flex-col items-end">
      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="mb-4 w-[350px] sm:w-[400px] h-[500px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-100"
          >
            {/* Header */}
            <div className="bg-[#2E6B8A] p-4 flex items-center justify-between text-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <Bot className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-sm">Drizzle Assistant</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <span className="text-[10px] opacity-80 uppercase tracking-widest">Online</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="hover:bg-white/10 p-2 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages Area */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[85%] rounded-2xl p-3 text-sm shadow-sm ${
                    msg.sender === "user" 
                      ? "bg-[#2E6B8A] text-white rounded-tr-none" 
                      : "bg-white text-gray-800 rounded-tl-none border border-gray-100"
                  }`}>
                    {msg.text}
                    
                    {/* Bot Options */}
                    {msg.sender === "bot" && msg.type === "options" && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {["Room Types", "Tariff Info", "Book a Room"].map(opt => (
                          <button
                            key={opt}
                            onClick={() => addUserMessage(opt)}
                            className="text-[11px] font-medium px-3 py-1.5 rounded-full border border-[#2E6B8A] text-[#2E6B8A] hover:bg-[#2E6B8A] hover:text-white transition-all"
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Inline Booking Form */}
                    {msg.sender === "bot" && msg.type === "booking-form" && bookingStep !== "success" && (
                      <form onSubmit={handleBookingSubmit} className="mt-3 space-y-3 bg-slate-50 p-3 rounded-lg border border-gray-200">
                        {bookingStep === "name" && (
                          <div className="space-y-2">
                             <Input 
                                autoFocus
                                value={bookingData.name}
                                onChange={e => setBookingData({...bookingData, name: e.target.value})}
                                placeholder="Your Name" 
                                className="h-9 text-xs"
                                required
                             />
                          </div>
                        )}
                        {bookingStep === "phone" && (
                          <div className="space-y-2">
                             <Input 
                                autoFocus
                                value={bookingData.phone}
                                onChange={e => setBookingData({...bookingData, phone: e.target.value})}
                                placeholder="Mobile Number" 
                                className="h-9 text-xs"
                                required
                             />
                          </div>
                        )}
                        {bookingStep === "dates" && (
                           <div className="grid grid-cols-2 gap-2">
                              <Input 
                                type="text"
                                value={bookingData.checkIn}
                                onChange={e => setBookingData({...bookingData, checkIn: e.target.value})}
                                placeholder="In: DD/MM" 
                                className="h-9 text-xs"
                              />
                              <Input 
                                type="text"
                                value={bookingData.checkOut}
                                onChange={e => setBookingData({...bookingData, checkOut: e.target.value})}
                                placeholder="Out: DD/MM" 
                                className="h-9 text-xs"
                              />
                           </div>
                        )}
                        
                        {bookingStep !== "submitting" ? (
                          <Button size="sm" className="w-full h-8 text-xs bg-[#2E6B8A]">
                            Continue <ArrowRight className="ml-2 w-3 h-3" />
                          </Button>
                        ) : (
                          <div className="flex items-center justify-center py-1">
                            <Loader2 className="w-5 h-5 animate-spin text-[#2E6B8A]" />
                          </div>
                        )}
                      </form>
                    )}
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white border border-gray-100 rounded-2xl rounded-tl-none p-3 px-4 shadow-sm">
                    <div className="flex gap-1">
                      <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce" />
                      <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce [animation-delay:0.2s]" />
                      <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                if (inputText.trim()) {
                  addUserMessage(inputText);
                  setInputText("");
                }
              }}
              className="p-4 bg-white border-t border-gray-100 flex gap-2"
            >
              <Input 
                value={inputText}
                onChange={e => setInputText(e.target.value)}
                placeholder="Type a message..." 
                className="flex-1 focus-visible:ring-[#2E6B8A]"
              />
              <Button type="submit" size="icon" className="bg-[#2E6B8A] rounded-full shrink-0">
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Icon — 60×60px (Instagram/Facebook FAB size) */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.93 }}
        onClick={() => setIsOpen(!isOpen)}
        style={{ width: 60, height: 60, borderRadius: "50%" }}
        className="bg-[#2E6B8A] shadow-[0_4px_20px_rgba(46,107,138,0.55)] flex items-center justify-center text-white relative group shrink-0"
      >
        {/* Outer ring — exactly 60×60px, same as button */}
        {!isOpen && (
          <span
            style={{ width: 60, height: 60, borderRadius: "50%" }}
            className="absolute animate-ping bg-[#2E6B8A]/30 pointer-events-none"
          />
        )}
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-white/15 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300" />
        {isOpen ? <X className="w-6 h-6 relative z-10" /> : <MessageSquare className="w-6 h-6 relative z-10" />}
        {/* Notification dot */}
        {!isOpen && (
          <span className="absolute top-0.5 right-0.5 w-[14px] h-[14px] bg-red-500 rounded-full border-2 border-white shadow-sm z-20" />
        )}
      </motion.button>
    </div>
  );
}
