const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const authMiddleware = require("../middleware/authMiddleware");
const {
  createDeal,
  getDeals,
  updateDeal,
  deleteDeal,
  toggleDeal,
} = require("../controllers/dealController");

// Multer for temp handling before Base64 conversion
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "..", "uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, `temp-deal-${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage });

// Public routes
router.get("/", getDeals);

// Protected routes (Admin only)
router.post("/", authMiddleware, upload.array("images", 1), createDeal);
router.put("/:id", authMiddleware, upload.array("images", 1), updateDeal);
router.delete("/:id", authMiddleware, deleteDeal);
router.patch("/:id/toggle", authMiddleware, toggleDeal);

module.exports = router;
