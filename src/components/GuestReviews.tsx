import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";

interface Review {
  author: string;
  text: string;
  location: string;
  rating: number;
  property: "CHENNAI" | "OOTY";
}

const ALL_REVIEWS: Review[] = [
  // CHENNAI REVIEWS
  {
    author: "Akshita Jha",
    text: "The hospitality was truly exceptional. The staff were warm, attentive, and incredibly prompt in their service making my stay very peaceful. The location is very convenient, especially for those visiting the Sholinganallur IT Park.",
    location: "Business Traveler",
    rating: 5,
    property: "CHENNAI",
  },
  {
    author: "Joru Miah",
    text: "My stay at Drizzle Drop Inn was nothing short of exceptional. Greeted with a level of warmth and professionalism that reflects premium hospitality. The property is beautifully maintained, offering a perfect blend of comfort and elegance.",
    location: "Business Guest",
    rating: 5,
    property: "CHENNAI",
  },
  {
    author: "Gokulnath Nagarajan",
    text: "Excellent Business Hotel – Perfect for Work and Rest. I was thoroughly impressed by the level of service, comfort, and convenience. Strong Wi-Fi, comfortable work desk, and a very quiet atmosphere for focus.",
    location: "Business Hub",
    rating: 5,
    property: "CHENNAI",
  },
  {
    author: "sathishsarat",
    text: "In Jan 2026, we had booked several rooms to host our wedding guests. The rooms and bath rooms were clean, the staff were helpful and cooperative. The guests were happy with the rooms. All in all a good experience.",
    location: "Wedding Host",
    rating: 5,
    property: "CHENNAI",
  },
  {
    author: "Harishmaa Shree",
    text: "Nice Experience. Rooms are well cleaned very good ambience. Reception Staffs so kind and very helpful organised Hospitality. Near to ECR Beach. Fabulous Stay.",
    location: "Family Vacation",
    rating: 5,
    property: "CHENNAI",
  },
  {
    author: "Prakash Shanmugam",
    text: "Excellent and budget friendly hotel for all kind of travellers. Rooms are so clean and neat. Dedicated and covered Car parking available. Highly recommended for a decent and peaceful stay.",
    location: "Vacation",
    rating: 5,
    property: "CHENNAI",
  },
  {
    author: "Dr.Andrea Elangovan",
    text: "This hotel was excellent! The check-in process was smooth, the room was spotless and comfortable, overall atmosphere was relaxing. I'd definitely stay here again.😇",
    location: "Verified Guest",
    rating: 5,
    property: "CHENNAI",
  },
  {
    author: "Nur Q",
    text: "Amazing experience as a first timer visiting Chennai. Affordable, amazingly clean and rooms amenities are complete. Friendly and approachable staff made my stay feeling so comfortable.",
    location: "International Guest",
    rating: 5,
    property: "CHENNAI",
  },
  {
    author: "Sivashankar",
    text: "Room is maintained neat and clean, the breakfast was very nice and staff were very kind thank you. Perfect stay for families.",
    location: "City Traveler",
    rating: 5,
    property: "CHENNAI",
  },
  {
    author: "Anand K",
    text: "I liked the stay here. Very comfortable stay, geniune service and good food. Perfect for a peaceful city stay.",
    location: "Business Stay",
    rating: 5,
    property: "CHENNAI",
  },
  {
    author: "Mohan Raj",
    text: "Rooms are neat and comfortable for the price. The hotel feels safe and peaceful throughout the stay. Great value for money.",
    location: "Solo Traveler",
    rating: 5,
    property: "CHENNAI",
  },
  {
    author: "rageshkaroth",
    text: "Good stay. Mr. Prabu support and guide in checkin and the room was great. Highly efficient and helpful.",
    location: "Business Traveler",
    rating: 5,
    property: "CHENNAI",
  },

  // OOTY REVIEWS
  {
    author: "Vijetha Sisters",
    text: "Superb view in that location. The hotel is very good and people are so nice and humble. They served good and hot food for all. Safe place for families and to enjoy Ooty trip.",
    location: "Family Vacation",
    rating: 5,
    property: "OOTY",
  },
  {
    author: "s.anseerudin anser",
    text: "Cozy, Charming, and Memorable Stay! Peaceful, cozy, and perfect for unwinding. Surrounding environment with misty mornings and a cup of coffee was pure bliss.",
    location: "Couple Stay",
    rating: 5,
    property: "OOTY",
  },
  {
    author: "Ajay Aj",
    text: "Very friendly & polite staff. Easy to locate with safe parking. Very neat & tidy rooms with clean toilets. Kitchen facility was also available for my big family. Best deal in Ooty.",
    location: "Family Trip",
    rating: 5,
    property: "OOTY",
  },
  {
    author: "Lakshya",
    text: "Pleasantly surprised by the renovations! Fresh and modern rooms with stunning balcony views. Waking up to the misty hills and greenery was the highlight of my trip.",
    location: "Hillside Retreat",
    rating: 5,
    property: "OOTY",
  },
  {
    author: "Salim Shyam",
    text: "If you are ready to stay away from the hustle of the town then it'll be the best option you can ever get in Ooty. Peaceful ambiance and they provide all basic necessities.",
    location: "Quiet Stay",
    rating: 5,
    property: "OOTY",
  },
  {
    author: "Amaajit Ghoshal",
    text: "A great place to stay in Ooty. Rooms were very neat and clean. Though food options were limited, it's delicious and very tasty (Specially Pepper Chicken).",
    location: "Gourmet Traveler",
    rating: 5,
    property: "OOTY",
  },
  {
    author: "Boston Madurai",
    text: "Its pleasant to stay. Arrived late after a long trip and they were so helpful with dinner arrangements. Highly recommended budget hotel in Ooty.",
    location: "Verified Guest",
    rating: 5,
    property: "OOTY",
  },
  {
    author: "Keerthi Bushan",
    text: "Good location and very budget friendly. Staff was friendly and the hospitality was good. Restaurant also have good food with cheap prices.",
    location: "Budget Traveler",
    rating: 5,
    property: "OOTY",
  },
  {
    author: "Sampath Prabhu",
    text: "Rooms and restrooms were clean. Staffs were friendly. Complimentary breakfast was very tasty. Ambience was peaceful and chill.",
    location: "Family Group",
    rating: 5,
    property: "OOTY",
  },
  {
    author: "Khaleel Gaffar",
    text: "Decent hotel with family rooms (4 beds per room). Nice soft idlies in complimentary breakfast and good views. Great value for a group stay.",
    location: "Group Trip",
    rating: 5,
    property: "OOTY",
  },
  {
    author: "Xavi",
    text: "Food was delicious, eat like a king here. Travel desk was very helpful to reach all places as we expected. Feels like a 2nd home.",
    location: "City Tour",
    rating: 5,
    property: "OOTY",
  },
  {
    author: "Deepa Shedi",
    text: "The stay was very cosy. We had good views from rooms and overall a very good experience with the hospitality.",
    location: "Cozy Stay",
    rating: 5,
    property: "OOTY",
  },
  {
    author: "Mohammad Shameer",
    text: "Stay was excellent, food was good. Trustworthy and great value for money. Highly recommended for a stay in Ooty.",
    location: "Ooty Traveler",
    rating: 5,
    property: "OOTY",
  },
  {
    author: "Dhananjayan T K",
    text: "Stayed in family room. The hotel was under construction during our visit. Budget stay but service was limited.",
    location: "Friends Trip",
    rating: 2,
    property: "OOTY",
  },
  {
    author: "imhari anand",
    text: "All good enjoyed, specially food 100/100. Management is absolutely friendly. This is my third visit to drizzle drop inn❤️",
    location: "Repeat Guest",
    rating: 5,
    property: "OOTY",
  }
];

