const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const roomController = require("../controllers/roomController");
const authMiddleware = require("../middleware/authMiddleware");

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "..", "uploads"));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, `room-${uniqueSuffix}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
});

// Public routes
router.get("/", roomController.getAllRooms);
router.get("/location/:location", roomController.getRoomsByLocation);

// Protected routes (Admin only)
router.post("/", authMiddleware, upload.array("images", 1), roomController.createRoom);
router.put("/bulk", authMiddleware, roomController.bulkUpdateRooms);
router.put("/:id", authMiddleware, upload.array("images", 1), roomController.updateRoom);
router.delete("/:id", authMiddleware, roomController.deleteRoom);

module.exports = router;
