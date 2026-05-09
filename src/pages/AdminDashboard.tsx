import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Image as ImageIcon,
  Settings,
  LogOut,
  Plus,
  Search,
  Edit,
  Trash2,
  X,
  Upload,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  ClipboardList,
  Eye,
  EyeOff,
  Tag,
  BedDouble,
  HelpCircle,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import driLogo from "@/assets/drilogo.webp";

import { BACKEND_BASE, API_BASE } from "@/config";

interface Ad {
  _id: string;
  title: string;
  description: string;
  images: string[];
  redirectLink: string;
  isActive: boolean;
  createdAt: string;
}

type SidebarItem = "dashboard" | "manage-ads" | "manage-deals" | "manage-rooms" | "manage-faqs";

interface Room {
  _id: string;
  name: string;
  location: "CHENNAI" | "OOTY";
  type: string;
  desc: string;
  epPrice?: string;
  cpPrice?: string;
  price?: string;
  image: string;
  amenities: string[];
  order: number;
}

interface Deal {
  _id: string;
  title: string;
  description: string;
  dealType: string;
  location: string;
  discountPercentage: number;
  customPrice: string;
  image: string;
  validFrom: string;
  validTo: string;
  isActive: boolean;
  priority: number;
  isPopup: boolean;
  promoCode: string;
}

interface ChatMessage {
  sender: "user" | "bot";
  text: string;
  timestamp: string;
}

interface ChatSession {
  _id: string;
  sessionId: string;
  messages: ChatMessage[];
  metadata: {
    location?: string;
    name?: string;
    phone?: string;
  };
  status: string;
  updatedAt: string;
}




