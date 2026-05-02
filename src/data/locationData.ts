// ── Central config for all location-specific content ──────────────────────

// Chennai hero images (Using high-quality gallery images from Chennai-images/RECEPTION)
import chennaiHero1 from "@/assets/Gallery/Chennai-images/RECEPTION/_SPY0022.webp";
import chennaiHero2 from "@/assets/Gallery/Chennai-images/RECEPTION/_SPY0030.webp";
import chennaiHero3 from "@/assets/Gallery/Chennai-images/RECEPTION/Reception_1.webp";
import chennaiHero4 from "@/assets/Gallery/Chennai-images/RECEPTION/Corridor_5.webp";

// Ooty hero images (Using high-quality gallery images from Ooty-Images)
import ootyHero1 from "@/assets/Gallery/Ooty-Images/VIEW/BROL6953.webp";
import ootyHero2 from "@/assets/Gallery/Ooty-Images/VIEW/BROL6954.webp";
import ootyHero3 from "@/assets/Gallery/Ooty-Images/VIEW/IMG20210520085101.webp";
import ootyHero4 from "@/assets/Gallery/Ooty-Images/VILLA/Villa_with_Lawn.webp";

// Chennai specific room interior images
import chennaiStdRoom from "@/assets/Gallery/Chennai-images/STANDARD-ROOMS/Standard Room - DDI Chennai/Standard_Room_1.webp";
import chennaiDeluxeRoom from "@/assets/Gallery/Chennai-images/DELUXE-ROOMS/107_DeluxeRoom_1.webp";
import chennaiFamilyRoom from "@/assets/Gallery/Chennai-images/FAMILY-ROOMS/Family Room - DDI Chennai/Family_Room.webp";
import chennaiTripleRoom from "@/assets/Gallery/Chennai-images/TRIPLE-ROOMS/Triple Room - DDI CHennai/106_Deluxe_TripleRoom.webp";

// Ooty specific room interior images
import ootyStdRoom from "@/assets/Gallery/Ooty-Images/ECO-STD ROOM/BROL6978.webp";
import ootyDeluxeRoom from "@/assets/Gallery/Ooty-Images/DELUXE-ROOMS/BROL6924.webp";
import ootyFamilyRoom from "@/assets/Gallery/Ooty-Images/FAMILY-ROOMS/BROL6995.webp";
import ootyTripleRoom from "@/assets/Gallery/Ooty-Images/VILLA/BROL7104.webp";

// Chennai gallery subset (imgs 0–34)
import cg0 from "@/asset_images/WhatsApp Image 2026-03-16 at 3.46.33 PM.webp";
import cg1 from "@/asset_images/WhatsApp Image 2026-03-16 at 3.46.33 PM (1).webp";
import cg2 from "@/asset_images/WhatsApp Image 2026-03-16 at 3.46.33 PM (2).webp";
import cg3 from "@/asset_images/WhatsApp Image 2026-03-16 at 3.46.33 PM (3).webp";
import cg4 from "@/asset_images/WhatsApp Image 2026-03-16 at 3.46.33 PM (4).webp";
import cg5 from "@/asset_images/WhatsApp Image 2026-03-16 at 3.46.33 PM (5).webp";
import cg6 from "@/asset_images/WhatsApp Image 2026-03-16 at 3.46.33 PM (6).webp";
import cg7 from "@/asset_images/WhatsApp Image 2026-03-16 at 3.46.33 PM (7).webp";
import cg8 from "@/asset_images/WhatsApp Image 2026-03-16 at 3.46.33 PM (8).webp";
import cg9 from "@/asset_images/WhatsApp Image 2026-03-16 at 3.46.33 PM (9).webp";
import cg10 from "@/asset_images/WhatsApp Image 2026-03-16 at 3.46.33 PM (10).webp";
import cg11 from "@/asset_images/WhatsApp Image 2026-03-16 at 3.46.33 PM (11).webp";
import cg12 from "@/asset_images/WhatsApp Image 2026-03-16 at 3.46.33 PM (12).webp";

