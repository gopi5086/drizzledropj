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
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";

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

interface NavbarBookingModalProps {
    isOpen: boolean;
    onClose: () => void;
    bookingData?: BookingData;
}

export default function NavbarBookingModal({ isOpen, onClose, bookingData }: NavbarBookingModalProps) {
    const { toast } = useToast();
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
        email: "",
        phone: "",
        roomType: "Deluxe Room",
        message: "",
    });

    useEffect(() => {
        if (isOpen) {
            setSuccess(false);
            setError("");
            if (bookingData) {
                if (bookingData.location && bookingData.checkIn) setStep(2);
                else setStep(1);

                setLocation(bookingData.location || "DrizzleDrop Inn, Chennai");
                setDate({
                    from: bookingData.checkIn || new Date(),
                    to: bookingData.checkOut || new Date(new Date().setDate(new Date().getDate() + 1))
                });
                setAdults(bookingData.adults || 2);
                setChildren(bookingData.children || 0);
                setRooms(bookingData.rooms || 1);
                if (bookingData.roomType) setGuestDetails(prev => ({ ...prev, roomType: bookingData.roomType! }));
                if (bookingData.offerCode) setGuestDetails(prev => ({ ...prev, message: `Offer Code: ${bookingData.offerCode}` }));
            } else {
                setStep(1);
            }
        }
    }, [isOpen]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            // Generate a unique ID for this specific submission
            const submissionId = Date.now();
            const iframeId = `w3f-iframe-${submissionId}`;
            
            // Create a fresh hidden iframe
            const iframe = document.createElement("iframe");
            iframe.id = iframeId;
            iframe.name = iframeId;
            iframe.style.display = "none";
            document.body.appendChild(iframe);

            // Create temporary form for iframe submission
            const tempForm = document.createElement("form");
            tempForm.method = "POST";
            tempForm.action = "https://api.web3forms.com/submit";
            tempForm.target = iframeId;
            tempForm.style.display = "none";

            const fields: Record<string, string> = {
                access_key: "66f893ec-6a4a-4eab-81f7-ab4a03500abb",
                subject: "New Booking Request - DrizzleDrop Inn",
                from_name: "DrizzleDrop Inn Website",
                "Customer Name": guestDetails.name,
                "Phone Number": guestDetails.phone,
                "Email Address": guestDetails.email,
                "Selected Hotel Location": location,
                "Room Type": guestDetails.roomType,
                "Number of Guests": `${adults} Adults, ${children} Children`,
                "Number of Rooms": rooms.toString(),
                "Check-in Date": date?.from ? format(date.from, "PPP") : "Not Set",
                "Check-out Date": date?.to ? format(date.to, "PPP") : "Not Set",
                "Message / Special Request": guestDetails.message || "None",
                replyto: guestDetails.email,
            };

            Object.entries(fields).forEach(([key, value]) => {
                const input = document.createElement("input");
                input.type = "hidden";
                input.name = key;
                input.value = value;
                tempForm.appendChild(input);
            });

            document.body.appendChild(tempForm);
            tempForm.submit();

            // Give it time to submit, then cleanup
            await new Promise(r => setTimeout(r, 2500));
            
            document.body.removeChild(tempForm);
            document.body.removeChild(iframe);
            
            setSuccess(true);
            toast({
                title: "Booking Request Sent Successfully",
                description: "We'll contact you shortly to confirm your stay.",
            });
        } catch (err: any) {
            setError("Something went wrong. Please try again.");
            toast({
                title: "Submission Error",
                description: "Something went wrong. Please try again.",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="max-w-[95vw] sm:max-w-xl max-h-[90vh] overflow-hidden flex flex-col p-0 rounded-[2rem] border-none shadow-2xl">
                {success ? (
                    <div className="flex flex-col items-center justify-center p-12 text-center space-y-4">
                        <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center">
                            <CheckCircle2 className="w-10 h-10 text-green-500" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900">Booking Request Sent Successfully</h2>
                        <p className="text-gray-500">Thank you for choosing DrizzleDrop Inn. We will contact you at {guestDetails.phone} within 24 hours.</p>
                        <Button onClick={onClose} className="mt-4 rounded-xl px-8">Close</Button>
                    </div>
                ) : (
                    <>
                        <DialogHeader className="p-6 pb-0">
                            <DialogTitle className="text-2xl sm:text-3xl font-serif">
                                {step === 1 ? "Book Your Stay" : "Guest Details"}
                            </DialogTitle>
                            <DialogDescription>
                                {step === 1 ? "Where and when would you like to visit us?" : "Almost there! We just need your contact details."}
                            </DialogDescription>
                        </DialogHeader>

                        <div className="p-6 pt-2 overflow-y-auto custom-scrollbar">
                            {step === 1 ? (
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label>Select Location</Label>
                                        <Select value={location} onValueChange={setLocation}>
                                            <SelectTrigger className="bg-gray-50/50"><SelectValue /></SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="DrizzleDrop Inn, Chennai">DrizzleDrop Inn, Chennai</SelectItem>
                                                <SelectItem value="DrizzleDrop Inn, Ooty">DrizzleDrop Inn, Ooty</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Dates</Label>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button variant="outline" className="w-full justify-start py-6 bg-gray-50/50">
                                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                                    {date?.from ? (date.to ? <>{format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}</> : format(date.from, "LLL dd, y")) : <span>Pick dates</span>}
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                                <Calendar mode="range" selected={date} onSelect={setDate} numberOfMonths={2} />
                                            </PopoverContent>
                                        </Popover>
                                    </div>
                                    <div className="grid grid-cols-3 gap-4">
                                        <div className="space-y-2">
                                            <Label>Adults</Label>
                                            <Input type="number" min={1} value={adults} onChange={e => setAdults(Number(e.target.value))} />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Children</Label>
                                            <Input type="number" min={0} value={children} onChange={e => setChildren(Number(e.target.value))} />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Rooms</Label>
                                            <Input type="number" min={1} value={rooms} onChange={e => setRooms(Number(e.target.value))} />
                                        </div>
                                    </div>
                                    <Button onClick={() => setStep(2)} className="w-full py-6 mt-4 gap-2">Next Step <ArrowRight className="w-4 h-4" /></Button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="space-y-2">
                                        <Label>Full Name</Label>
                                        <Input required value={guestDetails.name} onChange={e => setGuestDetails({ ...guestDetails, name: e.target.value })} placeholder="John Doe" />
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label>Email</Label>
                                            <Input type="email" required value={guestDetails.email} onChange={e => setGuestDetails({ ...guestDetails, email: e.target.value })} placeholder="john@example.com" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Phone</Label>
                                            <Input required value={guestDetails.phone} onChange={e => setGuestDetails({ ...guestDetails, phone: e.target.value })} placeholder="+91 98765 43210" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Room Type</Label>
                                        <Select value={guestDetails.roomType} onValueChange={val => setGuestDetails({ ...guestDetails, roomType: val })}>
                                            <SelectTrigger className="bg-gray-50/50"><SelectValue /></SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Deluxe Room">Deluxe Room</SelectItem>
                                                <SelectItem value="Standard Room">Standard Room</SelectItem>
                                                <SelectItem value="Triple Room">Triple Room</SelectItem>
                                                <SelectItem value="Family Suite">Family Suite</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Special Request</Label>
                                        <Textarea value={guestDetails.message} onChange={e => setGuestDetails({ ...guestDetails, message: e.target.value })} placeholder="Any special requests?" />
                                    </div>
                                    <div className="flex gap-3 pt-4">
                                        <Button type="button" variant="outline" onClick={() => setStep(1)} className="flex-1 py-6"><ArrowLeft className="w-4 h-4 mr-2" /> Back</Button>
                                        <Button type="submit" disabled={loading} className="flex-[2] py-6 gap-2">
                                            {loading ? "Sending Booking Request..." : "Confirm Booking"}
                                        </Button>
                                    </div>
                                    {error && <p className="text-sm text-red-500 font-bold text-center mt-2">{error}</p>}
                                </form>
                            )}
                        </div>
                    </>
                )}
            </DialogContent>
        </Dialog>
    );
}
