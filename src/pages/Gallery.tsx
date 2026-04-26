import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams, useParams } from "react-router-dom";
import SectionHeading from "@/components/SectionHeading";
import { X, ZoomIn, Search, RefreshCw } from "lucide-react";
import SEO from "@/components/SEO";

// Load all images dynamically from the Gallery assets - prioritizing webp
const allImagesRaw = import.meta.glob<{ default: string }>(
  "../assets/Gallery/**/*.{jpg,jpeg,png,JPG,JPEG,webp}",
  { eager: true, query: "?url" }
);

// Group by base path to prioritize webp
const prioritizedImages: Record<string, string> = {};
Object.entries(allImagesRaw).forEach(([path, module]) => {
  const basePath = path.replace(/\.(jpg|jpeg|png|JPG|JPEG|webp)$/i, '');
  const ext = path.split('.').pop()?.toLowerCase();
  
  if (!prioritizedImages[basePath] || ext === 'webp') {
    prioritizedImages[basePath] = module.default;
  }
});

interface GalleryItem {
  id: string;
  src: string;
  location: "ooty" | "chennai";
  category: string;
}

const ALL_GALLERY_IMAGES: GalleryItem[] = Object.entries(prioritizedImages).map(([path, src]) => {
  const pathLower = path.toLowerCase();
  const isOoty = pathLower.includes("ooty");
  const location = isOoty ? "ooty" : "chennai";
  
  const parts = path.split("/");
  // Category is usually the folder before the filename, unless it's the location folder itself
  const folderName = parts[parts.length - 2];
  const categoryName = (folderName.toLowerCase().includes("ooty") || folderName.toLowerCase().includes("chennai")) 
    ? "General" 
    : folderName.replace(/-/g, " ");
  
  return {
    id: path,
    src: src,
    location,
    category: categoryName,
  };
});

type TabKey = "all" | "chennai" | "ooty";