interface GuestReviewsProps {
  property?: "CHENNAI" | "OOTY" | "ALL";
}

export default function GuestReviews({ property = "ALL" }: GuestReviewsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);
  const [isAnimating, setIsAnimating] = useState(false);

  const filteredReviews = React.useMemo(() => {
    if (property === "ALL") return ALL_REVIEWS;
    return ALL_REVIEWS.filter((r) => r.property === property);
  }, [property]);

  // Create infinite set by appending clones to the end
  const displayReviews = React.useMemo(() => {
    return [...filteredReviews, ...filteredReviews.slice(0, 3)];
  }, [filteredReviews]);

  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth < 768) setItemsPerView(1);
      else if (window.innerWidth < 1024) setItemsPerView(2);
      else setItemsPerView(4);
    };
    updateItemsPerView();
    window.addEventListener("resize", updateItemsPerView);
    return () => window.removeEventListener("resize", updateItemsPerView);
  }, []);

  const totalPages = Math.ceil(filteredReviews.length / itemsPerView);

  const nextSlide = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => prev + 1);
  }, [isAnimating]);

  const prevSlide = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev <= 0 ? totalPages - 1 : prev - 1));
  }, [isAnimating, totalPages]);

  // Handle jump back to start for seamless loop
  useEffect(() => {
    if (currentIndex >= totalPages) {
      const timer = setTimeout(() => {
        setIsAnimating(false);
        setCurrentIndex(0);
      }, 500); // Match transition duration
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => setIsAnimating(false), 500);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, totalPages]);

  const title = property === "CHENNAI"
    ? "Loved by Chennai Guests"
    : property === "OOTY"
      ? "Magical Moments in Ooty"
      : "Voices of Satisfaction";

  return (
    <section className="py-24 bg-white relative overflow-hidden">

      <div className="container-luxury relative z-10">
        <div className="text-center mb-16 px-4">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[11px] uppercase tracking-widest text-[#3a7d5a] font-bold mb-4 block"
          >
            GUEST REVIEWS
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold tracking-tight text-[#2E6B8A] mx-auto max-w-3xl leading-tight font-display"
          >
            {title}
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="w-24 h-0.5 bg-[#C5A861] mx-auto mt-6"
          />
        </div>

        <div className="relative px-4 md:px-20">
          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow-lg border border-[#2E6B8A]/5 flex items-center justify-center hover:bg-[#2E6B8A] hover:text-white transition-all duration-500 z-30 group"
            aria-label="Previous reviews"
          >
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow-lg border border-[#2E6B8A]/5 flex items-center justify-center hover:bg-[#2E6B8A] hover:text-white transition-all duration-500 z-30 group"
            aria-label="Next reviews"
          >
            <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
          </button>

          <div className="overflow-hidden">
            <motion.div
              className="flex"
              animate={{ x: `-${currentIndex * 100}%` }}
              transition={currentIndex === 0 && !isAnimating ? { duration: 0 } : { type: "spring", damping: 35, stiffness: 80 }}
            >
              {displayReviews.map((review, idx) => (
                <div
                  key={idx}
                  className="w-full md:w-1/2 lg:w-1/4 flex-shrink-0 px-3 py-6"
                >
                  <div className="h-full bg-white p-8 border border-border/60 hover:border-border transition-colors duration-300 flex flex-col">
                    <div className="flex gap-1 mb-6">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-[#C5A861] text-[#C5A861]" />
                      ))}
                    </div>

                    <div className="flex-grow">
                      <p className="text-[15px] text-[#2E6B8A]/80 leading-relaxed mb-8 italic">
                        "{review.text}"
                      </p>
                    </div>

                    <div className="mt-auto">
                      <h4 className="font-bold text-[11px] text-gray-500 uppercase tracking-widest">
                        {review.author}
                      </h4>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          <div className="flex justify-center gap-3 mt-16">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`h-1.5 rounded-full transition-all duration-700 ${currentIndex % totalPages === i ? "bg-[#2E6B8A] w-12" : "bg-[#2E6B8A]/10 w-4 hover:bg-[#2E6B8A]/30"}`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
