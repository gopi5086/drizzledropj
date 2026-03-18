const Ad = require("../models/Ad");
const fs = require("fs");
const path = require("path");

// @desc    Create a new ad
// @route   POST /api/ads
const createAd = async (req, res) => {
  try {
    const { title, description, redirectLink } = req.body;

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "At least one image is required." });
    }

    const images = req.files.map((file) => `/uploads/${file.filename}`);

    const ad = await Ad.create({
      title: title || "",
      description: description || "",
      images,
      redirectLink: redirectLink || "",
      isActive: true,
    });

    res.status(201).json({ message: "Ad created successfully", ad });
  } catch (error) {
    console.error("Create ad error:", error);
    res.status(500).json({ message: "Failed to create ad." });
  }
};

// @desc    Get all ads
// @route   GET /api/ads
const getAds = async (req, res) => {
  try {
    const ads = await Ad.find().sort({ createdAt: -1 });
    res.json(ads);
  } catch (error) {
    console.error("Get ads error:", error);
    res.status(500).json({ message: "Failed to fetch ads." });
  }
};

// @desc    Get active ads (for public/homepage)
// @route   GET /api/ads/active
const getActiveAds = async (req, res) => {
  try {
    const ads = await Ad.find({ isActive: true }).sort({ createdAt: -1 });
    res.json(ads);
  } catch (error) {
    console.error("Get active ads error:", error);
    res.status(500).json({ message: "Failed to fetch active ads." });
  }
};

// @desc    Update an ad
// @route   PUT /api/ads/:id
const updateAd = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, redirectLink, isActive } = req.body;

    const ad = await Ad.findById(id);
    if (!ad) {
      return res.status(404).json({ message: "Ad not found." });
    }

    // Update text fields
    if (title !== undefined) ad.title = title;
    if (description !== undefined) ad.description = description;
    if (redirectLink !== undefined) ad.redirectLink = redirectLink;
    if (isActive !== undefined) ad.isActive = isActive === "true" || isActive === true;

    // If new images uploaded, replace old ones
    if (req.files && req.files.length > 0) {
      // Delete old images from disk
      ad.images.forEach((img) => {
        const fullPath = path.join(__dirname, "..", img);
        if (fs.existsSync(fullPath)) {
          fs.unlinkSync(fullPath);
        }
      });
      ad.images = req.files.map((file) => `/uploads/${file.filename}`);
    }

    await ad.save();
    res.json({ message: "Ad updated successfully", ad });
  } catch (error) {
    console.error("Update ad error:", error);
    res.status(500).json({ message: "Failed to update ad." });
  }
};

// @desc    Delete an ad
// @route   DELETE /api/ads/:id
const deleteAd = async (req, res) => {
  try {
    const { id } = req.params;
    const ad = await Ad.findById(id);

    if (!ad) {
      return res.status(404).json({ message: "Ad not found." });
    }

    // Delete images from disk
    ad.images.forEach((img) => {
      const fullPath = path.join(__dirname, "..", img);
      if (fs.existsSync(fullPath)) {
        fs.unlinkSync(fullPath);
      }
    });

    await Ad.findByIdAndDelete(id);
    res.json({ message: "Ad deleted successfully" });
  } catch (error) {
    console.error("Delete ad error:", error);
    res.status(500).json({ message: "Failed to delete ad." });
  }
};

// @desc    Toggle ad active status
// @route   PATCH /api/ads/:id/toggle
const toggleAd = async (req, res) => {
  try {
    const { id } = req.params;
    const ad = await Ad.findById(id);

    if (!ad) {
      return res.status(404).json({ message: "Ad not found." });
    }

    ad.isActive = !ad.isActive;
    await ad.save();

    res.json({ message: `Ad ${ad.isActive ? "activated" : "deactivated"}`, ad });
  } catch (error) {
    console.error("Toggle ad error:", error);
    res.status(500).json({ message: "Failed to toggle ad." });
  }
};

module.exports = { createAd, getAds, getActiveAds, updateAd, deleteAd, toggleAd };
