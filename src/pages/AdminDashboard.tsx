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
  
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import driLogo from "@/assets/drilogo.png";

const BACKEND_BASE = "https://drizzle-background-5.onrender.com";
const API_BASE = `${BACKEND_BASE}/api`;

interface Ad {
  _id: string;
  title: string;
  description: string;
  images: string[];
  redirectLink: string;
  isActive: boolean;
  createdAt: string;
}

type SidebarItem = "dashboard" | "manage-ads" | "settings";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { admin, token, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<SidebarItem>("manage-ads");
  const [ads, setAds] = useState<Ad[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingAd, setEditingAd] = useState<Ad | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Form state (image-only ad)
  const [formTitle, setFormTitle] = useState("");
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

  useEffect(() => {
    fetchAds();
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
  setEditingAd(null);
  };

  // Open edit modal
  const openEditModal = (ad: Ad) => {
    setEditingAd(ad);
  // Populate title and image preview when editing
  setFormTitle(ad.title || "");
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
  // Title is kept for admin-only metadata and stored on the ad record
  formData.append("title", formTitle || "");

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

  // Handle logout
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const sidebarItems: { id: SidebarItem; label: string; icon: React.ElementType }[] = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "manage-ads", label: "Manage Ads", icon: ImageIcon },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#f5f6fa]" style={{ fontFamily: "var(--font-sans)" }}>
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
            {activeTab === "settings" && "Settings"}
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
                                  src={`${BACKEND_BASE}${img}`}
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
                              onClick={() => handleToggle(ad._id)}
                              className={`inline-flex items-center gap-1 px-2 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold transition-colors ${
                                ad.isActive
                                  ? "bg-green-50 text-green-600 hover:bg-green-100"
                                  : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                              }`}
                            >
                              <div
                                className={`w-1.5 h-1.5 rounded-full ${
                                  ad.isActive ? "bg-green-500" : "bg-gray-400"
                                }`}
                              />
                              <span className="hidden sm:inline">{ad.isActive ? "Active" : "Inactive"}</span>
                              <span className="sm:hidden">{ad.isActive ? "On" : "Off"}</span>
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
                                onClick={() => handleDelete(ad._id)}
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

          {/* manage-rooms removed per request */}

          {activeTab === "settings" && (
            <div className="bg-white rounded-lg sm:rounded-2xl p-6 sm:p-12 text-center shadow-sm border border-gray-100">
              <Settings className="w-8 sm:w-12 h-8 sm:h-12 text-gray-300 mx-auto mb-3 sm:mb-4" />
              <h3 className="text-base sm:text-lg font-bold text-gray-700" style={{ fontFamily: "var(--font-serif)" }}>
                Settings
              </h3>
              <p className="text-xs sm:text-sm text-gray-400 mt-2">Coming soon — manage your admin profile and preferences</p>
            </div>
          )}
        </div>
      </main>

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
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".jpg,.jpeg,.png,.webp,image/*"
                      onChange={handleImageSelect}
                      className="hidden"
                    />
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
    </div>
  );
}