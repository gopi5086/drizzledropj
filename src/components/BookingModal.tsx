import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format } from "date-fns";
import { CheckCircle2 } from "lucide-react";

export interface BookingData {
    location: string;
    checkIn: Date | undefined;
    checkOut: Date | undefined;
    adults: number;
    children: number;
    rooms: number;
    roomType?: string;
}

interface BookingModalProps {
    isOpen: boolean;
    onClose: () => void;
    bookingData: BookingData;
}

export default function BookingModal({ isOpen, onClose, bookingData }: BookingModalProps) {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        try {
            // Web3Forms API for frictionless zero-server deployments (works on Localhost + Hostinger + Vercel)
            const templateParams = {
                access_key: "868bd7f9-4108-4342-bf38-75a5dd580e00", 
                subject: `New Booking Request from ${data.name}`,
                from_name: "DrizzleDrop Booking System",
                Name: data.name,
                Phone: data.phone,
                Email: data.email,
                Location: bookingData.location,
                Room: data.roomType,
                Guests: `${bookingData.adults} Adults, ${bookingData.children} Children (${bookingData.rooms} Rooms)`,
                Dates: `${bookingData.checkIn ? format(bookingData.checkIn, "PPP") : "Not Set"} to ${bookingData.checkOut ? format(bookingData.checkOut, "PPP") : "Not Set"}`,
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
        setSuccess(false);
        setError("");
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-[425px] md:max-w-[600px] border-border/50 glass-card p-0 overflow-hidden">
                {success ? (
                    <div className="p-8 text-center flex flex-col items-center justify-center space-y-4">
                        <CheckCircle2 className="w-16 h-16 text-primary" />
                        <DialogTitle className="text-2xl font-serif">Booking Request Sent</DialogTitle>
                        <DialogDescription className="text-base">
                            Your booking request has been submitted successfully. Our team will contact you soon to confirm your reservation.
                        </DialogDescription>
                        <Button onClick={handleClose} className="mt-4 w-full bg-primary text-primary-foreground hover:bg-primary/90">
                            Done
                        </Button>
                    </div>
                ) : (
                    <>
                        <DialogHeader className="p-6 pb-2">
                            <DialogTitle className="text-2xl font-serif text-primary">Complete Your Booking</DialogTitle>
                            <DialogDescription>
                                Please provide your details below to finalize your booking request.
                            </DialogDescription>
                        </DialogHeader>

                        <form onSubmit={handleSubmit} className="p-6 pt-0 space-y-6">
                            {/* Summary of Search */}
                            <div className="bg-secondary/30 p-4 rounded-lg flex flex-col gap-2 text-sm border border-border/50">
                                <div className="flex justify-between border-b border-border/50 pb-2">
                                    <span className="text-muted-foreground">Location:</span>
                                    <span className="font-medium text-foreground">{bookingData.location || "Not specified"}</span>
                                </div>
                                <div className="flex justify-between border-b border-border/50 pb-2">
                                    <span className="text-muted-foreground">Dates:</span>
                                    <span className="font-medium text-foreground">
                                        {bookingData.checkIn ? format(bookingData.checkIn, "d MMM yyyy") : ""} -{" "}
                                        {bookingData.checkOut ? format(bookingData.checkOut, "d MMM yyyy") : ""}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Guests & Rooms:</span>
                                    <span className="font-medium text-foreground">
                                        {bookingData.adults} Adults, {bookingData.children} Children, {bookingData.rooms} Room(s)
                                    </span>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Full Name *</Label>
                                    <Input id="name" name="name" required placeholder="John Doe" className="bg-background" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="phone">Phone Number *</Label>
                                    <Input id="phone" name="phone" type="tel" required placeholder="+91 98765 43210" className="bg-background" />
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <Label htmlFor="email">Email Address *</Label>
                                    <Input id="email" name="email" type="email" required placeholder="john@example.com" className="bg-background" />
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <Label htmlFor="roomType">Room Type *</Label>
                                    <Select name="roomType" required defaultValue={bookingData.roomType || "Deluxe Room"}>
                                        <SelectTrigger className="bg-background">
                                            <SelectValue placeholder="Select Room Type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Standard Room">Standard Room</SelectItem>
                                            <SelectItem value="Triple Room">Triple Room</SelectItem>
                                            <SelectItem value="Family Room">Family Room</SelectItem>
                                            <SelectItem value="Deluxe Room">Deluxe Room</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Hidden fields to sync states with form data submission */}
                                <input type="hidden" name="adults" value={bookingData.adults} />
                                <input type="hidden" name="children" value={bookingData.children} />
                            </div>

                            {error && <div className="text-red-500 text-sm">{error}</div>}

                            <Button type="submit" disabled={loading} className="w-full bg-primary text-primary-foreground hover:bg-primary/90 hover-gold-glow py-6 text-base shadow-sm">
                                {loading ? "Submitting..." : "Submit Booking Request"}
                            </Button>
                        </form>
                    </>
                )}
            </DialogContent>
        </Dialog>
    );
}