export default function Gallery() {
  const { locationId } = useParams();
  const [searchParams] = useSearchParams();
  
  const initialTabFromPath = locationId?.toLowerCase() === "ooty" ? "ooty" : locationId?.toLowerCase() === "chennai" ? "chennai" : null;
  const initialTabFromSearch = searchParams.get("location") === "ooty" ? "ooty" : searchParams.get("location") === "chennai" ? "chennai" : "all";
  
  const [tab, setTab] = useState<TabKey>((initialTabFromPath || initialTabFromSearch) as TabKey);
  const [category, setCategory] = useState<string>("All");
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [randomImages, setRandomImages] = useState<GalleryItem[]>([]);

  // Function to get 25 random images
  const shuffleAndSelect = () => {
    const shuffled = [...ALL_GALLERY_IMAGES].sort(() => 0.5 - Math.random());
    setRandomImages(shuffled.slice(0, 25));
  };

  // Initialize random images for "All Photos"
  useEffect(() => {
    shuffleAndSelect();
  }, []);

  const handleTabChange = (newTab: TabKey) => {
    setTab(newTab);
    setCategory("All");
    if (newTab === "all") {
      shuffleAndSelect();
    }
  };

  // Get categories for current location
  const categories = useMemo(() => {
    if (tab === "all") return ["All"];
    const locImages = ALL_GALLERY_IMAGES.filter(img => img.location === tab);
    const uniqueCats = Array.from(new Set(locImages.map(img => img.category)));
    return ["All", ...uniqueCats.sort()];
  }, [tab]);

  // Filtered images
  const displayImages = useMemo(() => {
    if (tab === "all") return randomImages;
    
    let filtered = ALL_GALLERY_IMAGES.filter(img => img.location === tab);
    if (category !== "All") {
      filtered = filtered.filter(img => img.category === category);
    }
    return filtered;
  }, [tab, category, randomImages]);

  const images = displayImages;

  return (
    <div className="pt-24">
      <SEO 
        title={tab === "all" ? "Visual Journey - DrizzleDrop Inn Photo Gallery" : `${tab.charAt(0).toUpperCase() + tab.slice(1)} Gallery - DrizzleDrop Inn`}
        description={`Explore stunning photos of our ${tab === "all" ? "Ooty and Chennai properties" : tab + " property"}, including luxury rooms, valley views, and amenities.`}
        url={`https://drizzledropinn.com/${locationId ? locationId + '/gallery' : 'gallery'}`}
      />
      <section className="section-padding">
        <div className="container-luxury">
          <div className="text-center mb-4">
            <h1 className="sr-only">DrizzleDrop Inn Photo Gallery - Ooty and Chennai Properties</h1>
          </div>
          <SectionHeading
            label="Gallery"
            title="Visual Journey"
            subtitle="Explore our properties through stunning imagery"
          />

          {/* Tabs */}
          <div className="flex justify-center gap-4 mb-8">
            {(["all", "chennai", "ooty"] as const).map((loc) => (
              <button
                key={loc}
                onClick={() => handleTabChange(loc)}
                className={`flex items-center gap-2 px-6 py-2.5 text-sm font-medium transition-all duration-300 ${tab === loc
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
              >
                {loc === "all" && <RefreshCw className={`w-3.5 h-3.5 ${tab === "all" ? "animate-spin-slow" : ""}`} />}
                {loc === "all" ? "All Photos" : loc === "chennai" ? "Chennai" : "Ooty"}
              </button>
            ))}
          </div>

          {/* Sub-categories/Folders Filter */}
          <AnimatePresence mode="wait">
            {tab !== "all" && categories.length > 1 && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex flex-wrap justify-center gap-2 mb-12"
              >
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className={`px-4 py-1.5 text-[10px] uppercase tracking-wider font-bold rounded-full border transition-all duration-300 ${category === cat
                      ? "bg-primary/10 border-primary text-primary"
                      : "bg-transparent border-transparent text-muted-foreground hover:text-foreground"
                      }`}
                  >
                    {cat}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Masonry Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`${tab}-${category}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-2 sm:gap-3 space-y-2 sm:space-y-3"
            >
              {images.map((img, i) => (
                <motion.div
                  key={img.id + i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ delay: Math.min(i * 0.02, 0.4), duration: 0.4 }}
                  className="break-inside-avoid group relative overflow-hidden cursor-pointer mb-2 sm:mb-3 rounded-lg"
                  onClick={() => setLightbox(img.src)}
                >
                  <img
                    src={img.src}
                    alt={`${img.location} ${img.category} at DrizzleDrop Inn`}
                    className={`w-full object-cover group-hover:scale-110 transition-transform duration-1000 ${
                      i % 4 === 0 ? "h-48 sm:h-64 md:h-72 lg:h-80" : 
                      i % 4 === 1 ? "h-40 sm:h-48 md:h-56" : 
                      i % 4 === 2 ? "h-48 sm:h-56 md:h-64 lg:h-72" : 
                      "h-44 sm:h-56 md:h-60 lg:h-64"
                    }`}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-all duration-500 flex flex-col items-center justify-end pb-6">
                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 text-center px-4">
                      {tab !== 'all' && img.category !== 'General' && (
                        <span className="text-[10px] text-primary font-bold tracking-widest uppercase mb-1 block opacity-0 group-hover:opacity-100 transition-opacity delay-100">
                          {img.category}
                        </span>
                      )}
                      <ZoomIn className="w-6 h-6 text-white mx-auto opacity-0 group-hover:opacity-100 transition-all duration-500 scale-50 group-hover:scale-100" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-3 sm:p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: "spring", damping: 22 }}
              className="relative max-w-5xl max-h-[85vh] sm:max-h-[90vh] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={lightbox}
                alt="Gallery full view"
                className="w-full h-full object-contain max-h-[83vh] sm:max-h-[88vh] rounded-lg"
              />
              <button
                onClick={() => setLightbox(null)}
                className="absolute top-2 sm:top-3 right-2 sm:right-3 w-8 sm:w-10 h-8 sm:h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors border border-white/20"
              >
                <X className="w-4 sm:w-5 h-4 sm:h-5 text-white" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
