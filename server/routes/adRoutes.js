const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const authMiddleware = require("../middleware/authMiddleware");
const {
  createAd,
  getAds,
  getActiveAds,
  updateAd,
  deleteAd,
  toggleAd,
} = require("../controllers/adController");

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "..", "uploads"));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, `ad-${uniqueSuffix}${ext}`);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only JPEG, PNG, WebP, and GIF images are allowed."), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max per file
});

// PUBLIC: Get active ads (for homepage)
router.get("/active", getActiveAds);

// PROTECTED: Admin routes
router.get("/", authMiddleware, getAds);
router.post("/", authMiddleware, upload.array("images", 5), createAd);
router.put("/:id", authMiddleware, upload.array("images", 5), updateAd);
router.delete("/:id", authMiddleware, deleteAd);
router.patch("/:id/toggle", authMiddleware, toggleAd);

module.exports = router;
