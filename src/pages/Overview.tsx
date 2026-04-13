import { motion } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";
import { 
  Clock, 
  Hourglass, 
  XCircle, 
  UserCheck, 
  Baby, 
  FileText, 
  ShieldCheck,
  Scale
} from "lucide-react";

const policies = [
  {
    id: "arrival-departure",
    icon: Clock,
    title: "Arrival & Departure",
    content: "Check-in time is 12:00 PM and check-out time is 11:00 AM. Early arrival is subject to room availability. For a guaranteed early check-in, reservations must be made from the previous night. Late check-out is available upon request, subject to availability."
  },
  {
    id: "early-late",
    icon: Hourglass,
    title: "Early Check-in & Late Check-out",
    content: "Early check-in is subject to availability and may include additional charges. Late check-out is also conditionally available and may incur standard tariff additions upon confirmation."
  },
  {
    id: "cancellation",
    icon: XCircle,
    title: "Cancellation & Modifications",
    content: "Guests may cancel free of charge up to 3 days prior to the date of arrival. Cancellations made within 3 days of arrival will incur a charge equivalent to the first night's rent."
  },
  {
    id: "identity",
    icon: UserCheck,
    title: "Identity Proof Requirements",
    content: "All guests must present a valid government-issued photo ID at check-in. A passport is strictly required for non-citizens. Primary guests must be at least 18 years old to comfortably check in. For couples, both guests must meet the minimum age requirement."
  },
  {
    id: "child",
    icon: Baby,
    title: "Child & Extra Bed Policy",
    content: "Up to two children under 11 years may stay in the parent’s room without extra charge. One child bed may be gracefully provided subject to availability. Children aged 8–12 years may stay with parents, incurring extra bed charges if applicable. Children above 12 years are considered adult guests."
  }
];

const generalTerms = [
  "The hotel reserves the right to refuse service or accommodation for violation of policies or inappropriate behavior.",
  "DrizzleDrop Inn strictly follows a zero-tolerance policy against misconduct, illegal activity, or disturbances that affect other guests' peace.",
  "Guests may be removed without refund for non-payment, disorderly conduct, intoxication, damage to property, unlawful activity, or safety violations.",
  "Guests must comply strictly with maximum room occupancy limits and all hotel regulations.",
  "Parents or guardians are entirely responsible for supervising their children at all times throughout the property."
];

export default function Overview() {
  return (
    <div className="pt-24 min-h-screen bg-[#fdfdfd]">
      
      {/* Premium Hero Section */}
      <section className="bg-gradient-to-b from-[#1a232f] to-[#2E6B8A] py-20 text-center relative overflow-hidden">
        <div className="relative z-10 container-luxury">
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
          >
             <Scale className="w-12 h-12 text-[#C5A861] mx-auto mb-6 opacity-90" />
             <h1 className="text-4xl md:text-5xl lg:text-7xl font-display font-bold text-white mb-6 drop-shadow-xl tracking-tight">
                Policies <span className="text-[#C5A861] font-serif italic">&</span> Terms
             </h1>
             <p className="text-white/80 text-lg md:text-xl font-medium max-w-2xl mx-auto tracking-wide">
               Guidelines for a seamless, luxurious, and secure stay at DrizzleDrop Inn.
             </p>
          </motion.div>
        </div>
        
        {/* Curved bottom edge */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg className="relative block w-full h-[50px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path d="M1200 120L0 16.48 0 0 1200 0 1200 120z" className="fill-white/5"></path>
              <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0C75.39,23.11,146.46,47.88,220.89,64.21,254.34,71.58,288.66,75.05,321.39,56.44Z" className="fill-[#fdfdfd]"></path>
          </svg>
        </div>
      </section>

      {/* Main Core Policies Grid */}
      <section className="section-padding relative">
        <div className="container-luxury max-w-6xl">
          <SectionHeading label="Information" title="Accommodation Policies" subtitle="Key guidelines detailing your reservation and presence." />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
            {policies.map((policy, i) => (
              <motion.div
                key={policy.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="bg-white rounded-[2rem] p-8 md:p-10 border border-[#2E6B8A]/10 shadow-[0_10px_40px_rgba(46,107,138,0.05)] hover:shadow-[0_20px_50px_rgba(46,107,138,0.1)] hover:-translate-y-1 transition-all duration-500 group flex flex-col"
              >
                <div className="flex items-center gap-5 mb-6 border-b border-gray-100 pb-6">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#2E6B8A]/10 to-[#2E6B8A]/5 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-inner">
                    <policy.icon className="w-6 h-6 text-[#2E6B8A]" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-gray-900 leading-tight">
                    {policy.title}
                  </h3>
                </div>
                <div className="text-gray-600 leading-relaxed font-medium text-sm md:text-base opacity-90">
                  {policy.content}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* General Terms & Conditions */}
      <section className="bg-secondary/5 py-24 border-y border-border/40">
        <div className="container-luxury max-w-4xl">
           <motion.div 
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             viewport={{ once: true }}
             className="bg-white rounded-[2.5rem] p-10 md:p-16 shadow-xl border border-[#C5A861]/20 relative overflow-hidden"
           >
             {/* Decorative watermark */}
             <FileText className="absolute -top-10 -right-10 w-64 h-64 text-[#C5A861]/5 rotate-12 pointer-events-none" />

             <div className="relative z-10">
               <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C5A861]/10 text-[#C5A861] text-xs font-bold uppercase tracking-widest mb-6">
                 <ShieldCheck className="w-4 h-4" /> Code of Conduct
               </div>
               <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-8">General Terms &amp; Conditions</h2>
               
               <div className="space-y-4 md:space-y-6">
                 {generalTerms.map((term, idx) => (
                   <div key={idx} className="flex items-start gap-4 p-4 rounded-xl hover:bg-[#fafafa] transition-colors border border-transparent hover:border-gray-100">
                     <span className="w-6 h-6 rounded-full bg-[#2E6B8A] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                       {idx + 1}
                     </span>
                     <p className="text-gray-700 leading-relaxed text-sm md:text-base font-medium">
                       {term}
                     </p>
                   </div>
                 ))}
               </div>
             </div>
           </motion.div>
        </div>
      </section>

      {/* Hotel Rights Footer Section */}
      <section className="section-padding bg-gradient-to-br from-[#1a232f] to-[#0f151c] text-center border-t-4 border-[#C5A861]">
        <div className="container-luxury max-w-3xl">
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
           >
             <h2 className="text-2xl md:text-4xl font-display font-bold text-white mb-6">Hotel Rights</h2>
             <p className="text-white/70 text-base md:text-lg leading-relaxed font-medium font-serif italic mb-10 max-w-2xl mx-auto">
               DrizzleDrop Inn meticulously reserves the honorable right to update, modify, or seamlessly change these structural policies at any time without prior notice. Legal bindings apply appropriately under governing jurisdiction.
             </p>
             <a href="/" className="inline-flex items-center gap-3 px-8 py-3.5 bg-white/10 hover:bg-[#C5A861] border border-white/20 hover:border-transparent text-white text-xs font-bold uppercase tracking-widest rounded-full transition-all duration-300">
                Return to Homepage
             </a>
           </motion.div>
        </div>
      </section>

    </div>
  );
}
