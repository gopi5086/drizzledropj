const mongoose = require("mongoose");
const FAQ = require("./models/FAQ");
require("dotenv").config();

const faqs = [
  {
    question: "What check-in and check-out times do you have?",
    answer: "Check-in time is from 12:00 PM onwards, and check-out is until 11:00 AM. Please contact us in advance if you need early check-in or late check-out.",
    location: "GENERAL",
    order: 1
  },
  {
    question: "Do you offer free Wi-Fi?",
    answer: "Yes, complimentary Wi-Fi is available throughout the Hotel for all guests.",
    location: "GENERAL",
    order: 2
  },
  {
    question: "Is breakfast included in the room rate?",
    answer: "Breakfast options vary by booking. Some rates include breakfast, while others do not. Please check your reservation details or contact us for clarification.",
    location: "GENERAL",
    order: 3
  },
  {
    question: "Do you have parking facilities available?",
    answer: "Yes, we offer free on-site parking for all our guests.",
    location: "GENERAL",
    order: 4
  },
  {
    question: "Are pets allowed at the lodge?",
    answer: "No, Pets are not allowed as per our Hotel Policy.",
    location: "GENERAL",
    order: 5
  },
  {
    question: "Do you offer airport transportation or shuttle services?",
    answer: "Yes, we offer airport shuttle services for an additional fee. Please book in advance to ensure availability.",
    location: "GENERAL",
    order: 6
  },
  {
    question: "What amenities are available at the Hotel?",
    answer: "Our Hotel features a Roof Top Restaurant, High Power Generator, Separate Smoking Area, free Wi-Fi and parking. Some amenities may vary by room type.",
    location: "GENERAL",
    order: 7
  },
  {
    question: "Is there a fitness center?",
    answer: "Currently, we do not have a fitness center. However, we offer fitness center services in near future.",
    location: "GENERAL",
    order: 8
  },
  {
    question: "How can I make a reservation?",
    answer: "You can reserve a room through our website www.drizzledropinn.com, by calling our front desk +91 97911 78349, or via email stay@drizzledropinn.com. We recommend booking in advance to secure your preferred dates.",
    location: "GENERAL",
    order: 9
  },
  {
    question: "What is your cancellation policy?",
    answer: "Cancellations made at least 72 hours before check-in will receive a full refund. Cancellations within 72 hours may be subject to a fee. Please see our detailed policy during booking.",
    location: "GENERAL",
    order: 10
  },
  {
    question: "Are there any special packages or offers?",
    answer: "Yes, we offer seasonal packages and group discounts. Please check our website or contact us for current promotions.",
    location: "GENERAL",
    order: 11
  },
  {
    question: "Do you provide room service?",
    answer: "Yes, room service is available during specified hours. Please refer to our menu or ask at the front desk.",
    location: "GENERAL",
    order: 12
  },
  {
    question: "Is smoking allowed in the rooms?",
    answer: "No, our rooms are smoke-free. Smoking is only permitted in designated outdoor areas.",
    location: "GENERAL",
    order: 13
  },
  {
    question: "Are there family or group discounts?",
    answer: "Yes, we offer discounts for families and groups. Contact us in advance for special arrangements.",
    location: "GENERAL",
    order: 14
  },
  {
    question: "How close is the lodge to local attractions?",
    answer: "We are located near several popular attractions, just a short drive away. Ask our staff for recommendations and directions.",
    location: "GENERAL",
    order: 15
  },
  {
    question: "What safety measures are in place at the lodge?",
    answer: "We follow all health and safety guidelines, CCTV Camera, including regular sanitation, contactless check-in, and emergency procedures.",
    location: "GENERAL",
    order: 16
  },
  {
    question: "Can I request a specific room or view?",
    answer: "Requests can be made during booking, but we cannot guarantee specific rooms. We will do our best to accommodate your preferences.",
    location: "GENERAL",
    order: 17
  },
  {
    question: "Do you have accessible rooms for guests with disabilities?",
    answer: "Yes, we have accessible rooms and facilities. Please inform us in advance so we can assist you accordingly.",
    location: "GENERAL",
    order: 18
  },
  {
    question: "What should I do if I need to extend my stay?",
    answer: "Please contact the front desk as soon as possible to check availability and arrange an extension.",
    location: "GENERAL",
    order: 19
  },
  {
    question: "How do I contact the front desk?",
    answer: "You can reach the front desk by dialing 9 from your room phone or calling our main number listed on your reservation confirmation.",
    location: "GENERAL",
    order: 20
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB...");
    
    // Clear existing FAQs to replace them with the new set
    await FAQ.deleteMany({});
    console.log("Cleared existing FAQs.");

    await FAQ.insertMany(faqs);
    console.log("Seeded FAQs successfully!");
    
    mongoose.connection.close();
  } catch (err) {
    console.error("Error seeding FAQs:", err);
    process.exit(1);
  }
};

seedDB();
