import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format } from "date-fns";
import { CheckCircle2, CalendarIcon, Users, MapPin, ArrowRight, ArrowLeft } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";

export interface BookingData {
    location: string;
    checkIn: Date | undefined;
    checkOut: Date | undefined;
    adults: number;
    children: number;
    rooms: number;
    roomType?: string;
}

interface NavbarBookingModalProps {
    isOpen: boolean;
    onClose: () => void;
    bookingData?: BookingData;
}

export default function NavbarBookingModal({ isOpen, onClose, bookingData }: NavbarBookingModalProps) {
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    // Step 1 State
    const [location, setLocation] = useState("DrizzleDrop Inn, Chennai");
    const [date, setDate] = useState<DateRange | undefined>({
        from: new Date(),
        to: new Date(new Date().setDate(new Date().getDate() + 1)),
    });
    const [adults, setAdults] = useState(2);
    const [children, setChildren] = useState(0);
    const [rooms, setRooms] = useState(1);

    // Step 2 State
    const [guestDetails, setGuestDetails] = useState({
        name: "",
        phone: "",
        email: "",
        roomType: "Deluxe Room"
    });

    // Reset or sync state when modal opens
    useEffect(() => {
        if (isOpen) {
            setSuccess(false);
            setError("");
            
            if (bookingData) {
                // If we have substantial data (from the rectangle bar), jump to Step 2
                if (bookingData.location && bookingData.checkIn) {
                    setStep(2);
                } else {
                    setStep(1);
                }
                
                // Sync data regardless
                setLocation(bookingData.location || "DrizzleDrop Inn, Chennai");
                setDate({
                    from: bookingData.checkIn || new Date(),
                    to: bookingData.checkOut || new Date(new Date().setDate(new Date().getDate() + 1))
                });
                setAdults(bookingData.adults || 2);
                setChildren(bookingData.children || 0);
                setRooms(bookingData.rooms || 1);
                if (bookingData.roomType) {
                    setGuestDetails(prev => ({ ...prev, roomType: bookingData.roomType! }));
                }
            } else {
                setStep(1);
            }
        }
    }, [isOpen, bookingData]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const templateParams = {
                access_key: "868bd7f9-4108-4342-bf38-75a5dd580e00", 
                subject: `Navbar Booking Request from ${guestDetails.name}`,
                from_name: "DrizzleDrop Booking System",
                Name: guestDetails.name,
                Phone: guestDetails.phone,
                Email: guestDetails.email,
                Location: location,
                Room: guestDetails.roomType,
                Guests: `${adults} Adults, ${children} Children (${rooms} Rooms)`,
                Dates: `${date?.from ? format(date.from, "PPP") : "Not Set"} to ${date?.to ? format(date.to, "PPP") : "Not Set"}`,
            };

            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(templateParams)
            });

            const result = await response.json();
            if (response.ok && result.success) {
                setSuccess(true);
            } else {
                throw new Error(result.message || "Submission failed");
            }
        } catch (err: any) {
            console.error("Booking Error:", err);
            setError(err?.message || `Failed to submit request. Please check your connection.`);
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        setStep(1);
        setSuccess(false);
        setError("");
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-[425px] md:max-w-[550px] border-border/50 glass-card p-0 overflow-hidden shadow-2xl">
                {success ? (
                    <div className="p-8 text-center flex flex-col items-center justify-center space-y-4">
                        <CheckCircle2 className="w-16 h-16 text-primary animate-bounce" />
                        <DialogTitle className="text-2xl font-serif">Booking Request Sent</DialogTitle>
                        <DialogDescription className="text-base">
                            Thank you! Your request for {location} has been received. Our team will contact you at {guestDetails.phone} shortly.
                        </DialogDescription>
                        <Button onClick={handleClose} className="mt-4 w-full bg-primary text-primary-foreground hover:bg-primary/90">
                            Done
                        </Button>
                    </div>
                ) : (
                    <>
                        <div className="h-1.5 w-full bg-gray-100">
                           <div 
                              className="h-full bg-primary transition-all duration-500" 
                              style={{ width: step === 1 ? '50%' : '100%' }}
                           />
                        </div>

                        <DialogHeader className="p-6 pb-2">
                            <DialogTitle className="text-2xl font-serif text-primary">
                                {step === 1 ? "Plan Your Stay" : "Finalize Booking"}
                            </DialogTitle>
                            <DialogDescription>
                                {step === 1 ? "Where and when would you like to visit us?" : "Almost there! We just need your contact details."}
                            </DialogDescription>
                        </DialogHeader>

                        <div className="p-6 pt-0">
                            {step === 1 ? (
                                <div className="space-y-5">
                                    {/* Location Select */}
                                    <div className="space-y-2">
                                        <Label className="text-xs uppercase tracking-widest font-bold text-gray-500">Select Location</Label>
                                        <Select value={location} onValueChange={setLocation}>
                                            <SelectTrigger className="w-full bg-gray-50/50 border-gray-100 py-6">
                                                <div className="flex items-center gap-2">
                                                    <MapPin className="w-4 h-4 text-primary" />
                                                    <SelectValue />
                                                </div>
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="DrizzleDrop Inn, Chennai">DrizzleDrop Inn, Chennai</SelectItem>
                                                <SelectItem value="DrizzleDrop Inn, Ooty">DrizzleDrop Inn, Ooty</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    {/* Date Range */}
                                    <div className="space-y-2">
                                        <Label className="text-xs uppercase tracking-widest font-bold text-gray-500">Check In – Out</Label>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant="outline"
                                                    className={cn(
                                                        "w-full justify-start text-left font-normal py-6 bg-gray-50/50 border-gray-100",
                                                        !date && "text-muted-foreground"
                                                    )}
                                                >
                                                    <CalendarIcon className="mr-2 h-4 w-4 text-primary" />
                                                    {date?.from ? (
                                                        date.to ? (
                                                            <>{format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}</>
                                                        ) : (
                                                            format(date.from, "LLL dd, y")
                                                        )
                                                    ) : (
                                                        <span>Pick a date range</span>
                                                    )}
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                                <Calendar
                                                    initialFocus
                                                    mode="range"
                                                    defaultMonth={date?.from}
                                                    selected={date}
                                                    onSelect={setDate}
                                                    numberOfMonths={1}
                                                    disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                                                />
                                            </PopoverContent>
                                        </Popover>
                                    </div>

                                    {/* Guests Row */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label className="text-xs uppercase tracking-widest font-bold text-gray-500">Adults</Label>
                                            <Input 
                                                type="number" 
                                                min={1} 
                                                value={adults} 
                                                onChange={e => setAdults(parseInt(e.target.value) || 1)}
                                                className="bg-gray-50/50 py-6"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-xs uppercase tracking-widest font-bold text-gray-500">Rooms</Label>
                                            <Input 
                                                type="number" 
                                                min={1} 
                                                value={rooms} 
                                                onChange={e => setRooms(parseInt(e.target.value) || 1)}
                                                className="bg-gray-50/50 py-6"
                                            />
                                        </div>
                                    </div>

                                    <Button 
                                       onClick={() => setStep(2)} 
                                       className="w-full bg-primary py-6 text-lg font-bold group"
                                    >
                                        Continue <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </Button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-5">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="nav-modal-name">Full Name *</Label>
                                            <Input 
                                               id="nav-modal-name" 
                                               required 
                                               placeholder="John Doe" 
                                               value={guestDetails.name}
                                               onChange={e => setGuestDetails({...guestDetails, name: e.target.value})}
                                               className="py-6"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="nav-modal-phone">Phone Number *</Label>
                                            <Input 
                                               id="nav-modal-phone" 
                                               type="tel" 
                                               required 
                                               placeholder="+91" 
                                               value={guestDetails.phone}
                                               onChange={e => setGuestDetails({...guestDetails, phone: e.target.value})}
                                               className="py-6"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="nav-modal-email">Email Address *</Label>
                                        <Input 
                                           id="nav-modal-email" 
                                           type="email" 
                                           required 
                                           placeholder="john@example.com" 
                                           value={guestDetails.email}
                                           onChange={e => setGuestDetails({...guestDetails, email: e.target.value})}
                                           className="py-6"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Room Preference</Label>
                                        <Select 
                                           value={guestDetails.roomType} 
                                           onValueChange={v => setGuestDetails({...guestDetails, roomType: v})}
                                        >
                                            <SelectTrigger className="py-6">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Deluxe Room">Deluxe Room</SelectItem>
                                                <SelectItem value="Standard Room">Standard Room</SelectItem>
                                                <SelectItem value="Family Room">Family Room</SelectItem>
                                                <SelectItem value="Triple Room">Triple Room</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    {error && <div className="p-3 bg-red-50 text-red-500 text-sm rounded-lg border border-red-100">{error}</div>}

                                    <div className="flex gap-3 pt-2">
                                        <Button 
                                           type="button" 
                                           variant="outline" 
                                           onClick={() => setStep(1)} 
                                           className="px-6 py-6"
                                        >
                                            <ArrowLeft className="w-5 h-5" />
                                        </Button>
                                        <Button 
                                           type="submit" 
                                           disabled={loading} 
                                           className="flex-1 bg-primary py-6 text-lg font-bold hover-gold-glow"
                                        >
                                            {loading ? "Submitting..." : "Submit Request"}
                                        </Button>
                                    </div>
                                </form>
                            )}
                        </div>
                    </>
                )}
            </DialogContent>
        </Dialog>
    );
}
