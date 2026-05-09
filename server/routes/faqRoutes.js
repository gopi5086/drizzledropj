const express = require("express");
const router = express.Router();
const faqController = require("../controllers/faqController");
const authMiddleware = require("../middleware/authMiddleware");

// Public routes
router.get("/", faqController.getAllFAQs);
router.get("/location/:location", faqController.getFAQsByLocation);

// Protected routes
router.post("/", authMiddleware, faqController.createFAQ);
router.put("/:id", authMiddleware, faqController.updateFAQ);
router.delete("/:id", authMiddleware, faqController.deleteFAQ);
router.patch("/:id/toggle", authMiddleware, faqController.toggleFAQ);

module.exports = router;
