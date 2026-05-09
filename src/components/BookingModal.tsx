import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";
import { CheckCircle2, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";

export interface BookingModalData {
    checkIn?: Date;
    checkOut?: Date;
    location: string;
    adults: number;
    children: number;
    rooms: number;
    roomType?: string;
    offerCode?: string;
}

interface BookingModalProps {
    isOpen: boolean;
    onClose: () => void;
    bookingData: BookingModalData;
}

export default function BookingModal({ isOpen, onClose, bookingData }: BookingModalProps) {
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const formData = new FormData(e.currentTarget);
            
            // Generate unique submission ID
            const submissionId = Date.now();
            const iframeId = `w3f-iframe-room-${submissionId}`;
            
            // Create fresh hidden iframe
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

            const guestsCount = `${bookingData.adults} Adults, ${bookingData.children} Children`;
            const roomsCount = bookingData.rooms.toString();
            const checkInDate = bookingData.checkIn ? format(bookingData.checkIn, "PPP") : "Not Set";
            const checkOutDate = bookingData.checkOut ? format(bookingData.checkOut, "PPP") : "Not Set";

            const fields: Record<string, string> = {
                access_key: "66f893ec-6a4a-4eab-81f7-ab4a03500abb",
                subject: "New Booking Request - DrizzleDrop Inn",
                from_name: "DrizzleDrop Inn Website",
                name: (formData.get("name") ?? "").toString(),
                email: (formData.get("email") ?? "").toString(),
                phone: (formData.get("phone") ?? "").toString(),
                location: bookingData.location,
                room_type: (formData.get("roomType") ?? bookingData.roomType ?? "Standard").toString(),
                guests: guestsCount,
                rooms_count: roomsCount,
                check_in: checkInDate,
                check_out: checkOutDate,
                replyto: (formData.get("email") ?? "").toString(),
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
            <DialogContent className="max-w-[95vw] sm:max-w-lg max-h-[90vh] overflow-hidden flex flex-col p-0 rounded-[2rem] border-none shadow-2xl">
                {success ? (
                    <div className="flex flex-col items-center justify-center p-12 text-center space-y-4">
                        <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center">
                            <CheckCircle2 className="w-10 h-10 text-green-500" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900">Booking Request Sent Successfully</h2>
                        <p className="text-gray-500">Thank you for Choosing DrizzleDrop Inn. We will contact you soon.</p>
                        <Button onClick={onClose} className="mt-4 rounded-xl px-8">Close</Button>
                    </div>
                ) : (
                    <>
                        <div className="bg-primary/5 p-6 border-b border-primary/10">
                            <DialogHeader>
                                <DialogTitle className="text-2xl font-serif">Complete Reservation</DialogTitle>
                                <DialogDescription>Submit your details for {bookingData.location}</DialogDescription>
                            </DialogHeader>
                        </div>
                        <div className="p-6 overflow-y-auto">
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <Label>Customer Name</Label>
                                    <Input name="name" required placeholder="Full Name" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>Email Address</Label>
                                        <Input name="email" type="email" required placeholder="Email" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Phone Number</Label>
                                        <Input name="phone" required placeholder="Phone" />
                                    </div>
                                </div>

                                <Button type="submit" disabled={loading} className="w-full py-6 gap-2">
                                    {loading ? "Sending Booking Request..." : <><Send className="w-4 h-4" /> Confirm Booking Request</>}
                                </Button>
                                {error && <p className="text-sm text-red-500 font-bold text-center">{error}</p>}
                            </form>
                        </div>
                    </>
                )}
            </DialogContent>
        </Dialog>
    );
}
