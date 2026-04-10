import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "react-router-dom";
import SectionHeading from "@/components/SectionHeading";
import { X, ZoomIn } from "lucide-react";

// ── ALL 71 images from asset_images ──────────────────────────────────────────
import img00 from "@/asset_images/WhatsApp Image 2026-03-16 at 3.46.33 PM.jpeg";
import img01 from "@/asset_images/WhatsApp Image 2026-03-16 at 3.46.33 PM (1).jpeg";
import img02 from "@/asset_images/WhatsApp Image 2026-03-16 at 3.46.33 PM (2).jpeg";
import img03 from "@/asset_images/WhatsApp Image 2026-03-16 at 3.46.33 PM (3).jpeg";
import img04 from "@/asset_images/WhatsApp Image 2026-03-16 at 3.46.33 PM (4).jpeg";
import img05 from "@/asset_images/WhatsApp Image 2026-03-16 at 3.46.33 PM (5).jpeg";
import img06 from "@/asset_images/WhatsApp Image 2026-03-16 at 3.46.33 PM (6).jpeg";
import img07 from "@/asset_images/WhatsApp Image 2026-03-16 at 3.46.33 PM (7).jpeg";
import img08 from "@/asset_images/WhatsApp Image 2026-03-16 at 3.46.33 PM (8).jpeg";
import img09 from "@/asset_images/WhatsApp Image 2026-03-16 at 3.46.33 PM (9).jpeg";
import img10 from "@/asset_images/WhatsApp Image 2026-03-16 at 3.46.33 PM (10).jpeg";
import img11 from "@/asset_images/WhatsApp Image 2026-03-16 at 3.46.33 PM (11).jpeg";
import img12 from "@/asset_images/WhatsApp Image 2026-03-16 at 3.46.33 PM (12).jpeg";
import img13 from "@/asset_images/WhatsApp Image 2026-03-16 at 3.46.33 PM (13).jpeg";
import img14 from "@/asset_images/WhatsApp Image 2026-03-16 at 3.46.33 PM (14).jpeg";
import img15 from "@/asset_images/WhatsApp Image 2026-03-16 at 3.46.33 PM (15).jpeg";
import img16 from "@/asset_images/WhatsApp Image 2026-03-16 at 3.46.33 PM (16).jpeg";
import img17 from "@/asset_images/WhatsApp Image 2026-03-16 at 3.46.33 PM (17).jpeg";
import img18 from "@/asset_images/WhatsApp Image 2026-03-16 at 3.46.33 PM (18).jpeg";
import img19 from "@/asset_images/WhatsApp Image 2026-03-16 at 3.46.33 PM (19).jpeg";
import img20 from "@/asset_images/WhatsApp Image 2026-03-16 at 3.46.33 PM (20).jpeg";
import img21 from "@/asset_images/WhatsApp Image 2026-03-16 at 3.46.33 PM (21).jpeg";
import img22 from "@/asset_images/WhatsApp Image 2026-03-16 at 3.46.33 PM (22).jpeg";
import img23 from "@/asset_images/WhatsApp Image 2026-03-16 at 3.46.33 PM (23).jpeg";
import img24 from "@/asset_images/WhatsApp Image 2026-03-16 at 3.46.33 PM (24).jpeg";
import img25 from "@/asset_images/WhatsApp Image 2026-03-16 at 3.46.33 PM (25).jpeg";
import img26 from "@/asset_images/WhatsApp Image 2026-03-16 at 3.46.33 PM (26).jpeg";
import img27 from "@/asset_images/WhatsApp Image 2026-03-16 at 3.46.33 PM (27).jpeg";
import img28 from "@/asset_images/WhatsApp Image 2026-03-16 at 3.46.33 PM (28).jpeg";
import img29 from "@/asset_images/WhatsApp Image 2026-03-16 at 3.46.33 PM (29).jpeg";
import img30 from "@/asset_images/WhatsApp Image 2026-03-16 at 3.46.33 PM (30).jpeg";
import img31 from "@/asset_images/WhatsApp Image 2026-03-16 at 3.46.33 PM (31).jpeg";
import img32 from "@/asset_images/WhatsApp Image 2026-03-16 at 3.46.33 PM (32).jpeg";
import img33 from "@/asset_images/WhatsApp Image 2026-03-16 at 3.46.33 PM (33).jpeg";
import img34 from "@/asset_images/WhatsApp Image 2026-03-16 at 3.46.33 PM (34).jpeg";
import img35 from "@/asset_images/WhatsApp Image 2026-03-16 at 3.46.33 PM (35).jpeg";
import img36 from "@/asset_images/WhatsApp Image 2026-03-16 at 3.46.33 PM (36).jpeg";
import img37 from "@/asset_images/WhatsApp Image 2026-03-16 at 3.46.33 PM (37).jpeg";
import img38 from "@/asset_images/WhatsApp Image 2026-03-16 at 3.46.33 PM (38).jpeg";
import img39 from "@/asset_images/WhatsApp Image 2026-03-16 at 3.46.33 PM (39).jpeg";
import img40 from "@/asset_images/WhatsApp Image 2026-03-16 at 3.46.33 PM (40).jpeg";
import img41 from "@/asset_images/WhatsApp Image 2026-03-16 at 3.46.33 PM (41).jpeg";
import img42 from "@/asset_images/WhatsApp Image 2026-03-16 at 3.46.33 PM (42).jpeg";
import img43 from "@/asset_images/WhatsApp Image 2026-03-16 at 3.46.33 PM (43).jpeg";
import img44 from "@/asset_images/WhatsApp Image 2026-03-16 at 3.46.33 PM (44).jpeg";
import img45 from "@/asset_images/WhatsApp Image 2026-03-16 at 3.46.33 PM (45).jpeg";
import img46 from "@/asset_images/WhatsApp Image 2026-03-16 at 3.46.33 PM (46).jpeg";
import img47 from "@/asset_images/WhatsApp Image 2026-03-16 at 3.46.33 PM (47).jpeg";
import img48 from "@/asset_images/WhatsApp Image 2026-03-16 at 3.46.33 PM (48).jpeg";
import img49 from "@/asset_images/WhatsApp Image 2026-03-16 at 3.46.33 PM (49).jpeg";
import img50 from "@/asset_images/WhatsApp Image 2026-03-16 at 3.46.33 PM (50).jpeg";
import img51 from "@/asset_images/WhatsApp Image 2026-03-16 at 3.46.33 PM (51).jpeg";
import img52 from "@/asset_images/WhatsApp Image 2026-03-16 at 3.46.33 PM (52).jpeg";
import img53 from "@/asset_images/WhatsApp Image 2026-03-16 at 3.46.33 PM (53).jpeg";
import img54 from "@/asset_images/WhatsApp Image 2026-03-16 at 3.46.33 PM (54).jpeg";
import img55 from "@/asset_images/WhatsApp Image 2026-03-16 at 3.46.33 PM (55).jpeg";
import img56 from "@/asset_images/WhatsApp Image 2026-03-16 at 3.46.33 PM (56).jpeg";
import img57 from "@/asset_images/WhatsApp Image 2026-03-16 at 3.46.33 PM (57).jpeg";
import img58 from "@/asset_images/WhatsApp Image 2026-03-16 at 3.46.33 PM (58).jpeg";
import img59 from "@/asset_images/WhatsApp Image 2026-03-16 at 3.46.33 PM (59).jpeg";
import img60 from "@/asset_images/WhatsApp Image 2026-03-16 at 3.46.33 PM (60).jpeg";
import img61 from "@/asset_images/WhatsApp Image 2026-03-16 at 3.46.33 PM (61).jpeg";
import img62 from "@/asset_images/WhatsApp Image 2026-03-16 at 3.46.33 PM (62).jpeg";
import img63 from "@/asset_images/WhatsApp Image 2026-03-16 at 3.46.33 PM (63).jpeg";
import img64 from "@/asset_images/WhatsApp Image 2026-03-16 at 3.46.33 PM (64).jpeg";
import img65 from "@/asset_images/WhatsApp Image 2026-03-16 at 3.46.33 PM (65).jpeg";
import img66 from "@/asset_images/WhatsApp Image 2026-03-16 at 3.46.33 PM (66).jpeg";
import img67 from "@/asset_images/WhatsApp Image 2026-03-16 at 3.46.33 PM (67).jpeg";
import img68 from "@/asset_images/WhatsApp Image 2026-03-16 at 3.46.33 PM (68).jpeg";
import img69 from "@/asset_images/WhatsApp Image 2026-03-16 at 3.46.33 PM (69).jpeg";
import img70 from "@/asset_images/WhatsApp Image 2026-03-16 at 3.46.33 PM (70).jpeg";

