require("dotenv").config();
const mongoose = require("mongoose");
const Room = require("./models/Room");

const rooms = [
  // Chennai Rooms
  {
    name: "Standard Room",
    location: "CHENNAI",
    type: "Business Comfort",
    desc: "Well-furnished room ideal for business travelers, featuring smart Google TV and ergonomic work space.",
    epPrice: "₹2,450",
    cpPrice: "₹2,650",
    image: "/uploads/rooms/chennai-std.webp", // Placeholder path, admin can update
    amenities: ["WiFi", "Google TV", "Work Desk", "Toiletries"],
    order: 1
  },
  {
    name: "Deluxe Room",
    location: "CHENNAI",
    type: "Executive Luxury",
    desc: "Sophisticated accommodation with upscale furnishings and premium hospitality.",
    epPrice: "₹2,800",
    cpPrice: "₹3,000",
    image: "/uploads/rooms/chennai-deluxe.webp",
    amenities: ["WiFi", "Google TV", "Mini Bar", "Laundry"],
    order: 2
  },
  {
    name: "Triple Room",
    location: "CHENNAI",
    type: "Group Stay",
    desc: "Perfect for small groups or families, offering comfortable bedding for three with modern amenities.",
    epPrice: "₹3,200",
    cpPrice: "₹3,500",
    image: "/uploads/rooms/chennai-triple.webp",
    amenities: ["WiFi", "Google TV", "Extra Bed", "Toiletries"],
    order: 3
  },
  {
    name: "Family Room",
    location: "CHENNAI",
    type: "Spacious Retreat",
    desc: "Large rooms designed for families, featuring multiple beds and extra space to relax.",
    epPrice: "₹3,700",
    cpPrice: "₹4,100",
    image: "/uploads/rooms/chennai-family.webp",
    amenities: ["WiFi", "Google TV", "Spacious", "24h Hot Water"],
    order: 4
  },
  // Ooty Rooms
  {
    name: "Standard Room",
    location: "OOTY",
    type: "Alpine Solace",
    desc: "Individual apartment-type room with private balcony offering excellent panoramic hill views.",
    epPrice: "₹2,450",
    cpPrice: "₹2,650",
    image: "/uploads/rooms/ooty-std.webp",
    amenities: ["Balcony", "WiFi", "Google TV", "Scenic View"],
    order: 1
  },
  {
    name: "Deluxe Room",
    location: "OOTY",
    type: "Luxury View",
    desc: "Enchanting hill-view room with premium furnishings and a private balcony to enjoy the Nilgiris.",
    epPrice: "₹2,800",
    cpPrice: "₹3,000",
    image: "/uploads/rooms/ooty-deluxe.webp",
    amenities: ["Hill View", "Private Balcony", "Heater", "WiFi"],
    order: 2
  },
  {
    name: "Family Room",
    location: "OOTY",
    type: "Grand Vista",
    desc: "Large hill-station getaway for the whole family, featuring multiple beds and breathtaking views.",
    epPrice: "₹3,700",
    cpPrice: "₹4,100",
    image: "/uploads/rooms/ooty-family.webp",
    amenities: ["Panoramic View", "Private Balcony", "Spacious", "WiFi"],
    order: 3
  },
  {
    name: "Double Bed Room Villa",
    location: "OOTY",
    type: "Spacious Luxury",
    desc: "Luxurious two-bedroom villa offering ultimate privacy, a spacious private balcony, and premium amenities with panoramic Nilgiri views.",
    epPrice: "₹3,200",
    cpPrice: "₹3,500",
    image: "/uploads/rooms/ooty-triple.webp",
    amenities: ["Mountain View", "Private Balcony", "Heater", "WiFi"],
    order: 4
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB...");

    await Room.deleteMany({});
    console.log("Old rooms deleted.");

    await Room.insertMany(rooms);
    console.log("Initial rooms seeded successfully!");

    process.exit();
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDB();