interface FAQ {
  _id: string;
  question: string;
  answer: string;
  location: "CHENNAI" | "OOTY" | "GENERAL";
  order: number;
  isActive: boolean;
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { admin, token, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<SidebarItem>("manage-ads");
  const [ads, setAds] = useState<Ad[]>([]);
  const [chats, setChats] = useState<ChatSession[]>([]);

  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedChat, setSelectedChat] = useState<ChatSession | null>(null);
  const [editingAd, setEditingAd] = useState<Ad | null>(null);
  const [deals, setDeals] = useState<Deal[]>([]);
  const [editingDeal, setEditingDeal] = useState<Deal | null>(null);
  const [isDealModalOpen, setIsDealModalOpen] = useState(false);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [isRoomModalOpen, setIsRoomModalOpen] = useState(false);
  const [editingRoom, setEditingRoom] = useState<Room | null>(null);
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [isFaqModalOpen, setIsFaqModalOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState<FAQ | null>(null);
  const [faqForm, setFaqForm] = useState({
    question: "",
    answer: "",
    location: "GENERAL",
    order: 0
  });
  const [isLoading, setIsLoading] = useState(false);

  // Form state (image-only ad)
  const [formTitle, setFormTitle] = useState("");
  const [formBenefit1, setFormBenefit1] = useState("Savings on Room Rates");
  const [formBenefit2, setFormBenefit2] = useState("Dining & Restaurant Perks");
  const [formBenefit3, setFormBenefit3] = useState("Special Spa & Wellness");
  const [formImages, setFormImages] = useState<File | null>(null);
  const [formImagePreviews, setFormImagePreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const adsPerPage = 6;

  // Fetch ads
  const fetchAds = async () => {
    try {
      const res = await fetch(`${API_BASE}/ads`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setAds(data);
      }
    } catch (error) {
      console.error("Failed to fetch ads:", error);
    }
  };

  const fetchChats = async () => {
    try {
      const res = await fetch(`${API_BASE}/chat`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setChats(data);
      }
    } catch (error) {
      console.error("Failed to fetch chats:", error);
    }
  };



  const fetchDeals = async () => {
    try {
      const res = await fetch(`${API_BASE}/deals`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setDeals(data);
      }
    } catch (error) {
      console.error("Failed to fetch deals:", error);
    }
  };

  const fetchRooms = async () => {
    try {
      const res = await fetch(`${API_BASE}/rooms`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setRooms(data);
      }
    } catch (error) {
      console.error("Failed to fetch rooms:", error);
    }
  };

  const fetchFaqs = async () => {
    try {
      const res = await fetch(`${API_BASE}/faqs`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) setFaqs(await res.json());
    } catch (err) {
      console.error("Failed to fetch FAQs:", err);
    }
  };

  useEffect(() => {
    fetchAds();
    fetchChats();

    fetchDeals();
    fetchRooms();
    fetchFaqs();
  }, [token]);

  // Filter ads
  const filteredAds = ads.filter(
    (ad) =>
      ad.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ad.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredAds.length / adsPerPage);
  const paginatedAds = filteredAds.slice(
    (currentPage - 1) * adsPerPage,
    currentPage * adsPerPage
  );

  // Handle image selection (single image only)
  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (!file) return;

    // Validate file type
    const validTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!file.type.startsWith("image/") || !validTypes.includes(file.type)) {
      alert("Please upload a valid image (jpg, png, webp)");
      return;
    }

    setFormImages(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormImagePreviews([reader.result as string]);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setFormImages(null);
    setFormImagePreviews([]);
  };

  // Reset form
  const resetForm = () => {
    setFormImages(null);
    setFormImagePreviews([]);
    setFormTitle("");
    setFormBenefit1("Savings on Room Rates");
    setFormBenefit2("Dining & Restaurant Perks");
    setFormBenefit3("Special Spa & Wellness");
    setEditingAd(null);
  };

  const [dealForm, setDealForm] = useState({
    title: "",
    description: "",
    dealType: "DealsOfDay",
    location: "Both",
    discountPercentage: 0,
    customPrice: "",
    validFrom: new Date().toISOString().split("T")[0],
    validTo: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    priority: 0,
    isPopup: false,
    isActive: true,
    promoCode: ""
  });


  const resetDealForm = () => {
    setDealForm({
      title: "",
      description: "",
      dealType: "DealsOfDay",
      location: "Both",
      discountPercentage: 0,
      customPrice: "",
      validFrom: new Date().toISOString().split("T")[0],
      validTo: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      priority: 0,
      isPopup: false,
      isActive: true,
      promoCode: ""
    });
    setFormImages(null);
    setFormImagePreviews([]);
    setEditingDeal(null);
  };

  const [roomForm, setRoomForm] = useState({
    name: "",
    location: "CHENNAI",
    type: "",
    desc: "",
    epPrice: "",
    cpPrice: "",
    price: "",
    amenities: "",
    order: 0
  });

  const resetRoomForm = () => {
    setRoomForm({
      name: "",
      location: "CHENNAI",
      type: "",
      desc: "",
      epPrice: "",
      cpPrice: "",
      price: "",
      amenities: "",
      order: 0
    });
    setFormImages(null);
    setFormImagePreviews([]);
    setEditingRoom(null);
  };

  // Open edit modal
  const openEditModal = (ad: Ad) => {
    setEditingAd(ad);
    setFormTitle(ad.title || "");
    const benefits = (ad.description || "").split("|");
    setFormBenefit1(benefits[0] || "Savings on Room Rates");
    setFormBenefit2(benefits[1] || "Dining & Restaurant Perks");
    setFormBenefit3(benefits[2] || "Special Spa & Wellness");
    setFormImages(null);
    setFormImagePreviews(ad.images.length ? [`${BACKEND_BASE}${ad.images[0]}`] : []);
    setIsCreateModalOpen(true);
  };

  // Create/Update Ad
  const handleSubmit = async () => {
    if (!formImages && !editingAd) {
      alert("Please upload an image for the ad");
      return;
    }

    setIsLoading(true);
    const formData = new FormData();
    // Only images are sent for ads now. Backend expects 'images' field(s).
  if (formImages) formData.append("images", formImages);
  formData.append("title", formTitle || "");
  formData.append("description", `${formBenefit1}|${formBenefit2}|${formBenefit3}`);

    try {
      const url = editingAd
        ? `${API_BASE}/ads/${editingAd._id}`
        : `${API_BASE}/ads`;
      const method = editingAd ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (res.ok) {
        await fetchAds();
        setIsCreateModalOpen(false);
        resetForm();
      } else {
        const data = await res.json();
        alert(data.message || "Failed to save ad");
      }
    } catch (error) {
      alert("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Delete Ad
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this ad?")) return;

    try {
      const res = await fetch(`${API_BASE}/ads/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        await fetchAds();
      }
    } catch (error) {
      alert("Failed to delete ad");
    }
  };

  // Toggle Active
  const handleToggle = async (id: string) => {
    try {
      const res = await fetch(`${API_BASE}/ads/${id}/toggle`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        await fetchAds();
      }
    } catch (error) {
      alert("Failed to toggle ad status");
    }
  };

  // Handle Deal Submission

  const handleDealSubmit = async () => {
    if (!formImages && !editingDeal) {
      alert("Please upload an image for the deal");
      return;
    }

    setIsLoading(true);
    const formData = new FormData();
    if (formImages) formData.append("images", formImages);
    Object.entries(dealForm).forEach(([key, value]) => {
      formData.append(key, String(value));
    });

    try {
      const url = editingDeal ? `${API_BASE}/deals/${editingDeal._id}` : `${API_BASE}/deals`;
      const method = editingDeal ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (res.ok) {
        await fetchDeals();
        setIsDealModalOpen(false);
        resetDealForm();
      } else {
        const data = await res.json();
        alert(data.message || "Failed to save deal");
      }
    } catch (error) {
      alert("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteDeal = async (id: string) => {
    if (!confirm("Are you sure you want to delete this deal?")) return;
    try {
      const res = await fetch(`${API_BASE}/deals/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) fetchDeals();
    } catch (error) {
      alert("Failed to delete deal");
    }
  };

  const handleToggleDeal = async (id: string) => {
    try {
      const res = await fetch(`${API_BASE}/deals/${id}/toggle`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) fetchDeals();
    } catch (error) {
      alert("Failed to toggle deal status");
    }
  };

  const openEditDealModal = (deal: Deal) => {
    setEditingDeal(deal);
    setDealForm({
      title: deal.title,
      description: deal.description,
      dealType: deal.dealType,
      location: deal.location,
      discountPercentage: deal.discountPercentage,
      customPrice: deal.customPrice,
      validFrom: deal.validFrom.split("T")[0],
      validTo: deal.validTo.split("T")[0],
      priority: deal.priority,
      isPopup: deal.isPopup,
      isActive: deal.isActive,
      promoCode: deal.promoCode || ""
    });
    setFormImages(null);
    setFormImagePreviews([deal.image.startsWith("/uploads") ? `${BACKEND_BASE}${deal.image}` : deal.image]);
    setIsDealModalOpen(true);
  };

  const handleRoomSubmit = async () => {
    if (!formImages && !editingRoom) {
      alert("Please upload an image for the room");
      return;
    }

    setIsLoading(true);
    const formData = new FormData();
    if (formImages) formData.append("images", formImages);
    Object.entries(roomForm).forEach(([key, value]) => {
      formData.append(key, String(value));
    });

    try {
      const url = editingRoom ? `${API_BASE}/rooms/${editingRoom._id}` : `${API_BASE}/rooms`;
      const method = editingRoom ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (res.ok) {
        await fetchRooms();
        setIsRoomModalOpen(false);
        resetRoomForm();
      } else {
        const data = await res.json();
        alert(data.message || "Failed to save room");
      }
    } catch (error) {
      alert("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteRoom = async (id: string) => {
    if (!confirm("Are you sure you want to delete this room?")) return;
    try {
      const res = await fetch(`${API_BASE}/rooms/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) fetchRooms();
    } catch (error) {
      alert("Failed to delete room");
    }
  };

  const openEditRoomModal = (room: Room) => {
    setEditingRoom(room);
    setRoomForm({
      name: room.name,
      location: room.location,
      type: room.type,
      desc: room.desc,
      epPrice: room.epPrice || "",
      cpPrice: room.cpPrice || "",
      price: room.price || "",
      amenities: room.amenities.join(", "),
      order: room.order
    });
    setFormImages(null);
    setFormImagePreviews([room.image.startsWith("/uploads") ? `${BACKEND_BASE}${room.image}` : room.image]);
    setIsRoomModalOpen(true);
  };


  const resetFaqForm = () => {
    setFaqForm({ question: "", answer: "", location: "GENERAL", order: 0 });
    setEditingFaq(null);
  };

  const handleFaqSubmit = async () => {
    if (!faqForm.question || !faqForm.answer) return alert("Please fill all required fields");
    setIsLoading(true);
    try {
      const url = editingFaq ? `${API_BASE}/faqs/${editingFaq._id}` : `${API_BASE}/faqs`;
      const res = await fetch(url, {
        method: editingFaq ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(faqForm)
      });
      if (res.ok) {
        fetchFaqs();
        setIsFaqModalOpen(false);
        resetFaqForm();
      }
    } catch (err) {
      alert("Error saving FAQ");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteFaq = async (id: string) => {
    if (!confirm("Are you sure you want to delete this FAQ?")) return;
    try {
      const res = await fetch(`${API_BASE}/faqs/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) fetchFaqs();
    } catch (err) {
      alert("Failed to delete FAQ");
    }
  };

  const handleToggleFaq = async (id: string) => {
    try {
      const res = await fetch(`${API_BASE}/faqs/${id}/toggle`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) fetchFaqs();
    } catch (err) {
      alert("Failed to toggle status");
    }
  };


  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const sidebarItems: { id: SidebarItem; label: string; icon: React.ElementType }[] = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "manage-ads", label: "Manage Ads", icon: ImageIcon },
    { id: "manage-deals", label: "Manage Deals", icon: Tag },
    { id: "manage-rooms", label: "Manage Rooms", icon: BedDouble },
    { id: "manage-faqs", label: "Manage FAQ", icon: HelpCircle },

  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#f5f6fa]" style={{ fontFamily: "var(--font-sans)" }}>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageSelect}
        className="hidden"
      />
      {/* Sidebar - matching reference green theme */}
      <aside className="w-full md:w-60 bg-gradient-to-r md:bg-gradient-to-b from-[#3a7d5a] to-[#2d6647] text-white flex flex-row md:flex-col shadow-lg md:shadow-xl md:fixed md:h-full md:z-40">
        {/* Logo */}
        <div className="p-3 md:p-5 md:pb-8 border-b border-r md:border-r-0 border-white/10">
          <div className="flex items-center gap-3">
            <img src={driLogo} alt="DrizzleDrop" className="h-10 md:h-12 w-auto" />
          </div>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 py-2 md:py-4 px-2 md:px-3 space-y-0 md:space-y-1 flex md:flex-col overflow-x-auto md:overflow-x-visible">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex-shrink-0 md:flex-shrink flex items-center gap-3 px-3 md:px-4 py-2 md:py-3 rounded-lg md:rounded-xl text-xs md:text-sm font-medium transition-all duration-200 whitespace-nowrap md:whitespace-normal ${
                activeTab === item.id
                  ? "bg-white/20 text-white shadow-md"
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              }`}
            >
              <item.icon className="w-4 md:w-5 h-4 md:h-5 flex-shrink-0" />
              <span className="hidden sm:inline">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-2 md:p-3 border-l md:border-l-0 md:border-t border-white/10">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 md:px-4 py-2 md:py-3 rounded-lg md:rounded-xl text-xs md:text-sm font-medium text-white/70 hover:bg-red-500/20 hover:text-red-200 transition-all duration-200 whitespace-nowrap md:whitespace-normal w-full md:w-auto"
          >
            <LogOut className="w-4 md:w-5 h-4 md:h-5" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-60">
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-200 px-4 sm:px-6 md:px-8 py-3 md:py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between sticky top-0 z-30 shadow-sm gap-4 sm:gap-0">
          <h1 className="text-xl sm:text-2xl font-bold text-[#2d6647]" style={{ fontFamily: "var(--font-serif)" }}>
            {activeTab === "dashboard" && "Dashboard"}
            {activeTab === "manage-ads" && "Manage Ads"}
            {activeTab === "manage-deals" && "Manage Deals"}
            {activeTab === "manage-rooms" && "Manage Rooms"}
            {activeTab === "manage-faqs" && "Manage FAQs"}

          </h1>

          <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto">
            {activeTab === "manage-ads" && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  resetForm();
                  setIsCreateModalOpen(true);
                }}
                className="flex items-center gap-2 px-3 sm:px-5 py-2 sm:py-2.5 bg-[#3a7d5a] hover:bg-[#2d6647] text-white text-xs sm:text-sm font-bold rounded-lg sm:rounded-xl transition-colors shadow-md whitespace-nowrap"
              >
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">Add New Ad</span>
                <span className="sm:hidden">Add</span>
              </motion.button>
            )}
            {activeTab === "manage-deals" && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  resetDealForm();
                  setIsDealModalOpen(true);
                }}
                className="flex items-center gap-2 px-3 sm:px-5 py-2 sm:py-2.5 bg-[#3e4a5d] hover:bg-[#2c3748] text-white text-xs sm:text-sm font-bold rounded-lg sm:rounded-xl transition-colors shadow-md whitespace-nowrap"
              >
                <Plus className="w-4 h-4" />
                <span>New Deal</span>
              </motion.button>
            )}
            {activeTab === "manage-rooms" && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  resetRoomForm();
                  setIsRoomModalOpen(true);
                }}
                className="flex items-center gap-2 px-3 sm:px-5 py-2 sm:py-2.5 bg-[#2E6B8A] hover:bg-[#1a4a63] text-white text-xs sm:text-sm font-bold rounded-lg sm:rounded-xl transition-colors shadow-md whitespace-nowrap"
              >
                <Plus className="w-4 h-4" />
                <span>New Room</span>
              </motion.button>
            )}
            <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500">
              <div className="w-8 sm:w-9 h-8 sm:h-9 rounded-full bg-[#3a7d5a] text-white flex items-center justify-center font-bold text-xs sm:text-sm">
                {admin?.name?.charAt(0) || "A"}
              </div>
              <span className="font-medium text-gray-700 hidden sm:inline">{admin?.name || "Admin"}</span>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="p-4 sm:p-6 md:p-8">
          {activeTab === "dashboard" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg sm:rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 sm:w-12 h-10 sm:h-12 bg-[#3a7d5a]/10 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                    <ImageIcon className="w-5 sm:w-6 h-5 sm:h-6 text-[#3a7d5a]" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-gray-500">Total Ads</p>
                    <p className="text-2xl sm:text-3xl font-bold text-gray-800">{ads.length}</p>
                  </div>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-lg sm:rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 sm:w-12 h-10 sm:h-12 bg-green-50 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                    <div className="w-2.5 sm:w-3 h-2.5 sm:h-3 bg-green-500 rounded-full" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-gray-500">Active Ads</p>
                    <p className="text-2xl sm:text-3xl font-bold text-gray-800">
                      {ads.filter((a) => a.isActive).length}
                    </p>
                  </div>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-lg sm:rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 sm:w-12 h-10 sm:h-12 bg-red-50 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                    <div className="w-2.5 sm:w-3 h-2.5 sm:h-3 bg-red-400 rounded-full" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-gray-500">Inactive Ads</p>
                    <p className="text-2xl sm:text-3xl font-bold text-gray-800">
                      {ads.filter((a) => !a.isActive).length}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          )}

          {activeTab === "manage-ads" && (
            <>
              {/* Search & Filter Bar */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-4">
                <div className="relative flex-1 w-full max-w-xs sm:max-w-md">
                  <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search ads..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="w-full pl-10 sm:pl-11 pr-3 sm:pr-4 py-2.5 sm:py-3 bg-white border border-gray-200 rounded-lg sm:rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#3a7d5a]/20 focus:border-[#3a7d5a] transition-all"
                  />
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 whitespace-nowrap">
                  <span className="font-medium">{filteredAds.length}</span> ads found
                </div>
              </div>

              {/* Ads Table - Responsive */}
              <div className="bg-white rounded-lg sm:rounded-2xl shadow-sm border border-gray-100 overflow-x-auto">
                <table className="w-full text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="text-left px-3 sm:px-6 py-3 sm:py-4 text-[10px] sm:text-xs font-bold text-gray-500 uppercase tracking-wider">
                        Title
                      </th>
                      <th className="text-left px-3 sm:px-6 py-3 sm:py-4 text-[10px] sm:text-xs font-bold text-gray-500 uppercase tracking-wider">
                        Preview
                      </th>
                      <th className="text-center px-3 sm:px-6 py-3 sm:py-4 text-[10px] sm:text-xs font-bold text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="text-right px-3 sm:px-6 py-3 sm:py-4 text-[10px] sm:text-xs font-bold text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedAds.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="text-center py-12 sm:py-16 text-gray-400">
                          <ImageIcon className="w-8 sm:w-10 h-8 sm:h-10 mx-auto mb-2 sm:mb-3 opacity-30" />
                          <p className="font-medium text-xs sm:text-base">No ads found</p>
                          <p className="text-[10px] sm:text-xs mt-1">Create your first ad to get started</p>
                        </td>
                      </tr>
                    ) : (
                      paginatedAds.map((ad, index) => (
                        <motion.tr
                          key={ad._id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors"
                        >
                          <td className="px-3 sm:px-6 py-3 sm:py-4">
                            <div>
                              <p className="font-semibold text-gray-800 text-xs sm:text-sm line-clamp-1">
                                {ad.title || "Untitled Ad"}
                              </p>
                              <p className="text-[10px] sm:text-xs text-gray-400 mt-0.5">
                                {new Date(ad.createdAt).toLocaleDateString("en-IN", {
                                  day: "numeric",
                                  month: "short",
                                  year: "numeric",
                                })}
                              </p>
                            </div>
                          </td>
                          <td className="px-3 sm:px-6 py-3 sm:py-4">
                            <div className="flex gap-1 sm:gap-2">
                              {ad.images.slice(0, 3).map((img, i) => (
                                <img
                                  key={i}
                                  src={(() => {
                                    if (!img) return "";
                                    // Handle both preview data and DB Base64 strings
                                    if (img.startsWith("data:") || img.startsWith("blob:")) return img;
                                    const base = img.startsWith("http") ? "" : BACKEND_BASE;
                                    return `${base}${img}${img.includes("?") ? "&" : "?"}t=${Date.now()}`;
                                  })()}
                                  alt=""
                                  className="w-10 sm:w-12 h-10 sm:h-12 object-cover rounded-lg border border-gray-200"
                                />
                              ))}
                              {ad.images.length > 3 && (
                                <div className="w-10 sm:w-12 h-10 sm:h-12 bg-gray-100 rounded-lg flex items-center justify-center text-xs text-gray-500 font-bold">
                                  +{ad.images.length - 3}
                                </div>
                              )}
                            </div>
                          </td>
                          <td className="px-3 sm:px-6 py-3 sm:py-4 text-center">
                            <button
                              onClick={() => handleToggle(ad?._id)}
                              className={`inline-flex items-center gap-1 px-2 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold transition-colors ${
                                ad?.isActive
                                  ? "bg-green-50 text-green-600 hover:bg-green-100"
                                  : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                              }`}
                            >
                              <div
                                className={`w-1.5 h-1.5 rounded-full ${
                                  ad?.isActive ? "bg-green-500" : "bg-gray-400"
                                }`}
                              />
                              <span className="hidden sm:inline">{ad?.isActive ? "Active" : "Inactive"}</span>
                              <span className="sm:hidden">{ad?.isActive ? "On" : "Off"}</span>
                            </button>
                          </td>
                          <td className="px-3 sm:px-6 py-3 sm:py-4 text-right">
                            <div className="flex items-center justify-end gap-1 sm:gap-2">
                              <button
                                onClick={() => openEditModal(ad)}
                                className="p-1.5 sm:p-2 rounded-lg text-blue-500 hover:bg-blue-50 transition-colors"
                                title="Edit"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDelete(ad?._id)}
                                className="p-1.5 sm:p-2 rounded-lg text-red-500 hover:bg-red-50 transition-colors"
                                title="Delete"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </motion.tr>
                      ))
                    )}
                  </tbody>
                </table>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-3 sm:px-6 py-3 sm:py-4 border-t border-gray-100 gap-3 sm:gap-0">
                    <p className="text-xs text-gray-500">
                      Page {currentPage} of {totalPages}
                    </p>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className="p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-30"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                        className="p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-30"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}

          {activeTab === "manage-rooms" && (
            <div className="bg-white rounded-lg sm:rounded-2xl shadow-sm border border-gray-100 overflow-x-auto">
              <table className="w-full text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-gray-100 italic">
                    <th className="text-left px-6 py-4 font-bold text-gray-500 uppercase">Room</th>
                    <th className="text-left px-6 py-4 font-bold text-gray-500 uppercase">Location & Type</th>
                    <th className="text-center px-6 py-4 font-bold text-gray-500 uppercase">Rates</th>
                    <th className="text-right px-6 py-4 font-bold text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {rooms?.map(room => (
                    <tr key={room?._id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img src={room?.image?.startsWith("/uploads") ? `${BACKEND_BASE}${room.image}` : room?.image} className="w-12 h-12 object-cover rounded-md border" />
                          <div>
                            <div className="font-bold text-gray-800">{room?.name}</div>
                            <div className="text-[10px] text-gray-400 line-clamp-1 max-w-[200px]">{room?.desc}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-xs font-semibold text-primary uppercase">{room?.location}</div>
                        <div className="text-[10px] text-gray-500">{room?.type}</div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex flex-col gap-1 items-center">
                          {room.epPrice && <span className="text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full font-bold">EP: {room.epPrice}</span>}
                          {room.cpPrice && <span className="text-[10px] bg-green-50 text-green-600 px-2 py-0.5 rounded-full font-bold">CP: {room.cpPrice}</span>}
                          {room.price && <span className="text-[10px] bg-amber-50 text-amber-600 px-2 py-0.5 rounded-full font-bold">Price: {room.price}</span>}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                         <div className="flex justify-end gap-2">
                            <button onClick={() => openEditRoomModal(room)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"><Edit className="w-4 h-4" /></button>
                            <button onClick={() => handleDeleteRoom(room._id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                         </div>
                      </td>
                    </tr>
                  ))}
                  {rooms.length === 0 && (
                    <tr>
                      <td colSpan={4} className="text-center py-12 text-gray-400">
                        No rooms found. Add your first room to manage rates.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === "manage-deals" && (
            <div className="bg-white rounded-lg sm:rounded-2xl shadow-sm border border-gray-100 overflow-x-auto">
              <table className="w-full text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-gray-100 italic">
                    <th className="text-left px-6 py-4 font-bold text-gray-500 uppercase">Offer</th>
                    <th className="text-left px-6 py-4 font-bold text-gray-500 uppercase">Code</th>
                    <th className="text-left px-6 py-4 font-bold text-gray-500 uppercase">Type & Location</th>
                    <th className="text-center px-6 py-4 font-bold text-gray-500 uppercase">Discount</th>
                    <th className="text-right px-6 py-4 font-bold text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {deals?.map(deal => (
                    <tr key={deal?._id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img src={deal?.image?.startsWith("/uploads") ? `${BACKEND_BASE}${deal.image}` : deal?.image} className="w-12 h-12 object-cover rounded-md border" />
                          <div>
                            <div className="font-bold text-gray-800">{deal?.title}</div>
                            <div className="text-[10px] text-gray-400">Valid to: {new Date(deal?.validTo)?.toLocaleDateString()}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-mono bg-gray-100 px-2 py-1 rounded text-xs font-bold text-[#2E6B8A]">
                          {deal?.promoCode || "---"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-xs font-semibold text-primary uppercase">{deal?.dealType}</div>
                        <div className="text-[10px] text-gray-500">{deal?.location}</div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="bg-red-50 text-red-600 px-2 py-1 rounded-full font-bold">
                          {deal?.discountPercentage}%
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                         <div className="flex justify-end gap-2">
                            <button onClick={() => openEditDealModal(deal)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"><Edit className="w-4 h-4" /></button>
                            <button onClick={() => handleDeleteDeal(deal._id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                         </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}







        </div>
        {/* FAQ Management Section */}
        {activeTab === "manage-faqs" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-[#2d6647] font-serif">Frequently Asked Questions</h2>
                <p className="text-sm text-gray-500">Manage location-specific and general FAQs</p>
              </div>
              <button
                onClick={() => {
                  resetFaqForm();
                  setIsFaqModalOpen(true);
                }}
                className="bg-[#3a7d5a] text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:shadow-lg transition-all"
              >
                <Plus className="w-5 h-5" /> Add New FAQ
              </button>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-gray-50/50 border-b border-gray-100">
                  <tr>
                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Question & Answer</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Location</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest text-center">Status</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {faqs.map((faq) => (
                    <tr key={faq._id} className="hover:bg-gray-50/50 transition-colors group">
                      <td className="px-6 py-4">
                        <p className="text-sm font-bold text-gray-900 mb-1">{faq.question}</p>
                        <p className="text-xs text-gray-500 line-clamp-1">{faq.answer}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          faq.location === 'CHENNAI' ? 'bg-blue-50 text-blue-600' :
                          faq.location === 'OOTY' ? 'bg-emerald-50 text-emerald-600' :
                          'bg-purple-50 text-purple-600'
                        }`}>
                          {faq.location}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center">
                          <button
                            onClick={() => handleToggleFaq(faq._id)}
                            className={`p-2 rounded-lg transition-all ${
                              faq.isActive ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-400"
                            }`}
                          >
                            {faq.isActive ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => {
                              setEditingFaq(faq);
                              setFaqForm({
                                question: faq.question,
                                answer: faq.answer,
                                location: faq.location,
                                order: faq.order
                              });
                              setIsFaqModalOpen(true);
                            }}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteFaq(faq._id)}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* Chat Details Modal */}
      <AnimatePresence>
        {selectedChat && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          >
            <motion.div
               initial={{ scale: 0.95 }}
               animate={{ scale: 1 }}
               className="bg-white w-full max-w-2xl h-[80vh] rounded-2xl flex flex-col overflow-hidden"
            >
               <div className="p-4 bg-gray-50 border-b flex justify-between items-center">
                  <h3 className="font-bold">Chat Transcript: {selectedChat.sessionId}</h3>
                  <button onClick={() => setSelectedChat(null)} className="p-2 hover:bg-gray-200 rounded-full">
                    <X className="w-5 h-5" />
                  </button>
               </div>
               <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50">
                  {selectedChat.messages.map((m, i) => (
                    <div key={i} className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}>
                      <div className={`p-3 rounded-xl max-w-[80%] text-sm ${
                        m.sender === "user" ? "bg-blue-600 text-white" : "bg-white border text-gray-800"
                      }`}>
                        {m.text}
                        <div className="text-[10px] mt-1 opacity-60">
                          {new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                    </div>
                  ))}
               </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Create / Edit Ad Modal */}
      <AnimatePresence>
        {isCreateModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-3 sm:p-4"
            onClick={() => {
              setIsCreateModalOpen(false);
              resetForm();
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25 }}
              className="bg-white rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-100 gap-2">
                <div className="flex items-center gap-2 sm:gap-3 flex-1">
                  <div className="w-8 sm:w-10 h-8 sm:h-10 bg-[#3a7d5a]/10 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                    <ImageIcon className="w-4 sm:w-5 h-4 sm:h-5 text-[#3a7d5a]" />
                  </div>
                  <h2 className="text-lg sm:text-xl font-bold text-gray-800 line-clamp-1" style={{ fontFamily: "var(--font-serif)" }}>
                    {editingAd ? "Edit Ad" : "Create New Ad"}
                  </h2>
                </div>
                <button
                  onClick={() => {
                    setIsCreateModalOpen(false);
                    resetForm();
                  }}
                  className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-4 sm:p-6 space-y-4 sm:space-y-5">
                {/* Title */}
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">Title</label>
                  <input
                    type="text"
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    placeholder="Enter title for admin reference (optional)"
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-50 border border-gray-200 rounded-lg sm:rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#3a7d5a]/20 focus:border-[#3a7d5a] transition-all"
                  />
                </div>

                {/* Exclusive Benefits */}
                <div className="grid grid-cols-1 gap-3">
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1">Exclusive Benefits (for Popup)</label>
                  <input
                    type="text"
                    value={formBenefit1}
                    onChange={(e) => setFormBenefit1(e.target.value)}
                    placeholder="Benefit 1 (e.g. Savings on Room Rates)"
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs"
                  />
                  <input
                    type="text"
                    value={formBenefit2}
                    onChange={(e) => setFormBenefit2(e.target.value)}
                    placeholder="Benefit 2 (e.g. Dining Perks)"
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs"
                  />
                  <input
                    type="text"
                    value={formBenefit3}
                    onChange={(e) => setFormBenefit3(e.target.value)}
                    placeholder="Benefit 3 (e.g. Spa Wellness)"
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs"
                  />
                </div>

                {/* Image Upload (only) */}
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">Upload Image</label>
                    <div
                      className="border-2 border-dashed border-gray-200 rounded-lg sm:rounded-xl p-3 sm:p-4 transition-colors hover:border-[#3a7d5a]/40 cursor-pointer"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      {formImagePreviews.length > 0 ? (
                        <div className="flex items-center justify-center">
                          <div className="relative">
                            <img
                              src={formImagePreviews[0]}
                              alt="preview"
                              className="w-32 sm:w-48 h-32 sm:h-48 md:w-64 md:h-64 object-cover rounded-lg sm:rounded-xl border border-gray-200"
                            />
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                removeImage();
                              }}
                              className="absolute -top-2 -right-2 w-5 sm:w-6 h-5 sm:h-6 bg-red-500 text-white rounded-full flex items-center justify-center transition-opacity shadow-md"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center py-4 sm:py-6">
                          <Upload className="w-6 sm:w-8 h-6 sm:h-8 text-gray-300 mx-auto mb-2" />
                          <p className="text-xs sm:text-sm text-gray-500">Click to upload an image</p>
                          <p className="text-[10px] sm:text-xs text-gray-400 mt-1">JPEG, PNG, WebP — Max 5MB</p>
                        </div>
                      )}
                    </div>
                  </div>

