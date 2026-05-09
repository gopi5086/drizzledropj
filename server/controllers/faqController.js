const FAQ = require("../models/FAQ");

// Get all FAQs
exports.getAllFAQs = async (req, res) => {
  try {
    const faqs = await FAQ.find().sort({ location: 1, order: 1 });
    res.json(faqs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get FAQs by location
exports.getFAQsByLocation = async (req, res) => {
  try {
    const { location } = req.params;
    const query = { isActive: true };
    if (location.toUpperCase() !== "ALL") {
      query.location = { $in: [location.toUpperCase(), "GENERAL"] };
    }
    const faqs = await FAQ.find(query).sort({ order: 1 });
    res.json(faqs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create an FAQ
exports.createFAQ = async (req, res) => {
  try {
    const faq = new FAQ(req.body);
    const newFAQ = await faq.save();
    res.status(201).json(newFAQ);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update an FAQ
exports.updateFAQ = async (req, res) => {
  try {
    const updatedFAQ = await FAQ.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedFAQ) return res.status(404).json({ message: "FAQ not found" });
    res.json(updatedFAQ);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete an FAQ
exports.deleteFAQ = async (req, res) => {
  try {
    const faq = await FAQ.findByIdAndDelete(req.params.id);
    if (!faq) return res.status(404).json({ message: "FAQ not found" });
    res.json({ message: "FAQ deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Toggle FAQ status
exports.toggleFAQ = async (req, res) => {
    try {
        const faq = await FAQ.findById(req.params.id);
        if (!faq) return res.status(404).json({ message: "FAQ not found" });
        faq.isActive = !faq.isActive;
        await faq.save();
        res.json(faq);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
