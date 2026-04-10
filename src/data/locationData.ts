// ── Central config for all location-specific content ──────────────────────

// Chennai hero images (indices 0–6 are clearly hotel/lobby shots)
import chennaiHero1 from "@/asset_images/WhatsApp Image 2026-03-16 at 3.46.33 PM (7).jpeg";
import chennaiHero2 from "@/asset_images/WhatsApp Image 2026-03-16 at 3.46.33 PM (6).jpeg";
import chennaiHero3 from "@/asset_images/WhatsApp Image 2026-03-16 at 3.46.33 PM (51).jpeg";
import chennaiHero4 from "@/asset_images/WhatsApp Image 2026-03-16 at 3.46.33 PM (52).jpeg";

// Ooty hero images (indices 57+ are clearly nature/hill shots)
import ootyHero1 from "@/asset_images/WhatsApp Image 2026-03-16 at 3.46.33 PM (57).jpeg";
import ootyHero2 from "@/asset_images/WhatsApp Image 2026-03-16 at 3.46.33 PM (23).jpeg";
import ootyHero3 from "@/asset_images/WhatsApp Image 2026-03-16 at 3.46.33 PM (60).jpeg";
import ootyHero4 from "@/asset_images/WhatsApp Image 2026-03-16 at 3.46.33 PM (65).jpeg";

// Shared room images
import roomStandard from "@/asset_images/WhatsApp Image 2026-03-16 at 3.46.33 PM (1).jpeg";
import roomTriple from "@/asset_images/WhatsApp Image 2026-03-16 at 3.46.33 PM (2).jpeg";
import roomFamily from "@/asset_images/WhatsApp Image 2026-03-16 at 3.46.33 PM (44).jpeg";
import roomDeluxe from "@/asset_images/WhatsApp Image 2026-03-16 at 3.46.33 PM (46).jpeg";

// Chennai gallery subset (imgs 0–34)
import cg0 from "@/asset_images/WhatsApp Image 2026-03-16 at 3.46.33 PM.jpeg";
import cg1 from "@/asset_images/WhatsApp Image 2026-03-16 at 3.46.33 PM (1).jpeg";
import cg2 from "@/asset_images/WhatsApp Image 2026-03-16 at 3.46.33 PM (2).jpeg";
import cg3 from "@/asset_images/WhatsApp Image 2026-03-16 at 3.46.33 PM (3).jpeg";
import cg4 from "@/asset_images/WhatsApp Image 2026-03-16 at 3.46.33 PM (4).jpeg";
import cg5 from "@/asset_images/WhatsApp Image 2026-03-16 at 3.46.33 PM (5).jpeg";
import cg6 from "@/asset_images/WhatsApp Image 2026-03-16 at 3.46.33 PM (6).jpeg";
import cg7 from "@/asset_images/WhatsApp Image 2026-03-16 at 3.46.33 PM (7).jpeg";
import cg8 from "@/asset_images/WhatsApp Image 2026-03-16 at 3.46.33 PM (8).jpeg";
import cg9 from "@/asset_images/WhatsApp Image 2026-03-16 at 3.46.33 PM (9).jpeg";
import cg10 from "@/asset_images/WhatsApp Image 2026-03-16 at 3.46.33 PM (10).jpeg";
import cg11 from "@/asset_images/WhatsApp Image 2026-03-16 at 3.46.33 PM (11).jpeg";
import cg12 from "@/asset_images/WhatsApp Image 2026-03-16 at 3.46.33 PM (12).jpeg";

// Ooty gallery subset (imgs 35–70)
import og0 from "@/asset_images/WhatsApp Image 2026-03-16 at 3.46.33 PM (57).jpeg";
import og1 from "@/asset_images/WhatsApp Image 2026-03-16 at 3.46.33 PM (58).jpeg";
import og2 from "@/asset_images/WhatsApp Image 2026-03-16 at 3.46.33 PM (59).jpeg";
import og3 from "@/asset_images/WhatsApp Image 2026-03-16 at 3.46.33 PM (60).jpeg";
import og4 from "@/asset_images/WhatsApp Image 2026-03-16 at 3.46.33 PM (61).jpeg";
import og5 from "@/asset_images/WhatsApp Image 2026-03-16 at 3.46.33 PM (62).jpeg";
import og6 from "@/asset_images/WhatsApp Image 2026-03-16 at 3.46.33 PM (63).jpeg";
import og7 from "@/asset_images/WhatsApp Image 2026-03-16 at 3.46.33 PM (64).jpeg";
import og8 from "@/asset_images/WhatsApp Image 2026-03-16 at 3.46.33 PM (65).jpeg";
import og9 from "@/asset_images/WhatsApp Image 2026-03-16 at 3.46.33 PM (66).jpeg";
import og10 from "@/asset_images/WhatsApp Image 2026-03-16 at 3.46.33 PM (67).jpeg";
import og11 from "@/asset_images/WhatsApp Image 2026-03-16 at 3.46.33 PM (68).jpeg";
import og12 from "@/asset_images/WhatsApp Image 2026-03-16 at 3.46.33 PM (69).jpeg";