const allImages = [
  img00, img01, img02, img03, img04, img05, img06, img07, img08, img09,
  img10, img11, img12, img13, img14, img15, img16, img17, img18, img19,
  img20, img21, img22, img23, img24, img25, img26, img27, img28, img29,
  img30, img31, img32, img33, img34, img35, img36, img37, img38, img39,
  img40, img41, img42, img43, img44, img45, img46, img47, img48, img49,
  img50, img51, img52, img53, img54, img55, img56, img57, img58, img59,
  img60, img61, img62, img63, img64, img65, img66, img67, img68, img69,
  img70,
];

const chennaiImages = [
  img00, img01, img02, img03, img04, img05, img06, img07, img08, img09,
  img10, img11, img12, img13, img14, img15, img16, img17, img18, img19,
  img20, img21, img22, img23, img24, img25, img26, img27, img28, img29,
  img30, img31, img32, img33, img34,
];

const ootyImages = [
  img35, img36, img37, img38, img39, img40, img41, img42, img43, img44,
  img45, img46, img47, img48, img49, img50, img51, img52, img53, img54,
  img55, img56, img57, img58, img59, img60, img61, img62, img63, img64,
  img65, img66, img67, img68, img69, img70,
];

type TabKey = "all" | "chennai" | "ooty";

