import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SectionHeading from "@/components/SectionHeading";
import { MapPin, Home, Star, CheckCircle, Heart } from "lucide-react";
import ootyHero from "@/assets/ooty-valley.jpg";

export default function About() {
  const { locationId } = useParams<{ locationId?: string }>();
  const navigate = useNavigate();
  const loc = locationId ? locationId.toLowerCase() : "";

  useEffect(() => {
    if (!loc) return;
    // If location is unknown, redirect to canonical home
    if (!["ooty", "chennai"].includes(loc)) {
      navigate("/", { replace: true });
    }
  }, [loc, navigate]);

  if (!loc) return null;

  const isOoty = loc === "ooty";

  if (!isOoty) {
    // For now show Chennai brief about, or you could redirect to a Chennai-specific page
    return (
      <div className="pt-24">
        <section className="section-padding">
          <div className="container-luxury">
            <SectionHeading label="About Chennai" title="Chennai – The Gateway to South India" subtitle="Vibrant city life with modern comforts and coastal charm" />
            <div className="prose max-w-none text-gray-700 mt-6">
              <p>
                DrizzleDrop Inn Chennai is located in the heart of OMR, offering convenient access to business hubs and local attractions. Modern amenities, warm hospitality and comfortable rooms make it ideal for business and leisure travelers.
              </p>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="relative h-[48vh] md:h-[56vh] w-full overflow-hidden rounded-b-2xl">
        <img src={ootyHero} alt="Ooty Hills" className="w-full h-full object-cover brightness-75" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">About Udhagamandalam (Ooty)</h1>
            <p className="mt-3 text-sm md:text-base opacity-90">Queen of Hill Stations — Paradise on Earth</p>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-luxury grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <SectionHeading label="Discover Ooty" title="Queen of Hill Stations" subtitle="A scenic retreat in the Nilgiris" />

            <div className="mt-6 space-y-6 prose text-gray-700">
              <p>
                Ooty, also known as Udhagamandalam, is famously called the Queen of Hill Stations and Paradise on Earth. Located in the Nilgiris district at an altitude of 2,240 meters, it offers breathtaking landscapes, lush greenery, and serene weather. The name Nilgiris means Blue Mountains. Ooty was a popular summer retreat during the British colonial period and remains one of India's most loved hill stations.
              </p>

              <h3>Your Scenic Retreat in Ooty</h3>
              <p>
                DrizzleDrop Inn offers a peaceful escape surrounded by nature. Designed for relaxation and comfort, it is a perfect destination for travelers seeking tranquility and scenic beauty in the Nilgiris.
              </p>

              <h3>Perfectly Located</h3>
              <p>
                Located just 2 km from Ooty bus stand and railway station, with easy access to major attractions like Rose Garden and Ooty Lake.
              </p>

              <h3>Comfort Meets Nature</h3>
              <p>
                The property features 8 apartment-style hill-view rooms with private balconies, offering panoramic views of the hills and the Nilgiris toy train. Rooms include TV, seating area, modern bathroom, and essential amenities.
              </p>

              <h3>World-Class Comfort</h3>
              <ul className="list-inside list-disc">
                <li>In-house restaurant with à la carte menu</li>
                <li>Barbeque & campfire</li>
                <li>Travel desk & parking</li>
                <li>Basketball & kids play area</li>
                <li>Wi-Fi, 24-hour hot water, power backup</li>
                <li>Laundry & doctor on call</li>
              </ul>

              <h3>A Nature Lover’s Paradise</h3>
              <p>
                Perfect for plant lovers and bird watchers, offering an immersive nature experience with exceptional hospitality.
              </p>

              <h3>Safety & Hygiene First</h3>
              <p>
                Strict cleaning, sanitization, and safety protocols are followed to ensure a safe stay.
              </p>

              <div className="mt-6">
                <button
                  onClick={() => { window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }); }}
                  className="px-6 py-3 bg-green-700 hover:bg-green-800 text-white rounded-md font-semibold transition"
                >
                  Book Your Stay
                </button>
              </div>
            </div>
          </div>

          <aside className="space-y-4">
            <div className="p-4 rounded-lg bg-white shadow">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-green-700" />
                <div>
                  <div className="text-sm font-semibold">Location</div>
                  <div className="text-xs text-gray-500">Fern Hill, Ooty</div>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white shadow">
              <div className="flex items-center gap-3">
                <Home className="w-5 h-5 text-green-700" />
                <div>
                  <div className="text-sm font-semibold">Rooms</div>
                  <div className="text-xs text-gray-500">8 Hill-view rooms with balconies</div>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white shadow">
              <div className="flex items-center gap-3">
                <Star className="w-5 h-5 text-green-700" />
                <div>
                  <div className="text-sm font-semibold">Highlights</div>
                  <div className="text-xs text-gray-500">Scenic views, Nature walks, Bonfire</div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
