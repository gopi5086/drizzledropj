import React, { createContext, useContext, useState } from "react";

interface BookingData {
    checkIn?: Date;
    checkOut?: Date;
    location?: string;
    guests?: string;
    roomType?: string;
}

interface BookingContextType {
    isModalOpen: boolean;
    initialData: BookingData | null;
    openBooking: (data?: BookingData) => void;
    closeBooking: () => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: React.ReactNode }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [initialData, setInitialData] = useState<BookingData | null>(null);

    const openBooking = (data?: BookingData) => {
        if (data) setInitialData(data);
        else setInitialData(null);
        setIsModalOpen(true);
    };
    const closeBooking = () => {
        setIsModalOpen(false);
        setInitialData(null);
    };

    return (
        <BookingContext.Provider value={{ isModalOpen, initialData, openBooking, closeBooking }}>
            {children}
        </BookingContext.Provider>
    );
}

export function useBooking() {
    const context = useContext(BookingContext);
    if (context === undefined) {
        throw new Error("useBooking must be used within a BookingProvider");
    }
    return context;
}
