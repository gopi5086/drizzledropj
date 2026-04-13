const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
const transporter = require("../config/mailer");
const authMiddleware = require("../middleware/authMiddleware");

// ── Validation helper ─────────────────────────────────────────────────────────
function validateBooking({ name, phone, email, location, roomType, adults }) {
  const errors = [];
  if (!name || !name.trim())                           errors.push("Name is required");
  if (!phone || !/^\+?[\d\s\-]{7,15}$/.test(phone))   errors.push("Invalid phone number");
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push("Invalid email");
  if (!adults || Number(adults) < 1)                   errors.push("At least 1 adult required");
  return errors;
}

// ── Email builders ────────────────────────────────────────────────────────────
function hotelEmailHtml({ name, phone, email, location, roomType, adults, children, _id }) {
  return `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"/>
<style>
  body{font-family:Georgia,serif;background:#faf9f6;margin:0;padding:0}
  .wrap{max-width:640px;margin:40px auto;background:#fff;border:1px solid #e8e0cc;border-radius:8px;overflow:hidden}
  .top{background:linear-gradient(135deg,#1a140a 0%,#2d2010 100%);padding:36px 48px}
  .top h1{margin:0 0 4px;color:#C5A861;font-size:22px;letter-spacing:.04em}
  .top p{margin:0;color:rgba(255,255,255,.4);font-size:11px;letter-spacing:.18em;text-transform:uppercase}
  .body{padding:36px 48px}
  .label{font-family:sans-serif;font-size:10px;text-transform:uppercase;letter-spacing:.18em;color:#C5A861;font-weight:700;margin:0 0 14px}
  table{width:100%;border-collapse:collapse;margin-bottom:28px}
  td{padding:10px 0;border-bottom:1px solid #f0ebe0;font-size:14px;vertical-align:top}
  td:first-child{color:#999;font-family:sans-serif;font-size:11px;text-transform:uppercase;letter-spacing:.1em;width:36%;padding-top:12px;padding-right:12px}
  td:last-child{color:#1a1a1a;font-weight:600}
  .badge{display:inline-block;background:#fff8ec;color:#8a6e2e;font-size:10px;text-transform:uppercase;letter-spacing:.1em;padding:3px 10px;border-radius:20px;border:1px solid #e8d99a;font-family:sans-serif;font-weight:700}
  hr{border:none;border-top:1px solid #f0ebe0;margin:28px 0}
  .about{background:#faf9f6;border-left:3px solid #C5A861;padding:18px 22px;border-radius:4px;margin-bottom:24px}
  .about h3{margin:0 0 6px;color:#1a140a;font-size:14px}
  .about p{margin:0;color:#666;font-size:13px;line-height:1.7}
  .prop{margin-bottom:18px}
  .prop h4{margin:0 0 3px;font-size:13px;color:#1a140a}
  .prop p{margin:0;color:#777;font-size:12px;line-height:1.6}
  .tag{display:inline-block;background:#f5f0e8;color:#8a6e2e;font-size:10px;text-transform:uppercase;letter-spacing:.08em;padding:2px 8px;border-radius:3px;margin:2px 2px 0 0;font-family:sans-serif}
  .grid{display:grid;grid-template-columns:1fr 1fr;gap:3px 16px;margin-top:10px}
  .att{font-size:12px;color:#666;display:flex;justify-content:space-between;padding:4px 0;border-bottom:1px solid #f0ebe0}
  .att span{color:#C5A861;font-size:11px}
  .footer{background:#1a140a;padding:22px 48px;text-align:center}
  .footer p{margin:0;color:rgba(255,255,255,.35);font-size:11px;font-family:sans-serif}
  .footer a{color:#C5A861;text-decoration:none}
</style>
</head>
<body>
<div class="wrap">
  <div class="top">
    <h1>New Booking Request</h1>
    <p>DrizzleDrop Inn &nbsp;•&nbsp; Booking ID: ${_id}</p>
  </div>
  <div class="body">
    <p class="label">Guest Details</p>
    <table>
      <tr><td>Full Name</td><td>${name}</td></tr>
      <tr><td>Phone</td><td>${phone}</td></tr>
      <tr><td>Email</td><td>${email}</td></tr>
      <tr><td>Property</td><td>${location}</td></tr>
      <tr><td>Room Type</td><td>${roomType}</td></tr>
      <tr><td>Guests</td><td>${adults} Adult${adults > 1 ? "s" : ""}${children > 0 ? `, ${children} Child${children > 1 ? "ren" : ""}` : ""}</td></tr>
      <tr><td>Status</td><td><span class="badge">Pending</span></td></tr>
    </table>

    <hr/>

    <p class="label">About DrizzleDrop Inn</p>
    <div class="about">
      <h3>Welcome to DrizzleDrop Inn — A Sanctuary of Quiet Luxury</h3>
      <p>DrizzleDrop Inn offers hassle-free accommodation where modern facilities meet exceptional service.
      Whether it's a business stay in Chennai or a scenic vacation in Ooty, we provide an ideal abode for the modern traveller.</p>
    </div>

    <p class="label">Our Properties</p>
    <div class="prop">
      <h4>DrizzleDrop Inn OMR — Chennai</h4>
      <p>Rajiv Gandhi Salai, Thoraipakkam, OMR IT Corridor</p>
      <p>35 well-furnished rooms &amp; suites · Panoramic terrace · Rooftop dining · Fast WiFi</p>
      <div style="margin-top:6px"><span class="tag">IT Hubs</span><span class="tag">OMR Corridor</span><span class="tag">Rooftop Dining</span><span class="tag">Fast WiFi</span></div>
    </div>
    <div class="prop">
      <h4>DrizzleDrop Inn Ooty — Nilgiris</h4>
      <p>2 KM from Ooty Bus Stand &amp; Railway Station</p>
      <p>8 hill-view apartment-style rooms · Private balconies · Toy train route views</p>
      <div style="margin-top:6px"><span class="tag">Hill Views</span><span class="tag">Toy Train</span><span class="tag">Private Balcony</span><span class="tag">Quiet Luxury</span></div>
    </div>

    <hr/>

    <p class="label">Facilities</p>
    <p style="font-size:13px;color:#666;line-height:1.9;margin:0 0 24px">
      ✓ Electricity Backup &nbsp; ✓ WiFi &nbsp; ✓ 24 hr Hot Water &nbsp; ✓ Secure Parking &nbsp; ✓ Enhanced Safety
    </p>

    <p class="label">Nearby Attractions — Ooty</p>
    <div class="grid">
      <div class="att">Nilgiri Mountain Railway <span>2.8 KM</span></div>
      <div class="att">Ooty Lake <span>3.3 KM</span></div>
      <div class="att">Rose Garden <span>4.0 KM</span></div>
      <div class="att">Botanical Garden <span>4.9 KM</span></div>
      <div class="att">Tea Factory <span>7.4 KM</span></div>
      <div class="att">Dodabetta View Point <span>11 KM</span></div>
      <div class="att">Coonoor <span>21 KM</span></div>
      <div class="att">Avalanche <span>22 KM</span></div>
    </div>
  </div>
  <div class="footer">
    <p>DrizzleDrop Inn &nbsp;•&nbsp; <a href="mailto:info@drizzledrop.com">info@drizzledrop.com</a> &nbsp;•&nbsp; <a href="https://wa.me/918667825086">+91 86678 25086</a></p>
    <p style="margin-top:5px">Please respond to this guest at your earliest convenience.</p>
  </div>
</div>
</body>
</html>`;
}