const tabImages: Record<TabKey, string[]> = {
  all: allImages,
  chennai: chennaiImages,
  ooty: ootyImages,
};

import { useParams } from "react-router-dom";

export default function Gallery() {
  const { locationId } = useParams();
  const [searchParams] = useSearchParams();
  
  // Set initial tab based on params (URL path or query string)
  const initialTabFromPath = locationId?.toLowerCase() === "ooty" ? "ooty" : locationId?.toLowerCase() === "chennai" ? "chennai" : null;
  const initialTabFromSearch = searchParams.get("location") === "ooty" ? "ooty" : searchParams.get("location") === "chennai" ? "chennai" : "all";
  
  const [tab, setTab] = useState<TabKey>((initialTabFromPath || initialTabFromSearch) as TabKey);
  const [lightbox, setLightbox] = useState<string | null>(null);

  const images = tabImages[tab];

  return (
    <div className="pt-24">
      <section className="section-padding">
        <div className="container-luxury">
          <SectionHeading
            label="Gallery"
            title="Visual Journey"
            subtitle="Explore our properties through stunning imagery"
          />

          {/* Tabs */}
          <div className="flex justify-center gap-4 mb-12">
            {(["all", "chennai", "ooty"] as const).map((loc) => (
              <button
                key={loc}
                onClick={() => setTab(loc)}
                className={`px-6 py-2.5 text-sm font-medium transition-all duration-300 ${tab === loc
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
              >
                {loc === "all" ? "All Photos" : loc === "chennai" ? "Chennai" : "Ooty"}
              </button>
            ))}
          </div>

          {/* Masonry Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-2 sm:gap-3 space-y-2 sm:space-y-3"
            >
              {images.map((src, i) => (
                <motion.div
                  key={`${tab}-${i}`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ delay: Math.min(i * 0.04, 0.5), duration: 0.4 }}
                  className="break-inside-avoid group relative overflow-hidden cursor-pointer mb-2 sm:mb-3 rounded"
                  onClick={() => setLightbox(src)}
                >
                  <img
                    src={src}
                    alt={`DrizzleDrop Hotels photo ${i + 1}`}
                    className={`w-full object-cover group-hover:scale-105 transition-transform duration-700 ${
                      i % 4 === 0 ? "h-48 sm:h-64 md:h-72 lg:h-80" : 
                      i % 4 === 1 ? "h-40 sm:h-48 md:h-56" : 
                      i % 4 === 2 ? "h-48 sm:h-56 md:h-64 lg:h-72" : 
                      "h-44 sm:h-56 md:h-60 lg:h-64"
                    }`}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                    <ZoomIn className="w-5 sm:w-6 lg:w-7 h-5 sm:h-6 lg:h-7 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100" />
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
