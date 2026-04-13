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

    // Convert images to Base64 and store in DB for absolute persistence on Render/Restart
    const images = req.files.map((file) => {
      const filePath = file.path;
      const fileBuffer = fs.readFileSync(filePath);
      const base64Image = fileBuffer.toString("base64");
      const mimeType = file.mimetype;
      
      // Cleanup: delete the file from the uploads folder to save space
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
      
      return `data:${mimeType};base64,${base64Image}`;
    });

    const ad = await Ad.create({
      title: title || "",
      description: description || "",
      images,
      redirectLink: redirectLink || "",
      isActive: true,
    });

    res.status(201).json({ message: "Ad created successfully (stored persistently)", ad });
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
    
    // Add cache-control to prevent CDNs and browsers from serving stale/deleted image paths
    res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");
    
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

    // If new images uploaded, replace old ones with persistent Base64
    if (req.files && req.files.length > 0) {
      ad.images = req.files.map((file) => {
        const filePath = file.path;
        const fileBuffer = fs.readFileSync(filePath);
        const base64Image = fileBuffer.toString("base64");
        const mimeType = file.mimetype;
        
        // Cleanup: delete the temporary file
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
        
        return `data:${mimeType};base64,${base64Image}`;
      });
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

    // No need to delete from disk as images are stored as Base64 strings in DB
    // and cleanup happens during creation/update

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