// Ooty gallery subset (imgs 35–70)
import og0 from "@/asset_images/WhatsApp Image 2026-03-16 at 3.46.33 PM (57).webp";
import og1 from "@/asset_images/WhatsApp Image 2026-03-16 at 3.46.33 PM (58).webp";
import og2 from "@/asset_images/WhatsApp Image 2026-03-16 at 3.46.33 PM (59).webp";
import og3 from "@/asset_images/WhatsApp Image 2026-03-16 at 3.46.33 PM (60).webp";
import og4 from "@/asset_images/WhatsApp Image 2026-03-16 at 3.46.33 PM (61).webp";
import og5 from "@/asset_images/WhatsApp Image 2026-03-16 at 3.46.33 PM (62).webp";
import og6 from "@/asset_images/WhatsApp Image 2026-03-16 at 3.46.33 PM (63).webp";
import og7 from "@/asset_images/WhatsApp Image 2026-03-16 at 3.46.33 PM (64).webp";
import og8 from "@/asset_images/WhatsApp Image 2026-03-16 at 3.46.33 PM (65).webp";
import og9 from "@/asset_images/WhatsApp Image 2026-03-16 at 3.46.33 PM (66).webp";
import og10 from "@/asset_images/WhatsApp Image 2026-03-16 at 3.46.33 PM (67).webp";
import og11 from "@/asset_images/WhatsApp Image 2026-03-16 at 3.46.33 PM (68).webp";
import og12 from "@/asset_images/WhatsApp Image 2026-03-16 at 3.46.33 PM (69).webp";

export interface RoomData {
  name: string;
  type: string;
  desc: string;
  price?: string;
  epPrice?: string;
  cpPrice?: string;
  image: string;
  amenities: string[];
}

export interface GalleryImage {
  src: string;
  alt: string;
}

export interface LocationConfig {
  key: "chennai" | "ooty";
  name: string;
  fullName: string;
  tagline: string;
  heroSlides: { image: string; location: string; tagline: string }[];
  about: {
    label: string;
    title: string;
    subtitle: string;
    features: { title: string; desc: string }[];
  };
  rooms: RoomData[];
  gallery: GalleryImage[];
  testimonials: { name: string; text: string; rating: number }[];
  contact: {
    address: string;
    phone: string;
    whatsapp: string;
    email: string;
    mapEmbed: string;
    instagram: string;
    facebook: string;
  };
  seo: {
    title: string;
    description: string;
    keywords: string;
    canonical: string;
    ogImage: string;
  };
  schema: object;
  nearbyAttractions?: { name: string; dist: string }[];
  faqs: { q: string; a: string }[];
}

