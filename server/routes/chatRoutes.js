const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { saveMessage, getChats, getChatBySession } = require("../controllers/chatController");

// PUBLIC: Save message
router.post("/message", saveMessage);

// PUBLIC/ADMIN: Get history
router.get("/:sessionId", getChatBySession);

// PROTECTED: Admin only index
router.get("/", authMiddleware, getChats);

module.exports = router;