export interface RoomData {
  name: string;
  type: string;
  desc: string;
  price: string;
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
}

export const chennaiData: LocationConfig = {
  key: "chennai",
  name: "Chennai",
  fullName: "DrizzleDrop Inn, Chennai",
  tagline: "Sophisticated Business Stay in the OMR IT Corridor",
  heroSlides: [
    { image: chennaiHero1, location: "Chennai", tagline: "Sophisticated Business Stay" },
    { image: chennaiHero2, location: "OMR Corridor", tagline: "Modern Urban Luxury" },
    { image: chennaiHero3, location: "Chennai", tagline: "Premium Hospitality" },
    { image: chennaiHero4, location: "DrizzleDrop", tagline: "Comfort in Every Corner" },
  ],
  about: {
    label: "Metropolitan Elegance",
    title: "Where Business Meets Luxury",
    subtitle:
      "DrizzleDrop Inn Chennai is a sophisticated 3-star business hotel located at Thoriaipakkam on the OMR IT Corridor. Featuring 35 well-furnished rooms with panoramic terrace, rooftop dining, and multi-cuisine delicacies — designed for the modern professional.",
    features: [
      { title: "Prime OMR Location", desc: "Minutes from major IT parks, corporate offices, and Chennai's premier tech corridor." },
      { title: "Rooftop Dining", desc: "Enjoy multi-cuisine dining with panoramic city views from our exclusive rooftop restaurant." },
      { title: "Business Ready", desc: "High-speed WiFi, 24-hour hot water, electricity backup, and secure parking for all guests." },
    ],
  },
  rooms: [
    { name: "Standard Room", type: "Business Comfort", desc: "Well-furnished room ideal for business travelers, featuring smart Google TV and ergonomic workspace.", price: "₹2,999", image: roomStandard, amenities: ["WiFi", "Google TV", "Work Desk", "Toiletries"] },
    { name: "Triple Room", type: "Group Stay", desc: "Perfect for small groups or families, offering comfortable bedding for three with modern amenities.", price: "₹3,999", image: roomTriple, amenities: ["WiFi", "Google TV", "Extra Bed", "Toiletries"] },
    { name: "Family Room", type: "Spacious Retreat", desc: "Large rooms designed for families, featuring multiple beds and extra space to relax.", price: "₹4,999", image: roomFamily, amenities: ["WiFi", "Google TV", "Spacious", "24h Hot Water"] },
    { name: "Deluxe Room", type: "Executive Luxury", desc: "Sophisticated accommodation with upscale furnishings and premium hospitality services.", price: "₹4,499", image: roomDeluxe, amenities: ["WiFi", "Google TV", "Mini Bar", "Laundry"] },
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
    address: "Thoriaipakkam, OMR IT Corridor, Rajiv Gandhi Salai, Chennai – 600097",
    phone: "+91 86678 25086",
    whatsapp: "https://wa.me/918667825086",
    email: "info@drizzledrop.com",
    mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.5847992975273!2d80.22950347411972!3d12.93438611569501!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a525d3e8c850455%3A0xad75b35ac6cfc12!2sDrizzleDrop%20Inn%2CCHENNAI!5e0!3m2!1sen!2sus!4v1773836584953!5m2!1sen!2sus",
  },
  seo: {
    title: "Best Hotel in Chennai | Drizzle Drop Inn – OMR IT Corridor",
    description: "Stay at DrizzleDrop Inn, the best hotel in Chennai on OMR IT Corridor. Enjoy 35 premium rooms, rooftop dining, free parking & WiFi. Book your stay today!",
    keywords: "best hotel in Chennai, hotel in OMR Chennai, business hotel Chennai, DrizzleDrop Inn Chennai, hotel near IT park Chennai, Thoriaipakkam hotel",
    canonical: "https://www.drizzledrop.com/chennai",
    ogImage: chennaiHero1,
  },
  schema: {
    "@context": "https://schema.org",
    "@type": "Hotel",
    "name": "DrizzleDrop Inn Chennai",
    "description": "A sophisticated 3-star business hotel on the OMR IT Corridor in Chennai offering rooftop dining and premium amenities.",
    "url": "https://www.drizzledrop.com/chennai",
    "telephone": "+918667825086",
    "email": "info@drizzledrop.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Rajiv Gandhi Salai, Thoriaipakkam",
      "addressLocality": "Chennai",
      "addressRegion": "Tamil Nadu",
      "postalCode": "600097",
      "addressCountry": "IN"
    },
    "starRating": { "@type": "Rating", "ratingValue": "3" },
    "priceRange": "₹₹"
  },
};