                {/* ...existing code — single image upload block above is used; removed duplicate multi-image UI */}
              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-100">
                <button
                  onClick={() => {
                    setIsCreateModalOpen(false);
                    resetForm();
                  }}
                  className="px-5 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="px-6 py-2.5 bg-[#3a7d5a] hover:bg-[#2d6647] text-white text-sm font-bold rounded-xl transition-colors disabled:opacity-50 flex items-center gap-2 shadow-md"
                >
                  {isLoading ? (
                    <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  ) : null}
                  {editingAd ? "Update Ad" : "Create Ad"}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Deal Create / Edit Modal */}
      <AnimatePresence>
        {isDealModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 overflow-y-auto"
            onClick={resetDealForm}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              className="bg-white rounded-2xl w-full max-w-2xl my-8"
              onClick={e => e.stopPropagation()}
            >
               <div className="p-6 border-b flex justify-between items-center">
                  <h2 className="text-xl font-bold">{editingDeal ? "Edit Deal" : "Create New Deal"}</h2>
                  <button onClick={() => { setIsDealModalOpen(false); resetDealForm(); }} className="hover:bg-gray-100 p-2 rounded-full"><X className="w-5 h-5" /></button>
               </div>
               <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[70vh] overflow-y-auto">
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold mb-1 uppercase">Deal Title</label>
                    <input type="text" className="w-full border p-2 rounded-lg" value={dealForm.title} onChange={e => setDealForm({...dealForm, title: e.target.value})} />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold mb-1 uppercase">Description</label>
                    <textarea className="w-full border p-2 rounded-lg" rows={3} value={dealForm.description} onChange={e => setDealForm({...dealForm, description: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-xs font-bold mb-1 uppercase">Type</label>
                    <select className="w-full border p-2 rounded-lg" value={dealForm.dealType} onChange={e => setDealForm({...dealForm, dealType: e.target.value})}>
                      <option value="DealsOfDay">Deal of Day</option>
                      <option value="LastMinute">Last Minute</option>
                      <option value="LOS">Extended Stay</option>
                      <option value="Family">Family</option>
                      <option value="Corporate">Corporate</option>
                      <option value="Group">Group</option>
                      <option value="DayUse">Day Use</option>
                      <option value="AdvanceBooking">Advance Booking</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold mb-1 uppercase">Location</label>
                    <select className="w-full border p-2 rounded-lg" value={dealForm.location} onChange={e => setDealForm({...dealForm, location: e.target.value})}>
                      <option value="Chennai">Chennai</option>
                      <option value="Ooty">Ooty</option>
                      <option value="Both">Both</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold mb-1 uppercase">Discount %</label>
                    <input type="number" className="w-full border p-2 rounded-lg" value={dealForm.discountPercentage} onChange={e => setDealForm({...dealForm, discountPercentage: Number(e.target.value)})} />
                  </div>
                  <div>
                    <label className="block text-xs font-bold mb-1 uppercase">Custom Price</label>
                    <input type="text" className="w-full border p-2 rounded-lg" value={dealForm.customPrice} onChange={e => setDealForm({...dealForm, customPrice: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-xs font-bold mb-1 uppercase text-[#2E6B8A]">Promo/Offer Code</label>
                    <input 
                      type="text" 
                      placeholder="e.g. SUMMER25" 
                      className="w-full border-2 border-[#2E6B8A]/20 p-2 rounded-lg font-bold" 
                      value={dealForm.promoCode} 
                      onChange={e => setDealForm({...dealForm, promoCode: e.target.value.toUpperCase()})} 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold mb-1 uppercase">Valid From</label>
                    <input type="date" className="w-full border p-2 rounded-lg" value={dealForm.validFrom} onChange={e => setDealForm({...dealForm, validFrom: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-xs font-bold mb-1 uppercase">Valid To</label>
                    <input type="date" className="w-full border p-2 rounded-lg" value={dealForm.validTo} onChange={e => setDealForm({...dealForm, validTo: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-xs font-bold mb-1 uppercase">Priority</label>
                    <input type="number" className="w-full border p-2 rounded-lg" value={dealForm.priority} onChange={e => setDealForm({...dealForm, priority: Number(e.target.value)})} />
                  </div>
                  <div className="flex items-center gap-4 pt-6">
                    <label className="flex items-center gap-2 text-sm font-bold">
                      <input type="checkbox" checked={dealForm.isPopup} onChange={e => setDealForm({...dealForm, isPopup: e.target.checked})} />
                      Highlight as Popup
                    </label>
                  </div>

                  <div className="md:col-span-2 pt-4">
                     <label className="block text-xs font-bold mb-1 uppercase">Deal Image</label>
                     <div 
                        onClick={() => fileInputRef.current?.click()}
                        className="border-2 border-dashed p-8 rounded-xl text-center cursor-pointer hover:bg-gray-50 bg-gray-50/30"
                     >
                        {formImagePreviews.length > 0 ? (
                           <img src={formImagePreviews[0]} className="h-32 mx-auto rounded-lg shadow-sm" />
                        ) : (
                           <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                        )}
                        <p className="text-xs text-gray-500 mt-2">Click to upload deal banner</p>
                     </div>
                  </div>
               </div>
               <div className="p-6 border-t flex justify-end gap-3">
                  <button onClick={() => { setIsDealModalOpen(false); resetDealForm(); }} className="px-6 py-2 border rounded-xl hover:bg-gray-50">Cancel</button>
                  <button onClick={handleDealSubmit} className="px-8 py-2 bg-primary text-white font-bold rounded-xl hover:shadow-lg transition-all">
                    {isLoading ? "Saving..." : "Save Deal"}
                  </button>
               </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Room Create / Edit Modal */}
      <AnimatePresence>
        {isRoomModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 overflow-y-auto"
            onClick={resetRoomForm}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              className="bg-white rounded-2xl w-full max-w-2xl my-8"
              onClick={e => e.stopPropagation()}
            >
               <div className="p-6 border-b flex justify-between items-center">
                  <h2 className="text-xl font-bold">{editingRoom ? "Edit Room" : "Create New Room"}</h2>
                  <button onClick={() => { setIsRoomModalOpen(false); resetRoomForm(); }} className="hover:bg-gray-100 p-2 rounded-full"><X className="w-5 h-5" /></button>
               </div>
               <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[70vh] overflow-y-auto">
                  <div>
                    <label className="block text-xs font-bold mb-1 uppercase">Room Name</label>
                    <input type="text" className="w-full border p-2 rounded-lg" value={roomForm.name} onChange={e => setRoomForm({...roomForm, name: e.target.value})} placeholder="e.g. Standard Room" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold mb-1 uppercase">Location</label>
                    <select className="w-full border p-2 rounded-lg" value={roomForm.location} onChange={e => setRoomForm({...roomForm, location: e.target.value as any})}>
                      <option value="CHENNAI">Chennai</option>
                      <option value="OOTY">Ooty</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold mb-1 uppercase">Room Type/Label</label>
                    <input type="text" className="w-full border p-2 rounded-lg" value={roomForm.type} onChange={e => setRoomForm({...roomForm, type: e.target.value})} placeholder="e.g. Business Comfort" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold mb-1 uppercase">Display Order</label>
                    <input type="number" className="w-full border p-2 rounded-lg" value={roomForm.order} onChange={e => setRoomForm({...roomForm, order: Number(e.target.value)})} />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold mb-1 uppercase">Description</label>
                    <textarea className="w-full border p-2 rounded-lg" rows={2} value={roomForm.desc} onChange={e => setRoomForm({...roomForm, desc: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-xs font-bold mb-1 uppercase">EP Price (Room Only)</label>
                    <input type="text" className="w-full border p-2 rounded-lg" value={roomForm.epPrice} onChange={e => setRoomForm({...roomForm, epPrice: e.target.value})} placeholder="e.g. ₹2,450" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold mb-1 uppercase">CP Price (W/ Breakfast)</label>
                    <input type="text" className="w-full border p-2 rounded-lg" value={roomForm.cpPrice} onChange={e => setRoomForm({...roomForm, cpPrice: e.target.value})} placeholder="e.g. ₹2,650" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold mb-1 uppercase">Amenities (comma separated)</label>
                    <input type="text" className="w-full border p-2 rounded-lg" value={roomForm.amenities} onChange={e => setRoomForm({...roomForm, amenities: e.target.value})} placeholder="WiFi, TV, AC, etc." />
                  </div>

                  <div className="md:col-span-2 pt-4">
                     <label className="block text-xs font-bold mb-1 uppercase">Room Image</label>
                     <div 
                        onClick={() => fileInputRef.current?.click()}
                        className="border-2 border-dashed p-8 rounded-xl text-center cursor-pointer hover:bg-gray-50 bg-gray-50/30"
                     >
                        {formImagePreviews.length > 0 ? (
                           <img src={formImagePreviews[0]} className="h-32 mx-auto rounded-lg shadow-sm" />
                        ) : (
                           <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                        )}
                        <p className="text-xs text-gray-500 mt-2">Click to upload room image</p>
                     </div>
                  </div>
               </div>
               <div className="p-6 border-t flex justify-end gap-3">
                  <button onClick={() => { setIsRoomModalOpen(false); resetRoomForm(); }} className="px-6 py-2 border rounded-xl hover:bg-gray-100">Cancel</button>
                  <button onClick={handleRoomSubmit} className="px-8 py-2 bg-[#2E6B8A] text-white font-bold rounded-xl hover:shadow-lg transition-all">
                    {isLoading ? "Saving..." : "Save Room"}
                  </button>
               </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* FAQ Create / Edit Modal */}
      <AnimatePresence>
        {isFaqModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
            onClick={() => {
              setIsFaqModalOpen(false);
              resetFaqForm();
            }}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              className="bg-white rounded-2xl w-full max-w-lg shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <div className="p-6 border-b flex justify-between items-center">
                <h2 className="text-xl font-bold font-serif text-[#2d6647]">
                  {editingFaq ? "Edit FAQ" : "Add New FAQ"}
                </h2>
                <button 
                  onClick={() => { setIsFaqModalOpen(false); resetFaqForm(); }} 
                  className="hover:bg-gray-100 p-2 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-bold mb-1.5 uppercase tracking-wider text-gray-500">Question</label>
                  <input 
                    type="text" 
                    className="w-full border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all" 
                    value={faqForm.question} 
                    onChange={e => setFaqForm({...faqForm, question: e.target.value})} 
                    placeholder="e.g. Do you offer free Wi-Fi?"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1.5 uppercase tracking-wider text-gray-500">Answer</label>
                  <textarea 
                    className="w-full border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all" 
                    rows={4} 
                    value={faqForm.answer} 
                    onChange={e => setFaqForm({...faqForm, answer: e.target.value})} 
                    placeholder="Provide a detailed answer..."
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold mb-1.5 uppercase tracking-wider text-gray-500">Location</label>
                    <select 
                      className="w-full border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all" 
                      value={faqForm.location} 
                      onChange={e => setFaqForm({...faqForm, location: e.target.value as any})}
                    >
                      <option value="GENERAL">General</option>
                      <option value="CHENNAI">Chennai</option>
                      <option value="OOTY">Ooty</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold mb-1.5 uppercase tracking-wider text-gray-500">Display Order</label>
                    <input 
                      type="number" 
                      className="w-full border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all" 
                      value={faqForm.order} 
                      onChange={e => setFaqForm({...faqForm, order: Number(e.target.value)})} 
                    />
                  </div>
                </div>
              </div>
              <div className="p-6 border-t flex justify-end gap-3 bg-gray-50/50 rounded-b-2xl">
                <button 
                  onClick={() => { setIsFaqModalOpen(false); resetFaqForm(); }} 
                  className="px-6 py-2.5 border border-gray-200 rounded-xl hover:bg-white hover:shadow-sm transition-all font-medium text-gray-600"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleFaqSubmit} 
                  disabled={isLoading}
                  className="px-8 py-2.5 bg-[#3a7d5a] text-white font-bold rounded-xl hover:bg-[#2d6647] hover:shadow-lg transition-all disabled:opacity-50"
                >
                  {isLoading ? "Saving..." : "Save FAQ"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}