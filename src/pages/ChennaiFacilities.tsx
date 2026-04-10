import React from "react";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import { Wifi, Bed, Clock, Utensils, Car, Map, Shirt, Users, Leaf } from "lucide-react";

const FACILITIES = [
  {
    icon: Bed,
    title: "Comfortable Rooms",
    desc: "Well-furnished rooms with modern amenities, cozy bedding, and scenic views of the surrounding landscape.",
  },
  {
    icon: Wifi,
    title: "Free Wi-Fi",
    desc: "Connectivity for guests to stay connected during their stay.",
  },
  {
    icon: Clock,
    title: "24/7 Room Service",
    desc: "Assistance and service available around the clock.",
  },
  {
    icon: Utensils,
    title: "Restaurant & Dining",
    desc: "On-site dining options serving local and international cuisines.",
  },
  {
    icon: Car,
    title: "Parking Facilities",
    desc: "Ample parking space for guests with vehicles.",
  },
  {
    icon: Map,
    title: "Travel Assistance",
    desc: "Help with local sightseeing arrangements and transportation.",
  },
  {
    icon: Shirt,
    title: "Laundry Services",
    desc: "Convenient laundry facilities for guests.",
  },
  {
    icon: Users,
    title: "Cozy Common Areas",
    desc: "Lounge or common spaces for relaxation and socializing.",
  },
  {
    icon: Leaf,
    title: "Beautiful Gardens or Outdoor Spaces",
    desc: "Scenic outdoor areas to enjoy the fresh air.",
  },
];

export default function ChennaiFacilities() {
  return (
    <section className="section-padding bg-background min-h-screen">
      <div className="container-luxury">
        <SectionHeading
          title="Our Facilities at Drizzledrop Inn Chennai"
          subtitle="Premium amenities and comforts for a memorable stay in Chennai."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {FACILITIES.map((f, i) => (
            <Reveal key={f.title} delay={0.1 * i}>
              <div className="group bg-white rounded-2xl border border-border/30 p-7 flex flex-col items-start h-full hover:shadow-xl transition-shadow duration-300">
                <div className="w-12 h-12 rounded-full flex items-center justify-center mb-5 bg-[#2E6B8A] bg-opacity-10">
                  <f.icon className="w-7 h-7 text-[#2E6B8A]" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-foreground">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
