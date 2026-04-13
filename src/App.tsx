import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter, Route, Routes, useParams, Navigate, useLocation } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import Chennai from "@/pages/Chennai";
import Ooty from "@/pages/Ooty";
import Facilities from "@/pages/Facilities";
import Rooms from "@/pages/Rooms";
import Gallery from "@/pages/Gallery";
import Dining from "@/pages/Dining";
import Deals from "@/pages/Deals";
import About from "@/pages/About";
import Overview from "@/pages/Overview";
import Contact from "@/pages/Contact";
import LocationPage from "@/components/LocationPage";
import NotFound from "@/pages/NotFound";
import AdminLogin from "@/pages/AdminLogin";
import AdminDashboard from "@/pages/AdminDashboard";
import AdminRoute from "@/components/AdminRoute";
import SocialFloatingIcons from "@/components/SocialFloatingIcons";
import { BookingProvider } from "@/context/BookingContext";
import { AuthProvider } from "@/context/AuthContext";
import { LocationProvider } from "@/context/LocationContext";
import NavbarBookingModal from "@/components/NavbarBookingModal";
import { useBooking } from "@/context/BookingContext";
import { locationMap } from "@/data/locationData";
import { useEffect } from "react";
import ScrollToTop from "@/components/ScrollToTop";
import NoupeChatbot from "@/components/NoupeChatbot";
import AdPopup from "@/components/AdPopup";
import DealPopup from "@/components/DealPopup";

const queryClient = new QueryClient();

const GlobalBookingModal = () => {
  const { isModalOpen, closeBooking, initialData } = useBooking();
  return (
    <NavbarBookingModal
      isOpen={isModalOpen}
      onClose={closeBooking}
      bookingData={{
        location: initialData?.location || "",
        adults: Number(initialData?.guests) || 0,
        children: 0,
        rooms: 1,
        checkIn: initialData?.checkIn,
        checkOut: initialData?.checkOut,
        roomType: initialData?.roomType,
      }}
    />
  );
};

const LocationHomeBridge = ({ scrollTo }: { scrollTo?: string }) => {
  const { locationId } = useParams();
  const data = locationId ? locationMap[locationId.toLowerCase()] : null;
  const loc = useLocation();

  useEffect(() => {
    const target = scrollTo || (loc.hash ? loc.hash.substring(1) : null);
    if (target) {
      setTimeout(() => {
        const el = document.getElementById(target);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [scrollTo, locationId, loc.hash]);

  if (!data) return <NotFound />;
  return <LocationPage location={data} />;
};

const NavigateToCanonical = () => {
  const { locationId } = useParams();
  return <Navigate to={`/${locationId}`} replace />;
};



const App = () => (
  <HelmetProvider>
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BookingProvider>
          <BrowserRouter>
            <ScrollToTop />
            <LocationProvider>
            <Routes>
              {/* Admin routes – prioritized at top */}
              <Route path="/admin" element={<AdminLogin />} />
              <Route
                path="/admin/dashboard"
                element={
                  <AdminRoute>
                    <AdminDashboard />
                  </AdminRoute>
                }
              />

              {/* ... existing routes ... */}

              {/* Main routes */}
              <Route path="/chennai" element={<Layout><Chennai /></Layout>} />
              <Route path="/ooty"    element={<Layout><Ooty /></Layout>} />

              {/* Dynamic Location Routes */}
              <Route path="/:locationId"            element={<Layout><LocationHomeBridge /></Layout>} />
              <Route path="/:locationId/home"       element={<NavigateToCanonical />} />
              <Route path="/:locationId/rooms"      element={<Layout><Rooms /></Layout>} />
              <Route path="/:locationId/facilities" element={<Layout><Facilities /></Layout>} />
              <Route path="/:locationId/about"     element={<Layout><About /></Layout>} />
              <Route path="/:locationId/deals"      element={<Layout><Deals /></Layout>} />
              <Route path="/:locationId/gallery"    element={<Layout><Gallery /></Layout>} />
              <Route path="/:locationId/dining"     element={<Layout><Dining /></Layout>} />
              <Route path="/:locationId/contact"    element={<Layout><Contact /></Layout>} />

              {/* Shared pages */}
              <Route path="/"           element={<Layout><Home /></Layout>} />
              <Route path="/about"      element={<Layout><About /></Layout>} />
              <Route path="/contact"    element={<Layout><Contact /></Layout>} />
              <Route path="/facilities" element={<Layout><Facilities /></Layout>} />
              <Route path="/rooms"      element={<Layout><Rooms /></Layout>} />
              <Route path="/gallery"    element={<Layout><Gallery /></Layout>} />
              <Route path="/dining"     element={<Layout><Dining /></Layout>} />
              <Route path="/deals"      element={<Layout><Deals /></Layout>} />
              <Route path="/overview"   element={<Layout><Overview /></Layout>} />
              <Route path="*"           element={<Layout><NotFound /></Layout>} />
            </Routes>
            <SocialFloatingIcons />
            <NoupeChatbot />
            <AdPopup />
            <DealPopup />
            <GlobalBookingModal />
            </LocationProvider>
          </BrowserRouter>
        </BookingProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
  </HelmetProvider>
);

export default App;
