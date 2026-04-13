const Deal = require("../models/Deal");
const fs = require("fs");

// @desc    Create a new deal
// @route   POST /api/deals
const createDeal = async (req, res) => {
  try {
    const { 
      title, description, dealType, location, 
      discountPercentage, customPrice, validFrom, 
      validTo, priority, isPopup, isActive 
    } = req.body;

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "Deal image is required." });
    }

    // Convert image to Base64 for persistence
    const file = req.files[0];
    const fileBuffer = fs.readFileSync(file.path);
    const base64Image = `data:${file.mimetype};base64,${fileBuffer.toString("base64")}`;

    // Cleanup temp file
    if (fs.existsSync(file.path)) {
      fs.unlinkSync(file.path);
    }

    const deal = await Deal.create({
      title,
      description,
      dealType,
      location,
      discountPercentage: Number(discountPercentage) || 0,
      customPrice,
      image: base64Image,
      validFrom: validFrom || new Date(),
      validTo,
      priority: Number(priority) || 0,
      isPopup: isPopup === "true" || isPopup === true,
      isActive: isActive === "true" || isActive === true,
    });

    res.status(201).json({ message: "Deal created successfully", deal });
  } catch (error) {
    console.error("Create deal error:", error);
    res.status(500).json({ message: "Failed to create deal." });
  }
};

// @desc    Get deals with filtering
// @route   GET /api/deals
const getDeals = async (req, res) => {
  try {
    const { location, activeOnly, type } = req.query;
    let query = {};

    // Filter by location (show 'Both' + specific location)
    if (location) {
      query.location = { $in: [location, "Both"] };
    }

    // Filter by active status and date validity
    if (activeOnly === "true") {
      query.isActive = true;
      const now = new Date();
      query.validFrom = { $lte: now };
      query.validTo = { $gte: now };
    }

    // Filter by deal type
    if (type) {
      query.dealType = type;
    }

    const deals = await Deal.find(query).sort({ priority: -1, createdAt: -1 });
    res.json(deals);
  } catch (error) {
    console.error("Get deals error:", error);
    res.status(500).json({ message: "Failed to fetch deals." });
  }
};

// @desc    Update a deal
// @route   PUT /api/deals/:id
const updateDeal = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

    // Convert numeric fields
    if (updateData.discountPercentage) updateData.discountPercentage = Number(updateData.discountPercentage);
    if (updateData.priority) updateData.priority = Number(updateData.priority);
    if (updateData.isPopup !== undefined) updateData.isPopup = updateData.isPopup === "true" || updateData.isPopup === true;
    if (updateData.isActive !== undefined) updateData.isActive = updateData.isActive === "true" || updateData.isActive === true;

    // Handle image update
    if (req.files && req.files.length > 0) {
      const file = req.files[0];
      const fileBuffer = fs.readFileSync(file.path);
      updateData.image = `data:${file.mimetype};base64,${fileBuffer.toString("base64")}`;
      
      if (fs.existsSync(file.path)) {
        fs.unlinkSync(file.path);
      }
    }

    const deal = await Deal.findByIdAndUpdate(id, updateData, { new: true });
    if (!deal) return res.status(404).json({ message: "Deal not found" });

    res.json({ message: "Deal updated successfully", deal });
  } catch (error) {
    console.error("Update deal error:", error);
    res.status(500).json({ message: "Failed to update deal." });
  }
};

// @desc    Delete a deal
// @route   DELETE /api/deals/:id
const deleteDeal = async (req, res) => {
  try {
    const { id } = req.params;
    const deal = await Deal.findByIdAndDelete(id);
    if (!deal) return res.status(404).json({ message: "Deal not found" });
    res.json({ message: "Deal deleted successfully" });
  } catch (error) {
    console.error("Delete deal error:", error);
    res.status(500).json({ message: "Failed to delete deal." });
  }
};

// @desc    Toggle deal active status
// @route   PATCH /api/deals/:id/toggle
const toggleDeal = async (req, res) => {
  try {
    const { id } = req.params;
    const deal = await Deal.findById(id);
    if (!deal) return res.status(404).json({ message: "Deal not found" });

    deal.isActive = !deal.isActive;
    await deal.save();
    res.json({ message: `Deal ${deal.isActive ? "activated" : "deactivated"}`, deal });
  } catch (error) {
    console.error("Toggle deal error:", error);
    res.status(500).json({ message: "Failed to toggle deal." });
  }
};

module.exports = { createDeal, getDeals, updateDeal, deleteDeal, toggleDeal };