function guestEmailHtml({ name, location, roomType, adults, children }) {
  return `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"/>
<style>
  body{font-family:Georgia,serif;background:#faf9f6;margin:0;padding:0}
  .wrap{max-width:560px;margin:40px auto;background:#fff;border:1px solid #e8e0cc;border-radius:8px;overflow:hidden}
  .top{background:linear-gradient(135deg,#1a140a 0%,#2d2010 100%);padding:36px 48px}
  .top h1{margin:0 0 4px;color:#C5A861;font-size:20px}
  .top p{margin:0;color:rgba(255,255,255,.4);font-size:11px;letter-spacing:.15em;text-transform:uppercase}
  .body{padding:36px 48px}
  .body p{font-size:14px;color:#444;line-height:1.8;margin:0 0 16px}
  .summary{background:#faf9f6;border:1px solid #e8e0cc;border-radius:6px;padding:18px 22px;margin:20px 0}
  .summary p{margin:4px 0;font-size:13px;color:#555}
  .summary strong{color:#1a140a}
  .cta{display:inline-block;margin-top:8px;padding:10px 24px;background:linear-gradient(135deg,#C5A861,#a8893e);color:#0a0802;font-family:sans-serif;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.1em;border-radius:6px;text-decoration:none}
  .footer{background:#1a140a;padding:20px 48px;text-align:center}
  .footer p{margin:0;color:rgba(255,255,255,.35);font-size:11px;font-family:sans-serif}
  .footer a{color:#C5A861;text-decoration:none}
</style>
</head>
<body>
<div class="wrap">
  <div class="top">
    <h1>Booking Request Received</h1>
    <p>DrizzleDrop Inn • Chennai &amp; Ooty</p>
  </div>
  <div class="body">
    <p>Dear <strong>${name}</strong>,</p>
    <p>Thank you for choosing DrizzleDrop Inn! We've received your booking request and our team will get back to you within <strong>24 hours</strong> to confirm your reservation.</p>
    <div class="summary">
      <p><strong>Property:</strong> ${location}</p>
      <p><strong>Room Type:</strong> ${roomType}</p>
      <p><strong>Guests:</strong> ${adults} Adult${adults > 1 ? "s" : ""}${children > 0 ? `, ${children} Child${children > 1 ? "ren" : ""}` : ""}</p>
    </div>
    <p>Need immediate assistance? Reach us on WhatsApp:</p>
    <a class="cta" href="https://wa.me/918667825086">Chat on WhatsApp</a>
  </div>
  <div class="footer">
    <p>DrizzleDrop Inn &nbsp;•&nbsp; <a href="mailto:info@drizzledrop.com">info@drizzledrop.com</a> &nbsp;•&nbsp; <a href="https://wa.me/918667825086">+91 86678 25086</a></p>
  </div>
</div>
</body>
</html>`;
}