export const ootyData: LocationConfig = {
  key: "ooty",
  name: "Ooty",
  fullName: "DrizzleDrop Inn, Ooty",
  tagline: "Enchanting Hill-Station Escape in the Nilgiris",
  heroSlides: [
    { image: ootyHero1, location: "Ooty", tagline: "Enchanting Nature Escapes" },
    { image: ootyHero2, location: "Nilgiris", tagline: "Where Mist Meets Mountain" },
    { image: ootyHero3, location: "Ooty", tagline: "Private Balcony Hill Views" },
    { image: ootyHero4, location: "DrizzleDrop", tagline: "Serenity in Every Breath" },
  ],
  about: {
    label: "Alpine Serenity",
    title: "Your Mountain Sanctuary Awaits",
    subtitle:
      "DrizzleDrop Inn Ooty is an enchanting hill-station getaway featuring 8 individual apartment-type rooms with private balconies overlooking the Nilgiris. Experience panoramic valley views, the historical toy train, and the whisper of the hills.",
    features: [
      { title: "Panoramic Hill Views", desc: "Each room has a private balcony with breathtaking views of the Nilgiri hills and misty valleys." },
      { title: "Toy Train Route", desc: "Located just 2 km from the UNESCO-listed Nilgiri Mountain Railway station." },
      { title: "Nature Proximity", desc: "2 km from Ooty bus stand and railway station. Tea estates, Rose Garden, and lakes nearby." },
    ],
  },
  rooms: [
    { name: "Standard Room", type: "Alpine Solace", desc: "Individual apartment-type room with private balcony offering excellent panoramic Nilgiri hill views.", price: "₹3,499", image: roomStandard, amenities: ["Balcony", "WiFi", "Google TV", "Scenic View"] },
    { name: "Deluxe Room", type: "Luxury View", desc: "Enchanting hill-view room with premium furnishings and a private balcony to enjoy the Nilgiris.", price: "₹4,999", image: roomDeluxe, amenities: ["Hill View", "Private Balcony", "Heater", "WiFi"] },
    { name: "Triple Room", type: "Cozy Trio", desc: "Mountain retreat for three, perfectly located to view the famous Nilgiris toy train route.", price: "₹4,499", image: roomTriple, amenities: ["Mountain View", "Extra Bed", "Heater", "WiFi"] },
    { name: "Family Room", type: "Grand Vista", desc: "Large hill-station getaway for the whole family with multiple beds and breathtaking valley views.", price: "₹5,999", image: roomFamily, amenities: ["Panoramic View", "Private Balcony", "Spacious", "WiFi"] },
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
    address: "2 KM from Ooty Bus Stand & Railway Station, Nilgiris – 643001",
    phone: "+91 86678 25086",
    whatsapp: "https://wa.me/918667825086",
    email: "ooty@drizzledrop.com",
    mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d39892631.06442901!2d31.07136452959029!3d52.391215641873124!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba8962ea346ed07%3A0xf65c4c81e400f184!2sDrizzleDrop%20Inn!5e0!3m2!1sen!2sus!4v1773834594116!5m2!1sen!2sus",
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
    "telephone": "+918667825086",
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
    "priceRange": "₹₹"
  },
  nearbyAttractions: [
    { name: "Nilgiri mountain Railway", dist: "2.8 KM" },
    { name: "Ooty lake", dist: "3.3 KM" },
    { name: "Ooty Bus stand", dist: "2.3 KM" },
    { name: "Charing cross", dist: "4.0 KM" },
    { name: "Cairn hill", dist: "2.1 KM" },
    { name: "Arboretum", dist: "1.5 KM" },
    { name: "Deer Park", dist: "2.0 KM" },
    { name: "Botanical garden", dist: "4.9 KM" },
    { name: "Rose garden", dist: "4.0 KM" },
    { name: "Pykara Lake", dist: "25 KM" },
    { name: "Tea factory", dist: "7.4 KM" },
    { name: "Dodabetta view point", dist: "11 KM" },
    { name: "Coonoor", dist: "21 KM" },
    { name: "Kotagiri", dist: "31 KM" },
    { name: "Avalanche", dist: "22 KM" },
    { name: "Emarald", dist: "19 KM" },
    { name: "Murugan Temple", dist: "4.5 KM" },
    { name: "Upper Bhavani", dist: "39 KM" },
    { name: "Gudalur", dist: "52 KM" },
    { name: "Mudhumalai", dist: "48 KM" },
    { name: "Pine Forest", dist: "10 KM" },
    { name: "Wax museum", dist: "5.2 KM" },
    { name: "Snow Park", dist: "2.7 KM" },
  ],
};

export const locationMap: Record<string, LocationConfig> = {
  chennai: chennaiData,
  ooty: ootyData,
};