export const chennaiData: LocationConfig = {
  key: "chennai",
  name: "Chennai",
  fullName: "DrizzleDrop Inn, Chennai",
  tagline: "Comfort and Convenience, Your Perfect Stay in Chennai.",
  heroSlides: [
    { image: chennaiHero1, location: "Chennai", tagline: "Sophisticated Business Stay" },
    { image: chennaiHero2, location: "OMR Corridor", tagline: "Modern Urban Luxury" },
    { image: chennaiHero3, location: "Chennai", tagline: "Premium Hospitality" },
    { image: chennaiHero4, location: "DrizzleDrop", tagline: "Comfort in Every Corner" },
  ],
  about: {
    label: "A Premier 3-Star Business Hotel",
    title: "DrizzleDrop Inn, Chennai",
    subtitle:
      "A sophisticated 3-star sanctuary in the heart of Thoraipakkam. Perfectly positioned along the OMR IT Corridor, we offer modern professionals and leisure guests a seamless blend of contemporary luxury and traditional South Indian warmth.",
    features: [
      { title: "Strategic Location", desc: "Located on OMR, just 30 minutes from Chennai Airport and minutes from major IT hubs, Dakshina Chitra, and ECR." },
      { title: "Refined Comfort", desc: "35 elegantly appointed rooms and suites featuring panoramic terrace views and modern amenities like smart Google TVs." },
      { title: "Signature Experience", desc: "Signature rooftop dining, high-speed Wi-Fi, and guest-centric services with 100% power backup and secure parking." },
    ],
  },
  rooms: [
    {
      name: "Standard Room",
      type: "Business Comfort",
      desc: "Well-furnished room ideal for business travelers, featuring smart Google TV and ergonomic workspace.",
      epPrice: "₹2,450",
      cpPrice: "₹2,650",
      image: chennaiStdRoom,
      amenities: ["WiFi", "Google TV", "Work Desk", "Toiletries"]
    },
    {
      name: "Deluxe Room",
      type: "Executive Luxury",
      desc: "Sophisticated accommodation with upscale furnishings and premium hospitality services.",
      epPrice: "₹2,800",
      cpPrice: "₹3,000",
      image: chennaiDeluxeRoom,
      amenities: ["WiFi", "Google TV", "Mini Bar", "Laundry"]
    },
    {
      name: "Triple Room",
      type: "Group Stay",
      desc: "Perfect for small groups or families, offering comfortable bedding for three with modern amenities.",
      epPrice: "₹3,200",
      cpPrice: "₹3,500",
      image: chennaiTripleRoom,
      amenities: ["WiFi", "Google TV", "Extra Bed", "Toiletries"]
    },
    {
      name: "Family Room",
      type: "Spacious Retreat",
      desc: "Large rooms designed for families, featuring multiple beds and extra space to relax.",
      epPrice: "₹3,700",
      cpPrice: "₹4,100",
      image: chennaiFamilyRoom,
      amenities: ["WiFi", "Google TV", "Spacious", "24h Hot Water"]
    },
  ],
  gallery: [
    { src: cg0, alt: "DrizzleDrop Inn Chennai lobby" },
    { src: cg1, alt: "Chennai hotel standard room" },
    { src: cg2, alt: "Chennai hotel triple room" },
    { src: cg3, alt: "DrizzleDrop Chennai amenities" },
    { src: cg4, alt: "Chennai hotel bathroom" },
    { src: cg5, alt: "DrizzleDrop Chennai rooftop " },
    { src: cg6, alt: "Chennai hotel exterior view" },
    { src: cg7, alt: "DrizzleDrop Chennai OMR corridor" },
    { src: cg8, alt: "Chennai hotel deluxe room" },
    { src: cg9, alt: "Chennai hotel dining area" },
    { src: cg10, alt: "DrizzleDrop Chennai reception" },
    { src: cg11, alt: "Chennai hotel family room" },
    { src: cg12, alt: "DrizzleDrop Inn Chennai facilities" },
  ],
  testimonials: [
    { name: "Rahul M.", text: "Perfect business hotel in Chennai. Clean rooms, fast WiFi, and excellent service. Couldn't ask for more on my corporate trip.", rating: 5 },
    { name: "Ananya S.", text: "Beautiful stay experience with amazing hospitality. The rooftop dining was unforgettable. Will definitely return!", rating: 5 },
    { name: "David L.", text: "World-class hospitality at an incredible value. The OMR location is perfect for IT professionals.", rating: 4 },
    { name: "Karthik R.", text: "Stayed here for 2 weeks on a project. The team was incredibly helpful, rooms spotless, and food delicious.", rating: 5 },
  ],
  contact: {
    address: "A4, 4/476/77, Chandrasekaran Avenue, 1st Main Road, Thoraipakkam, Chennai - 600097",
    phone: "+91 97911 78349",
    whatsapp: "https://wa.me/919791178349",
    email: "stay@drizzledropinn.com",
    mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.5847992975273!2d80.22950347411972!3d12.93438611569501!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a525d3e8c850455%3A0xad75b35ac6cfc12!2sDrizzleDrop%20Inn%2CCHENNAI!5e0!3m2!1sen!2sus!4v1773836584953!5m2!1sen!2sus",
    instagram: "https://www.instagram.com/drizzledropinn_chennai?utm_source=qr&igsh=ZXFsNnM1emR5aGdn",
    facebook: "https://www.facebook.com/share/14emw7wGXXd/",
  },
  seo: {
    title: "Best Hotel in Chennai | Drizzle Drop Inn – OMR IT Corridor",
    description: "Stay at DrizzleDrop Inn, the best hotel in Chennai on OMR IT Corridor. Enjoy 35 premium rooms, rooftop dining, free parking & WiFi. Book your stay today!",
    keywords: "best hotel in Chennai, hotel in OMR Chennai, business hotel Chennai, DrizzleDrop Inn Chennai, hotel near IT park Chennai, Thoraipakkam hotel",
    canonical: "https://www.drizzledrop.com/chennai",
    ogImage: chennaiHero1,
  },
  schema: {
    "@context": "https://schema.org",
    "@type": "Hotel",
    "name": "DrizzleDrop Inn Chennai",
    "description": "A sophisticated 3-star business hotel on the OMR IT Corridor in Chennai offering rooftop dining and premium amenities.",
    "url": "https://www.drizzledrop.com/chennai",
    "telephone": "+919791178349",
    "email": "stay@drizzledropinn.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "A4, 4/476/77, Chandrasekaran Avenue, 1st Main Road, Thoraipakkam",
      "addressLocality": "Chennai",
      "addressRegion": "Tamil Nadu",
      "postalCode": "600097",
      "addressCountry": "IN"
    },
    "starRating": { "@type": "Rating", "ratingValue": "3" },
    "priceRange": "₹₹",
    "sameAs": [
      "https://www.facebook.com/share/14emw7wGXXd/",
      "https://www.instagram.com/drizzledropinn_chennai?utm_source=qr&igsh=ZXFsNnM1emR5aGdn"
    ]
  },
  faqs: [
    { q: "What are the check-in and check-out timings for Chennai?", a: "Standard check-in is at 12:00 PM and check-out is at 11:00 AM." },
    { q: "Is DrizzleDrop Inn Chennai close to the IT corridor?", a: "Yes, we are located right on the OMR IT Corridor in Thoraipakkam, within 10-15 minutes of major tech parks like ASV Suntech and Prince InfoCity." },
    { q: "Does the Chennai hotel have a restaurant?", a: "Yes, we have a signature rooftop restaurant specializing in Multi-Cuisine and Asian delicacies." },
    { q: "Is there parking available in Chennai?", a: "Yes, we provide secure covered car parking for our guests." }
  ],
};