// ── POST /api/bookings ────────────────────────────────────────────────────────
router.post("/", async (req, res) => {
  try {
    const { name, phone, email, location, roomType, adults, children = 0 } = req.body;

    // 1. Validate
    const errors = validateBooking({ name, phone, email, location, roomType, adults });
    if (errors.length) {
      return res.status(422).json({ success: false, errors });
    }

    // 2. Save to MongoDB
    const booking = await Booking.create({
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim().toLowerCase(),
      location: location || "Not Specified",
      roomType: roomType || "Deluxe Room",
      adults: Number(adults) || 1,
      children: Number(children) || 0,
    });

    // 3. Email to hotel (non-blocking — don't fail the request if email errors)
    const hotelEmail = process.env.HOTEL_EMAIL || process.env.ADMIN_EMAIL;
    transporter.sendMail({
      from: `"DrizzleDrop Booking System" <${process.env.GMAIL_USER}>`,
      to: hotelEmail,
      replyTo: email,
      subject: `New Booking Request — ${location} | ${name}`,
      html: hotelEmailHtml({ name, phone, email, location, roomType, adults: Number(adults), children: Number(children), _id: booking._id }),
    }).catch((err) => console.error("Hotel email error:", err.message));

    // 4. Confirmation email to guest
    transporter.sendMail({
      from: `"DrizzleDrop Inn" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: "We received your booking request — DrizzleDrop Inn",
      html: guestEmailHtml({ name, location, roomType, adults: Number(adults), children: Number(children) }),
    }).catch((err) => console.error("Guest email error:", err.message));

    return res.status(201).json({
      success: true,
      message: "Booking request submitted successfully.",
      bookingId: booking._id,
    });
  } catch (err) {
    console.error("Booking error:", err);
    return res.status(500).json({ success: false, message: `Server error: ${err.message}` });
  }
});

// ── GET /api/bookings  (admin: list all) ──────────────────────────────────────
router.get("/", authMiddleware, async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.json({ success: true, bookings });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ── PATCH /api/bookings/:id/status  (admin: update status) ───────────────────
router.patch("/:id/status", authMiddleware, async (req, res) => {
  try {
    const { status } = req.body;
    if (!["pending", "confirmed", "cancelled"].includes(status)) {
      return res.status(422).json({ success: false, message: "Invalid status" });
    }
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!booking) return res.status(404).json({ success: false, message: "Booking not found" });
    res.json({ success: true, booking });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;