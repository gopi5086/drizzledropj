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
import ootyHero from "@/assets/ooty-valley.jpg";
import chennaiHero from "@/asset_images/WhatsApp Image 2026-03-16 at 3.46.33 PM (7).jpeg";

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
    {/* 1. Hero / Intro Section */}
    <section className="relative h-[65vh] md:h-[75vh] w-full overflow-hidden">
      <img src={ootyHero} alt="Ooty Hills" className="w-full h-full object-cover scale-105 transform transition-transform duration-[10s] hover:scale-110" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a2f23]/80 via-[#1a2f23]/50 to-black/30" />
      
      <div className="absolute inset-0 flex items-center justify-center pt-24">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={STAGGER_CONTAINER}
          className="text-center text-white px-4 max-w-4xl"
        >
          <motion.h1 variants={FADE_IN} className="text-4xl md:text-6xl lg:text-7xl font-display font-extrabold tracking-tight drop-shadow-2xl text-white mb-6">
            Ooty – Queen of Hill Stations
          </motion.h1>
          <motion.p variants={FADE_IN} className="text-lg md:text-2xl font-medium tracking-wide drop-shadow-md text-white/95 mb-8">
            A short, elegant escape into a canvas of emerald slopes
          </motion.p>
          <motion.div variants={FADE_IN} className="text-sm md:text-lg opacity-95 text-white/90 max-w-3xl mx-auto leading-relaxed drop-shadow-lg font-medium bg-black/20 p-6 rounded-2xl backdrop-blur-sm border border-white/10">
            Ooty, fondly known as the “Queen of Hill Stations” and the “Paradise on Earth,” is celebrated for its breathtaking landscapes and serene charm. Also known as Udhagamandalam, it is nestled in the Nilgiris district at an altitude of 2,240 meters above sea level. The Nilgiris, meaning “Blue Mountains,” offer picturesque views and have long been a favored retreat since the colonial era.
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
    {/* 1. Hero / Intro Section */}
    <section className="relative h-[65vh] md:h-[75vh] w-full overflow-hidden">
      <img src={chennaiHero} alt="Chennai Cityscape" className="w-full h-full object-cover scale-105 transform transition-transform duration-[10s] hover:scale-110" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a232f]/90 via-[#1a232f]/55 to-black/30" />
      
      <div className="absolute inset-0 flex items-center justify-center pt-24">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={STAGGER_CONTAINER}
          className="text-center text-white px-4 max-w-4xl"
        >
          <motion.div variants={FADE_IN} className="mb-4 inline-block px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-sm font-semibold tracking-wider uppercase shadow-xl">
            A Premier 3-Star Business Hotel
          </motion.div>
          <motion.h1 variants={FADE_IN} className="text-4xl md:text-6xl lg:text-7xl font-display font-extrabold tracking-tight drop-shadow-2xl text-white mb-6">
            DrizzleDrop Inn, Chennai
          </motion.h1>
          <motion.p variants={FADE_IN} className="text-lg md:text-2xl font-medium tracking-wide drop-shadow-md text-white/95 mb-8">
            Modern Comfort Meets Traditional Warmth
          </motion.p>
          <motion.div variants={FADE_IN} className="text-sm md:text-lg opacity-95 text-white/90 max-w-3xl mx-auto leading-relaxed drop-shadow-lg font-medium bg-black/30 p-6 rounded-2xl backdrop-blur-sm border border-white/10">
            Discover hassle-free accommodation in the heart of Chennai at DrizzleDrop Inn, a modern 3-star property ideal for both business travelers and vacationers. Perfectly situated in the city center at Thoriaipakkam, the hotel places you at the core of Chennai’s vibrant business and shopping districts.
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

  if (!loc) {
    return (
      <div className="flex flex-col">
        <ChennaiAbout />
        <div className="w-full h-px bg-gray-200" />
        <OotyAbout />
      </div>
    );
  }

  return loc === "ooty" ? <OotyAbout /> : <ChennaiAbout />;
}
