import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { DateRange } from "react-day-picker";
import { CalendarIcon, MapPin, Users, Minus, Plus, Crown } from "lucide-react";
import NavbarBookingModal from "./NavbarBookingModal";
import { cn } from "@/lib/utils";
import { useLocationContext } from "@/context/LocationContext";

// Brand colours from DrizzleDrop logo
const TEAL = "#2E6B8A";
const DARK_TEAL = "#1a4d66";

export interface BookingData {
    location: string;
    checkIn: Date | undefined;
    checkOut: Date | undefined;
    adults: number;
    children: number;
    rooms: number;
    roomType?: string;
    offerCode?: string;
}

const BookingBar = React.memo(function BookingBar() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [date, setDate] = useState<DateRange | undefined>({
        from: new Date(),
        to: new Date(new Date().setDate(new Date().getDate() + 1)),
    });
    const [location, setLocation] = useState("DrizzleDrop Inn, Chennai");
    const [adults, setAdults] = useState(1);
    const [children, setChildren] = useState(0);
    const [rooms, setRooms] = useState(1);
    const [offerCode, setOfferCode] = useState("");
    const [isMobile, setIsMobile] = useState(typeof window !== "undefined" ? window.innerWidth < 1024 : false);
    const { currentLocation } = useLocationContext();

    useEffect(() => {
        if (currentLocation === "ooty") setLocation("DrizzleDrop Inn, Ooty");
        else if (currentLocation === "chennai") setLocation("DrizzleDrop Inn, Chennai");
    }, [currentLocation]);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 1024);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const totalGuests = adults + children;

    const bookingData: BookingData = {
        location,
        checkIn: date?.from,
        checkOut: date?.to,
        adults,
        children,
        rooms,
        offerCode,
    };

    return (
        <div className="w-full max-w-6xl mx-auto px-4 z-40 relative">

            {/* ── Booking Card ─────────────────────────────────────────────── */}
            <div
                className="bg-white rounded-2xl shadow-2xl overflow-hidden"
                style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.18), 0 4px 16px rgba(46,107,138,0.12)" }}
            >
                {/* Top accent bar */}
                <div
                    className="h-1 w-full bg-[#2E6B8A]"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:flex lg:flex-row items-stretch">
                    {/* ── Location ─────────────────────────────────────────── */}
                    <div className="flex-1 border-b md:border-r lg:border-b-0 border-gray-100 hover:bg-slate-50/80 transition-colors">
                        <Select value={location} onValueChange={setLocation}>
                            <SelectTrigger className="w-full h-full border-none shadow-none focus:ring-0 bg-transparent rounded-none px-5 py-4">
                                <div className="flex items-center gap-3 w-full">
                                    <div
                                        className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                                        style={{ backgroundColor: `${TEAL}15` }}
                                    >
                                        <MapPin className="w-4 h-4" style={{ color: TEAL }} />
                                    </div>
                                    <div className="flex flex-col items-start min-w-0">
                                        <span
                                            className="text-[9px] uppercase tracking-[0.18em] font-bold mb-0.5"
                                            style={{ color: TEAL }}
                                        >
                                            Location
                                        </span>
                                        <SelectValue placeholder="Select Location" />
                                    </div>
                                </div>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="DrizzleDrop Inn, Chennai">DrizzleDrop Inn, Chennai</SelectItem>
                                <SelectItem value="DrizzleDrop Inn, Ooty">DrizzleDrop Inn, Ooty</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* ── Check In – Out ────────────────────────────────────── */}
                    <div className="flex-[1.4] border-b md:border-b-0 lg:border-b-0 lg:border-r border-gray-100 hover:bg-slate-50/80 transition-colors">
                        <Popover>
                            <PopoverTrigger asChild>
                                <button
                                    className={cn(
                                        "w-full h-full px-5 py-4 flex items-center gap-3 text-left",
                                        !date && "text-muted-foreground"
                                    )}
                                >
                                    <div
                                        className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                                        style={{ backgroundColor: `${TEAL}15` }}
                                    >
                                        <CalendarIcon className="w-4 h-4" style={{ color: TEAL }} />
                                    </div>
                                    <div className="flex flex-col items-start min-w-0 overflow-hidden">
                                        <span
                                            className="text-[9px] uppercase tracking-[0.18em] font-bold mb-0.5"
                                            style={{ color: TEAL }}
                                        >
                                            Check In – Out
                                        </span>
                                        <span className="text-sm font-medium text-gray-800 truncate">
                                            {date?.from ? (
                                                date.to
                                                    ? <>{format(date.from, "dd MMM")} — {format(date.to, "dd MMM yyyy")}</>
                                                    : format(date.from, "dd MMM yyyy")
                                            ) : (
                                                <span className="text-gray-400">Select Dates</span>
                                            )}
                                        </span>
                                    </div>
                                </button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0 rounded-xl shadow-2xl border-0" align="start">
                                <Calendar
                                    initialFocus
                                    mode="range"
                                    defaultMonth={date?.from}
                                    selected={date}
                                    onSelect={setDate}
                                    numberOfMonths={isMobile ? 1 : 2}
                                    disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                                    className="bg-white rounded-xl"
                                />
                            </PopoverContent>
                        </Popover>
                    </div>

                    {/* ── Guests & Rooms ────────────────────────────────────── */}
                    <div className="flex-1 border-b md:border-r lg:border-b-0 border-gray-100 hover:bg-slate-50/80 transition-colors">
                        <Popover>
                            <PopoverTrigger asChild>
                                <button className="w-full h-full px-5 py-4 flex items-center gap-3 text-left">
                                    <div
                                        className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                                        style={{ backgroundColor: `${TEAL}15` }}
                                    >
                                        <Users className="w-4 h-4" style={{ color: TEAL }} />
                                    </div>
                                    <div className="flex flex-col items-start min-w-0">
                                        <span
                                            className="text-[9px] uppercase tracking-[0.18em] font-bold mb-0.5"
                                            style={{ color: TEAL }}
                                        >
                                            Guests & Rooms
                                        </span>
                                        <span className="text-sm font-medium text-gray-800">
                                            {totalGuests} Guest{totalGuests !== 1 && "s"}, {rooms} Room{rooms !== 1 && "s"}
                                        </span>
                                    </div>
                                </button>
                            </PopoverTrigger>
                            <PopoverContent className="w-80 p-5 rounded-xl shadow-2xl border border-gray-100" align="start">
                                <div className="space-y-5">
                                    {[
                                        { label: "Adults", sub: "Ages 13 or above", val: adults, min: 1, set: setAdults },
                                        { label: "Children", sub: "Ages 0–12", val: children, min: 0, set: setChildren },
                                        { label: "Rooms", sub: "", val: rooms, min: 1, set: setRooms },
                                    ].map(({ label, sub, val, min, set }) => (
                                        <div key={label} className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm font-semibold text-gray-800">{label}</p>
                                                {sub && <p className="text-xs text-gray-400 mt-0.5">{sub}</p>}
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <button
                                                    onClick={() => set(Math.max(min, val - 1))}
                                                    disabled={val <= min}
                                                    className="w-8 h-8 rounded-full border-2 border-gray-200 flex items-center justify-center hover:border-[#2E6B8A] hover:text-[#2E6B8A] disabled:opacity-30 transition-all"
                                                >
                                                    <Minus className="w-3 h-3" />
                                                </button>
                                                <span className="w-5 text-center text-sm font-bold text-gray-800">{val}</span>
                                                <button
                                                    onClick={() => set(val + 1)}
                                                    className="w-8 h-8 rounded-full border-2 border-gray-200 flex items-center justify-center hover:border-[#2E6B8A] hover:text-[#2E6B8A] transition-all"
                                                >
                                                    <Plus className="w-3 h-3" />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </PopoverContent>
                        </Popover>
                    </div>

                    {/* ── Offer Code ────────────────────────────────────────── */}
                    <div className="flex-1 border-b md:border-b-0 lg:border-b-0 lg:border-r border-gray-100 hover:bg-slate-50/80 transition-colors">
                        <div className="w-full h-full px-5 py-4 flex items-center gap-3">
                            <div
                                className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                                style={{ backgroundColor: `${TEAL}15` }}
                            >
                                <Crown className="w-4 h-4" style={{ color: TEAL }} />
                            </div>
                            <div className="flex flex-col items-start min-w-0 w-full">
                                <span
                                    className="text-[9px] uppercase tracking-[0.18em] font-bold mb-0.5"
                                    style={{ color: TEAL }}
                                >
                                    Offer Code
                                </span>
                                <input
                                    type="text"
                                    placeholder="Enter Code"
                                    value={offerCode}
                                    onChange={(e) => setOfferCode(e.target.value)}
                                    className="w-full bg-transparent border-none p-0 text-sm font-medium text-gray-800 focus:outline-none focus:ring-0 placeholder:text-gray-400"
                                />
                            </div>
                        </div>
                    </div>

                    {/* ── Book Now Button ───────────────────────────────────── */}
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="w-full md:col-span-2 lg:w-auto px-10 py-5 font-bold tracking-[0.15em] text-sm uppercase text-white transition-all duration-300 flex-shrink-0 group relative overflow-hidden"
                        style={{ background: `linear-gradient(135deg, ${TEAL} 0%, ${DARK_TEAL} 100%)` }}
                    >
                        {/* Hover shimmer */}
                        <span className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-300" />
                        <span className="relative">CHECK AVAILABILITY</span>
                    </button>
                </div>
            </div>

            <NavbarBookingModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                bookingData={bookingData}
            />
        </div>
    );
});

export default BookingBar;
