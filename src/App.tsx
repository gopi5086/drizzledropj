import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import Facilities from "@/pages/Facilities";
import Rooms from "@/pages/Rooms";
import Gallery from "@/pages/Gallery";
import Dining from "@/pages/Dining";
import Deals from "@/pages/Deals";
import Overview from "@/pages/Overview";
import NotFound from "@/pages/NotFound";
import AdminLogin from "@/pages/AdminLogin";
import AdminDashboard from "@/pages/AdminDashboard";
import AdminRoute from "@/components/AdminRoute";
import SocialFloatingIcons from "@/components/SocialFloatingIcons";
import { BookingProvider } from "@/context/BookingContext";
import { AuthProvider } from "@/context/AuthContext";
import BookingModal from "@/components/BookingModal";
import { useBooking } from "@/context/BookingContext";

const queryClient = new QueryClient();

// Helper component to show the global booking modal
const GlobalBookingModal = () => {
  const { isModalOpen, closeBooking, initialData } = useBooking();

  return (
    <BookingModal
      isOpen={isModalOpen}
      onClose={closeBooking}
      bookingData={{
        location: initialData?.location || "DrizzleDrop Inn, Chennai",
        adults: Number(initialData?.guests) || 1,
        children: 0,
        rooms: 1,
        checkIn: initialData?.checkIn || new Date(),
        checkOut: initialData?.checkOut || new Date(new Date().setDate(new Date().getDate() + 1)),
        roomType: initialData?.roomType || "Deluxe Room"
      }}
    />
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BookingProvider>
          <BrowserRouter>
            <Routes>
              {/* Admin routes - no Layout (no Navbar/Footer) */}
              <Route path="/admin" element={<AdminLogin />} />
              <Route
                path="/admin/dashboard"
                element={
                  <AdminRoute>
                    <AdminDashboard />
                  </AdminRoute>
                }
              />

              {/* Public routes - with Layout */}
              <Route path="/" element={<Layout><Home /></Layout>} />
              <Route path="/facilities" element={<Layout><Facilities /></Layout>} />
              <Route path="/rooms" element={<Layout><Rooms /></Layout>} />
              <Route path="/gallery" element={<Layout><Gallery /></Layout>} />
              <Route path="/dining" element={<Layout><Dining /></Layout>} />
              <Route path="/deals" element={<Layout><Deals /></Layout>} />
              <Route path="/overview" element={<Layout><Overview /></Layout>} />
              <Route path="*" element={<Layout><NotFound /></Layout>} />
            </Routes>
            <SocialFloatingIcons />
            <GlobalBookingModal />
          </BrowserRouter>
        </BookingProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
