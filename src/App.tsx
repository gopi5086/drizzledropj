import { Suspense, lazy } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter, Route, Routes, useParams, Navigate, useLocation } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Layout from "@/components/Layout";

// Lazy Loaded Pages
const Home = lazy(() => import("@/pages/Home"));
const Chennai = lazy(() => import("@/pages/Chennai"));
const Ooty = lazy(() => import("@/pages/Ooty"));
const Facilities = lazy(() => import("@/pages/Facilities"));
const Rooms = lazy(() => import("@/pages/Rooms"));
const Gallery = lazy(() => import("@/pages/Gallery"));
const Dining = lazy(() => import("@/pages/Dining"));
const Deals = lazy(() => import("@/pages/Deals"));
const About = lazy(() => import("@/pages/About"));
const Overview = lazy(() => import("@/pages/Overview"));
const Contact = lazy(() => import("@/pages/Contact"));
const BlogPost = lazy(() => import("@/pages/BlogPost"));
const LocationPage = lazy(() => import("@/components/LocationPage"));
const NotFound = lazy(() => import("@/pages/NotFound"));
const AdminLogin = lazy(() => import("@/pages/AdminLogin"));
const AdminDashboard = lazy(() => import("@/pages/AdminDashboard"));
const AdminRoute = lazy(() => import("@/components/AdminRoute"));
import SocialFloatingIcons from "@/components/SocialFloatingIcons";
import { BookingProvider } from "@/context/BookingContext";
import { AuthProvider } from "@/context/AuthContext";
import { LocationProvider } from "@/context/LocationContext";
import NavbarBookingModal from "@/components/NavbarBookingModal";
import { useBooking } from "@/context/BookingContext";
import { locationMap } from "@/data/locationData";
import { useEffect } from "react";
import ScrollToTop from "@/components/ScrollToTop";
import DrizzleChatbot from "@/components/DrizzleChatbot";
import AdPopup from "@/components/AdPopup";
import DealPopup from "@/components/DealPopup";
import StickyBookingCTA from "@/components/StickyBookingCTA";

const queryClient = new QueryClient();

const GlobalBookingModal = () => {
  const { isModalOpen, closeBooking, initialData } = useBooking();

  // Map internal location keys to display strings used in the modal
  let displayLocation = initialData?.location || "";
  const normalizedLoc = displayLocation.toUpperCase();
  
  if (normalizedLoc.includes("CHENNAI")) displayLocation = "DrizzleDrop Inn, Chennai";
  else if (normalizedLoc.includes("OOTY")) displayLocation = "DrizzleDrop Inn, Ooty";
  else displayLocation = "DrizzleDrop Inn, Chennai"; // Default fallback

  return (
    <NavbarBookingModal
      isOpen={isModalOpen}
      onClose={closeBooking}
      bookingData={{
        location: displayLocation,
        adults: Number(initialData?.guests) || 2,
        children: 0,
        rooms: 1,
        checkIn: initialData?.checkIn,
        checkOut: initialData?.checkOut,
        roomType: initialData?.roomType,
        offerCode: initialData?.offerCode,
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
                <Suspense fallback={<div className="h-screen w-screen flex items-center justify-center bg-[#2E6B8A]/5"><div className="w-12 h-12 border-4 border-[#2E6B8A]/20 border-t-[#2E6B8A] rounded-full animate-spin" /></div>}>
                  <AppContent />
                </Suspense>
              </LocationProvider>
            </BrowserRouter>
          </BookingProvider>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

const AppContent = () => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <>
      <Routes>
        {/* Admin routes – prioritized at top */}
        <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin/dashboard"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />

        {/* Main routes */}
        <Route path="/chennai" element={<Layout><Chennai /></Layout>} />
        <Route path="/ooty" element={<Layout><Ooty /></Layout>} />

        {/* Dynamic Location Routes */}
        <Route path="/:locationId" element={<Layout><LocationHomeBridge /></Layout>} />
        <Route path="/:locationId/home" element={<NavigateToCanonical />} />
        <Route path="/:locationId/rooms" element={<Layout><Rooms /></Layout>} />
        <Route path="/:locationId/facilities" element={<Layout><Facilities /></Layout>} />
        <Route path="/:locationId/about" element={<Layout><About /></Layout>} />
        <Route path="/:locationId/deals" element={<Layout><Deals /></Layout>} />
        <Route path="/:locationId/gallery" element={<Layout><Gallery /></Layout>} />
        <Route path="/:locationId/dining" element={<Layout><Dining /></Layout>} />
        <Route path="/:locationId/contact" element={<Layout><Contact /></Layout>} />

        {/* Shared pages */}
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/about" element={<Layout><About /></Layout>} />
        <Route path="/contact" element={<Layout><Contact /></Layout>} />
        <Route path="/facilities" element={<Layout><Facilities /></Layout>} />
        <Route path="/rooms" element={<Layout><Rooms /></Layout>} />
        <Route path="/gallery" element={<Layout><Gallery /></Layout>} />
        <Route path="/dining" element={<Layout><Dining /></Layout>} />
        <Route path="/deals" element={<Layout><Deals /></Layout>} />
        <Route path="/overview" element={<Layout><Overview /></Layout>} />
        <Route path="/blog/:slug" element={<Layout><BlogPost /></Layout>} />
        <Route path="*" element={<Layout><NotFound /></Layout>} />
      </Routes>

      {!isAdmin && (
        <>
          <SocialFloatingIcons />
          <DrizzleChatbot />
          <AdPopup />
          <DealPopup />
          <StickyBookingCTA />
          <GlobalBookingModal />
        </>
      )}
    </>
  );
};

export default App;
