require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const adRoutes = require("./routes/adRoutes");
const Admin = require("./models/Admin");

const app = express();
const PORT = process.env.PORT || 5000;

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded images as static files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/ads", adRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "DrizzleDrop Server is running" });
});

// Seed default admin if none exists
const seedAdmin = async () => {
  try {
    const count = await Admin.countDocuments();
    if (count === 0) {
      await Admin.create({
        email: process.env.ADMIN_EMAIL || "admin@drizzledrop.com",
        password: process.env.ADMIN_PASSWORD || "Admin@123",
        name: "DrizzleDrop Admin",
      });
      console.log("Default admin created:");
      console.log(`  Email: ${process.env.ADMIN_EMAIL || "admin@drizzledrop.com"}`);
      console.log(`  Password: ${process.env.ADMIN_PASSWORD || "Admin@123"}`);
    }
  } catch (error) {
    console.error("Error seeding admin:", error.message);
  }
};

// Connect to DB and start server
connectDB().then(() => {
  seedAdmin();
  app.listen(PORT, () => {
    console.log(`\n🏨 DrizzleDrop Server running on http://localhost:${PORT}`);
    console.log(`📁 Uploads directory: ${uploadsDir}\n`);
  });
});