export const ootyData: LocationConfig = {
  key: "ooty",
  name: "Ooty",
  fullName: "DrizzleDrop Inn, Ooty",
  tagline: "Unwind with Panoramic Hill Views and the Magic of the Nilgiris.",
  heroSlides: [
    { image: ootyHero1, location: "Ooty", tagline: "Breathtaking Hill Views" },
    { image: ootyHero3, location: "Nilgiris", tagline: "Where Mist Meets Mountain" },
    { image: ootyHero2, location: "Ooty", tagline: "Serene Valley Panoramas" },
    { image: ootyHero4, location: "DrizzleDrop", tagline: "Your Mountain Sanctuary" },
  ],
  about: {
    label: "Alpine Serenity",
    title: "Your Mountain Sanctuary Awaits",
    subtitle:
      "DrizzleDrop Inn Ooty is an enchanting hill-station getaway featuring 8 individual apartment-type rooms with private balconies overlooking the Nilgiris. Experience panoramic valley views, the historical toy train, and the whisper of the hills.",
    features: [
      { title: "Panoramic Hill Views", desc: "Each room has a private balcony with breathtaking views of the Nilgiri hills and misty valleys." },
      { title: "Lawn & Barbeque", desc: "Enjoy a relaxing outdoor experience with our spacious lawn, perfect for barbeque evenings and cozy campfire gatherings." },
      { title: "Prime Proximity", desc: "Located 2 km from the botanical gardens, railway station, and the UNESCO-listed Nilgiri Mountain Railway." },
    ],
  },
  rooms: [
    {
      name: "Standard Room",
      type: "Alpine Solace",
      desc: "Individual apartment-type room with private balcony offering excellent panoramic Nilgiri hill views.",
      epPrice: "₹2,450",
      cpPrice: "₹2,650",
      image: ootyStdRoom,
      amenities: ["Balcony", "WiFi", "Google TV", "Scenic View"]
    },
    {
      name: "Deluxe Room",
      type: "Luxury View",
      desc: "Enchanting hill-view room with premium furnishings and a private balcony to enjoy the Nilgiris.",
      epPrice: "₹2,800",
      cpPrice: "₹3,000",
      image: ootyDeluxeRoom,
      amenities: ["Hill View", "Private Balcony", "Heater", "WiFi"]
    },
    {
      name: "Triple Room",
      type: "Cozy Trio",
      desc: "Mountain retreat for three, perfectly located to view the famous Nilgiris toy train route.",
      epPrice: "₹3,200",
      cpPrice: "₹3,500",
      image: ootyTripleRoom,
      amenities: ["Mountain View", "Extra Bed", "Heater", "WiFi"]
    },
    {
      name: "Family Room",
      type: "Grand Vista",
      desc: "Large hill-station getaway for the whole family with multiple beds and breathtaking valley views.",
      epPrice: "₹3,700",
      cpPrice: "₹4,100",
      image: ootyFamilyRoom,
      amenities: ["Panoramic View", "Private Balcony", "Spacious", "WiFi"]
    },
  ],
  gallery: [
    { src: og0, alt: "DrizzleDrop Inn Ooty panoramic view" },
    { src: og1, alt: "Ooty hotel hill station room" },
    { src: og2, alt: "Nilgiris valley view from balcony" },
    { src: og3, alt: "DrizzleDrop Ooty private balcony" },
    { src: og4, alt: "Ooty hotel nature surroundings" },
    { src: og5, alt: "DrizzleDrop Inn Ooty exterior" },
    { src: og6, alt: "Nilgiri hills view from DrizzleDrop" },
    { src: og7, alt: "Ooty hotel comfortable room" },
    { src: og8, alt: "Hill station hotel Ooty" },
    { src: og9, alt: "DrizzleDrop Ooty misty morning" },
    { src: og10, alt: "Ooty hotel deluxe balcony room" },
    { src: og11, alt: "Nilgiris landscape DrizzleDrop" },
    { src: og12, alt: "DrizzleDrop Inn Ooty guest area" },
  ],
  testimonials: [
    { name: "Priya K.", text: "Our Ooty trip was magical. The valley views from our room were breathtaking. Best decision we made for our anniversary!", rating: 5 },
    { name: "Suresh V.", text: "Woke up every morning to misty hills and fresh Nilgiri air. The private balcony is absolutely worth it.", rating: 5 },
    { name: "Meera T.", text: "Perfect getaway for families. Kids loved it, rooms were clean, staff was warm. We are already planning our next trip!", rating: 5 },
    { name: "Arun P.", text: "Fantastic location near the toy train station. DrizzleDrop Ooty made our vacation unforgettable.", rating: 4 },
  ],
  contact: {
    address: "215 H, Dispensary Road, Fern Hill, Ooty, Tamil Nadu – 643004",
    phone: "+91 91504 86153",
    whatsapp: "https://wa.me/919150486153",
    email: "stay@drizzledropinn.com",
    mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d39892631.06442901!2d31.07136452959029!3d52.391215641873124!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba8962ea346ed07%3A0xf65c4c81e400f184!2sDrizzleDrop%20Inn!5e0!3m2!1sen!2sus!4v1773834594116!5m2!1sen!2sus",
    instagram: "https://www.instagram.com/drizzledropinn_ooty?utm_source=qr&igsh=MWM3dHdneGJoaG55eQ==",
    facebook: "https://www.facebook.com/share/14emw7wGXXd/",
  },
  seo: {
    title: "Best Stay in Ooty | Drizzle Drop Inn – Nilgiri Hill Station",
    description: "Experience the best hotel stay in Ooty at DrizzleDrop Inn. Private balconies with Nilgiri hill views, proximity to toy train & attractions. Book now!",
    keywords: "best hotel in Ooty, Ooty hill station hotel, DrizzleDrop Inn Ooty, Nilgiri hotel, hotel near Ooty railway station, Ooty resort with view",
    canonical: "https://www.drizzledrop.com/ooty",
    ogImage: ootyHero1,
  },
  schema: {
    "@context": "https://schema.org",
    "@type": "Hotel",
    "name": "DrizzleDrop Inn Ooty",
    "description": "An enchanting hill-station getaway in Ooty with 8 individual rooms, private balconies and panoramic Nilgiri views.",
    "url": "https://www.drizzledrop.com/ooty",
    "telephone": "+919150486153",
    "email": "ooty@drizzledrop.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "2 KM from Ooty Bus Stand & Railway Station",
      "addressLocality": "Ooty",
      "addressRegion": "Tamil Nadu",
      "postalCode": "643001",
      "addressCountry": "IN"
    },
    "starRating": { "@type": "Rating", "ratingValue": "3" },
    "priceRange": "₹₹",
    "sameAs": [
      "https://www.facebook.com/share/14emw7wGXXd/",
      "https://www.instagram.com/drizzledropinn_ooty?utm_source=qr&igsh=MWM3dHdneGJoaGdn"
    ]
  },
  nearbyAttractions: [
    { name: "Nilgiri Mountain Railway", dist: "2.8 KM" },
    { name: "Ooty Lake", dist: "3.3 KM" },
    { name: "Ooty Bus Stand", dist: "2.3 KM" },
    { name: "Charing Cross", dist: "4.0 KM" },
    { name: "Cairn Hill", dist: "2.1 KM" },
    { name: "Arboretum", dist: "1.5 KM" },
    { name: "Deer Park", dist: "2.0 KM" },
    { name: "Botanical Garden", dist: "4.9 KM" },
    { name: "Rose Garden", dist: "4.0 KM" },
    { name: "Pykara Lake", dist: "25 KM" },
    { name: "Tea Factory", dist: "7.4 KM" },
    { name: "Doddabetta View Point", dist: "11 KM" },
    { name: "Coonoor", dist: "21 KM" },
    { name: "Kotagiri", dist: "31 KM" },
    { name: "Avalanche", dist: "22 KM" },
    { name: "Emerald", dist: "19 KM" },
    { name: "Murugan Temple", dist: "4.5 KM" },
    { name: "Upper Bhavani", dist: "39 KM" },
    { name: "Gudalur", dist: "52 KM" },
    { name: "Mudumalai", dist: "48 KM" },
    { name: "Pine Forest", dist: "10 KM" },
    { name: "Wax Museum", dist: "5.2 KM" },
    { name: "Snow Park", dist: "2.7 KM" },
  ],
  faqs: [
    { q: "What is the best time to visit Ooty?", a: "Ooty is beautiful year-round, but peak season is from March to June for pleasant weather and September to November for the post-monsoon greenery." },
    { q: "Do the rooms in Ooty have balconies?", a: "Yes, all our rooms in Ooty are individual apartment-style units with private balconies offering panoramic hill views." },
    { q: "How far is the Ooty property from the railway station?", a: "DrizzleDrop Inn Ooty is conveniently located just 2 KM (approx. 10 minutes) from the Ooty railway station and bus stand." },
    { q: "Does the Ooty property offer bonfire and barbeque?", a: "Yes! We can arrange for a cozy bonfire and a delicious barbeque experience on request." }
  ],
};

export const locationMap: Record<string, LocationConfig> = {
  chennai: chennaiData,
  ooty: ootyData,
};
