import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";
import {
  Navigation,
  BedDouble,
  Utensils,
  Flame,
  Car,
  Wifi,
  Stethoscope,
  Baby,
  Leaf,
  ShieldCheck,
  Building2,
  Coffee,
  Zap,
  Briefcase
} from "lucide-react";
import ootyHero from "@/assets/Gallery/Ooty-Images/VIEW/BROL6954.webp";
import chennaiHero from "@/assets/Gallery/Chennai-images/RECEPTION/_SPY0009.webp";
import SEO from "@/components/SEO";

const FADE_IN = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const STAGGER_CONTAINER = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const OotyAbout = () => (
  <div className="bg-[#f8faf9] min-h-screen">
    <section className="relative h-[85vh] w-full overflow-hidden flex items-start justify-center">
      <motion.img 
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 10, ease: "easeOut" }}
        src={ootyHero} 
        alt="Ooty Hills" 
        className="absolute inset-0 w-full h-full object-cover" 
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/20 to-black/60" />

      <div className="relative z-10 w-full max-w-5xl px-6 text-center pt-44 pb-12">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={STAGGER_CONTAINER}
          className="space-y-6"
        >
          <motion.h1 
            variants={FADE_IN} 
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white font-display leading-[1.1]"
          >
            Ooty – <span className="text-[#C5A861] italic font-serif">Queen</span> of <br />Hill Stations
          </motion.h1>
          
          <motion.div variants={FADE_IN} className="flex items-center justify-center gap-4 text-white/90 text-sm md:text-base font-bold uppercase tracking-[0.3em] mb-12">
             <div className="h-px w-8 bg-[#C5A861]" />
             A Canvas of Emerald Slopes
             <div className="h-px w-8 bg-[#C5A861]" />
          </motion.div>

          <motion.div 
            variants={FADE_IN} 
            className="max-w-3xl mx-auto px-6"
          >
            
            <p className="text-sm md:text-lg text-white font-medium leading-relaxed opacity-95">
              Ooty, fondly known as the “Queen of Hill Stations” and the “Paradise on Earth,” is celebrated for its breathtaking landscapes and serene charm. Nestled in the Nilgiris at 2,240m above sea level, it offers picturesque views and a timeless colonial legacy.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>

    <div className="container-luxury py-16 md:py-24 space-y-24">
      {/* 2. About DrizzleDrop Inn */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={FADE_IN}
        className="text-center max-w-4xl mx-auto"
      >
        <SectionHeading label="Welcome" title="About DrizzleDrop Inn, Ooty" subtitle="Your serene haven in the Nilgiris" />
        <p className="mt-8 text-gray-700 text-lg md:text-xl leading-loose font-serif">
          Discover a seamless and scenic escape at DrizzleDrop Inn, your perfect retreat in the heart of Ooty. Surrounded by enchanting natural beauty, the inn offers a tranquil haven where your mind, body, and soul can relax and reconnect with nature. Experience a unique stay amidst the breathtaking vistas of the Nilgiris.
        </p>
      </motion.section>

      {/* 3. Highlights / Features */}
      <section>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={STAGGER_CONTAINER}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <motion.div variants={FADE_IN} className="group bg-white rounded-3xl p-8 md:p-10 shadow-sm hover:shadow-2xl transition-all duration-500 border border-[#3a7d5a]/10 hover:-translate-y-2 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-[#3a7d5a]/10 to-transparent rounded-bl-full -z-10 transition-transform duration-500 group-hover:scale-125" />
            <div className="w-16 h-16 bg-gradient-to-br from-[#3a7d5a]/20 to-[#3a7d5a]/5 rounded-2xl flex items-center justify-center text-[#3a7d5a] mb-8 shadow-inner group-hover:scale-110 transition-transform">
              <Navigation className="w-8 h-8" />
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 font-display">A Splendid Getaway</h3>
            <p className="text-gray-600 leading-relaxed text-lg">
              Located just 2 km from the Ooty bus stand and railway station, the inn provides easy access to popular attractions such as the Rose Garden and Ooty Lake.
            </p>
          </motion.div>

          <motion.div variants={FADE_IN} className="group bg-white rounded-3xl p-8 md:p-10 shadow-sm hover:shadow-2xl transition-all duration-500 border border-[#3a7d5a]/10 hover:-translate-y-2 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-[#3a7d5a]/10 to-transparent rounded-bl-full -z-10 transition-transform duration-500 group-hover:scale-125" />
            <div className="w-16 h-16 bg-gradient-to-br from-[#3a7d5a]/20 to-[#3a7d5a]/5 rounded-2xl flex items-center justify-center text-[#3a7d5a] mb-8 shadow-inner group-hover:scale-110 transition-transform">
              <BedDouble className="w-8 h-8" />
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 font-display">Comfortable Accommodation</h3>
            <p className="text-gray-600 leading-relaxed text-lg">
              Featuring 8 hill-view apartment-style rooms with private balconies, offering panoramic views and glimpses of the Nilgiris toy train. Rooms include modern amenities like TV, seating area, and premium bathrooms.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* 4. Facilities & Services */}
      <section className="bg-white/60 p-8 md:p-16 rounded-[2.5rem] border border-[#3a7d5a]/15 backdrop-blur-md shadow-lg relative overflow-hidden">
        <div className="absolute -left-20 -top-20 w-64 h-64 bg-[#3a7d5a]/5 rounded-full blur-3xl" />
        <div className="relative z-10">
          <SectionHeading label="Amenities" title="Facilities & Services" subtitle="Everything you need for a comfortable stay" />
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={STAGGER_CONTAINER}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-12"
          >
            {[
              { icon: Utensils, text: "In-house restaurant with à la carte menu" },
              { icon: Flame, text: "Barbeque & campfire experience" },
              { icon: Car, text: "Travel desk & private parking" },
              { icon: Wifi, text: "Wi-Fi & 24-hour hot water" },
              { icon: Stethoscope, text: "Laundry & doctor on call" },
              { icon: Baby, text: "Kids play area & recreational activities" },
            ].map((item, idx) => (
              <motion.div key={idx} variants={FADE_IN} className="group flex items-center gap-5 bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:border-[#3a7d5a]/40 hover:shadow-md transition-all duration-300">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-[#3a7d5a]/10 to-[#3a7d5a]/5 flex items-center justify-center text-[#3a7d5a] group-hover:scale-110 transition-transform">
                  <item.icon className="w-6 h-6" />
                </div>
                <span className="text-base md:text-lg text-gray-700 font-semibold group-hover:text-gray-900 transition-colors">
                  {item.text}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 5 & 6. Nature & Safety */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={FADE_IN}
          className="group bg-gradient-to-br from-[#3a7d5a] to-[#204a34] rounded-[2.5rem] p-10 md:p-14 text-white shadow-2xl relative overflow-hidden"
        >
          <div className="absolute -bottom-16 -right-16 opacity-10 transform origin-center rotate-12 group-hover:rotate-0 transition-transform duration-700">
            <Leaf className="w-64 h-64" />
          </div>
          <div className="relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center mb-8 border border-white/20">
              <Leaf className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-3xl font-bold mb-6 font-display">A Nature Experience</h3>
            <p className="text-white/90 leading-relaxed text-lg md:text-xl font-medium">
              A paradise for nature lovers, the inn offers an immersive experience with lush greenery, birdwatching opportunities, and peaceful surroundings. Guests are welcomed with warm hospitality and personalized service.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={FADE_IN}
          className="group bg-gradient-to-br from-[#2E6B8A] to-[#16374a] rounded-[2.5rem] p-10 md:p-14 text-white shadow-2xl relative overflow-hidden"
        >
          <div className="absolute -bottom-16 -right-16 opacity-10 transform origin-center -rotate-12 group-hover:rotate-0 transition-transform duration-700">
            <ShieldCheck className="w-64 h-64" />
          </div>
          <div className="relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center mb-8 border border-white/20">
              <ShieldCheck className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-3xl font-bold mb-6 font-display">Safety & Hygiene Focus</h3>
            <p className="text-white/90 leading-relaxed text-lg md:text-xl font-medium">
              The inn follows strict cleaning, sanitization, and safety protocols to ensure a secure and comfortable stay for all guests. Your wellbeing is our top priority.
            </p>
          </div>
        </motion.div>
      </section>
    </div>
  </div>
);

const ChennaiAbout = () => (
  <div className="bg-[#f8faf9] min-h-screen">
    <section className="relative h-[85vh] w-full overflow-hidden flex items-start justify-center">
      <motion.img 
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 10, ease: "easeOut" }}
        src={chennaiHero} 
        alt="Chennai Property" 
        className="absolute inset-0 w-full h-full object-cover" 
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/20 to-black/60" />

      <div className="relative z-10 w-full max-w-5xl px-6 text-center pt-44 pb-12">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={STAGGER_CONTAINER}
          className="space-y-6"
        >
          <motion.h1 
            variants={FADE_IN} 
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white font-display leading-[1.1]"
          >
            DrizzleDrop <br /><span className="text-[#C5A861] italic font-serif">Chennai</span>
          </motion.h1>
          
          <motion.div variants={FADE_IN} className="flex items-center justify-center gap-4 text-white/90 text-sm md:text-base font-bold uppercase tracking-[0.3em] mb-12">
             <div className="h-px w-8 bg-[#C5A861]" />
             Modern Luxury & Business Comfort
             <div className="h-px w-8 bg-[#C5A861]" />
          </motion.div>

          <motion.div 
            variants={FADE_IN} 
            className="max-w-3xl mx-auto px-6 text-center"
          >
            
            <p className="text-sm md:text-lg text-white font-medium leading-relaxed opacity-95 text-center">
              Experience hassle-free accommodation in the heart of Chennai. Situated at Thoraipakkam, our 3-star property puts you at the core of the city's vibrant OMR business district and premium shopping destinations.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>

    <div className="container-luxury py-16 md:py-24 space-y-24">
      {/* 2. About DrizzleDrop Inn */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={FADE_IN}
        className="text-center max-w-4xl mx-auto"
      >
        <SectionHeading label="Welcome" title="About DrizzleDrop Inn, Chennai" subtitle="Your perfect stay in Chennai" />
        <p className="mt-8 text-gray-700 text-lg md:text-xl leading-loose font-serif">
          Experience the art of hospitality at DrizzleDrop Inn, Chennai. Whether you’re here for work or leisure, enjoy a relaxing stay with facilities designed for your comfort and convenience. We ensure a seamless experience during your visit to placing you at the core of Chennai's vibrant business and shopping districts.
        </p>
      </motion.section>

      {/* 3. Highlights / Features */}
      <section>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={STAGGER_CONTAINER}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <motion.div variants={FADE_IN} className="group bg-white rounded-3xl p-8 md:p-10 shadow-sm hover:shadow-2xl transition-all duration-500 border border-[#2E6B8A]/10 hover:-translate-y-2 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-[#2E6B8A]/10 to-transparent rounded-bl-full -z-10 transition-transform duration-500 group-hover:scale-125" />
            <div className="w-16 h-16 bg-gradient-to-br from-[#2E6B8A]/20 to-[#2E6B8A]/5 rounded-2xl flex items-center justify-center text-[#2E6B8A] mb-8 shadow-inner group-hover:scale-110 transition-transform">
              <Building2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 font-display">Prime Location</h3>
            <p className="text-gray-600 leading-relaxed text-lg">
              Strategically located on Rajiv Gandhi Salai (OMR IT Corridor), just a 30-minute drive from Chennai Airport. The hotel is close to major IT hubs, tourist attractions like Dakshina Chitra, ECR, and popular theme parks such as MGM and VGP, as well as Beasant Nagar Beach and Marina Beach.
            </p>
          </motion.div>

          <motion.div variants={FADE_IN} className="group bg-white rounded-3xl p-8 md:p-10 shadow-sm hover:shadow-2xl transition-all duration-500 border border-[#2E6B8A]/10 hover:-translate-y-2 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-[#2E6B8A]/10 to-transparent rounded-bl-full -z-10 transition-transform duration-500 group-hover:scale-125" />
            <div className="w-16 h-16 bg-gradient-to-br from-[#2E6B8A]/20 to-[#2E6B8A]/5 rounded-2xl flex items-center justify-center text-[#2E6B8A] mb-8 shadow-inner group-hover:scale-110 transition-transform">
              <BedDouble className="w-8 h-8" />
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 font-display">Comfort & Luxury</h3>
            <p className="text-gray-600 leading-relaxed text-lg">
              Experience upscale comfort with 35 beautifully appointed rooms and suites, each offering panoramic views from the terrace. Thoughtfully decorated and well-equipped, our rooms feature modern amenities including flat-screen Google TV, telephones, sofas, writing tables, and contemporary bathrooms with toiletries.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* 4. Facilities & Services */}
      <section className="bg-white/60 p-8 md:p-16 rounded-[2.5rem] border border-[#2E6B8A]/15 backdrop-blur-md shadow-lg relative overflow-hidden">
        <div className="absolute -left-20 -top-20 w-64 h-64 bg-[#2E6B8A]/5 rounded-full blur-3xl" />
        <div className="relative z-10">
          <SectionHeading label="Amenities" title="Facilities & Services" subtitle="Premium offerings for an unforgettable stay" />
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={STAGGER_CONTAINER}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-12"
          >
            {[
              { icon: Utensils, text: "Rooftop restaurant with stunning panoramic views" },
              { icon: Wifi, text: "State-of-the-art tech & Wi-Fi in meeting rooms" },
              { icon: Coffee, text: "24-hour room service, laundry, and parking" },
              { icon: BedDouble, text: "Well-furnished rooms with tea/coffee makers & sofas" },
              { icon: Zap, text: "Electricity backup and 24-hr hot water supply" },
              { icon: ShieldCheck, text: "Secure covered car parking & Car rental services" },
            ].map((item, idx) => (
              <motion.div key={idx} variants={FADE_IN} className="group flex items-center gap-5 bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:border-[#2E6B8A]/40 hover:shadow-md transition-all duration-300">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-[#2E6B8A]/10 to-[#2E6B8A]/5 flex items-center justify-center text-[#2E6B8A] group-hover:scale-110 transition-transform">
                  <item.icon className="w-6 h-6" />
                </div>
                <span className="text-base md:text-lg text-gray-700 font-semibold group-hover:text-gray-900 transition-colors">
                  {item.text}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 5 & 6. Nature & Safety -> replaced with Ideal for Business & Leisure */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={FADE_IN}
          className="group bg-gradient-to-br from-[#2E6B8A] to-[#16374a] rounded-[2.5rem] p-10 md:p-14 text-white shadow-2xl relative overflow-hidden"
        >
          <div className="absolute -bottom-16 -right-16 opacity-10 transform origin-center rotate-12 group-hover:rotate-0 transition-transform duration-700">
            <Briefcase className="w-64 h-64" />
          </div>
          <div className="relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center mb-8 border border-white/20">
              <Briefcase className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-3xl font-bold mb-6 font-display">Ideal for Business & Leisure</h3>
            <p className="text-white/90 leading-relaxed text-lg md:text-xl font-medium">
              Whether you’re here for work or leisure, enjoy a relaxing stay with facilities designed for your comfort and convenience. The hotel also offers car rental services, ensuring a seamless experience during your visit.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={FADE_IN}
          className="group bg-gradient-to-br from-[#1a3324] to-[#254d36] rounded-[2.5rem] p-10 md:p-14 text-white shadow-2xl relative overflow-hidden"
        >
          <div className="absolute -bottom-16 -right-16 opacity-10 transform origin-center -rotate-12 group-hover:rotate-0 transition-transform duration-700">
            <ShieldCheck className="w-64 h-64" />
          </div>
          <div className="relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center mb-8 border border-white/20">
              <ShieldCheck className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-3xl font-bold mb-6 font-display">Modern Comforts</h3>
            <p className="text-white/90 leading-relaxed text-lg md:text-xl font-medium">
              Experience the art of hospitality at DrizzleDrop Inn, Chennai — where modern comfort meets traditional warmth. From state of the art networking to luxurious rooms, elevate your stay.
            </p>
          </div>
        </motion.div>
      </section>
    </div>
  </div>
);

export default function About() {
  const { locationId } = useParams<{ locationId?: string }>();
  const navigate = useNavigate();
  const loc = locationId ? locationId.toLowerCase() : "";

  useEffect(() => {
    if (!loc) return;
    if (!["ooty", "chennai"].includes(loc)) {
      navigate("/", { replace: true });
    }
  }, [loc, navigate]);

  const seoTitle = loc === "ooty" ? "About DrizzleDrop Inn Ooty | Our Story & Nilgiri Heritage" : loc === "chennai" ? "About DrizzleDrop Inn Chennai | Business Hospitality in OMR" : "About DrizzleDrop Inn | Our Properties & Hospitality Values";
  const seoDesc = loc === "ooty" ? "Learn about our heritage property in Ooty, nestled in the Nilgiris with panoramic valley views." : loc === "chennai" ? "Discover our 3-star business hotel in Chennai OMR, perfectly located for corporate and leisure stays." : "DrizzleDrop Inn offers premium hospitality in Ooty and Chennai. Learn about our story and commitment to comfort.";

  if (!loc) {
    return (
      <div className="flex flex-col">
        <SEO title={seoTitle} description={seoDesc} url="https://drizzledropinn.com/about" />
        <ChennaiAbout />
        <div className="w-full h-px bg-gray-200" />
        <OotyAbout />
      </div>
    );
  }

  return (
    <>
      <SEO title={seoTitle} description={seoDesc} url={`https://drizzledropinn.com/${loc}/about`} />
      {loc === "ooty" ? <OotyAbout /> : <ChennaiAbout />}
    </>
  );
}
