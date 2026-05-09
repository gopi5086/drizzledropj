const Room = require("../models/Room");
const fs = require("fs");
const path = require("path");

// Get all rooms
exports.getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find().sort({ location: 1, order: 1 });
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get rooms by location
exports.getRoomsByLocation = async (req, res) => {
  try {
    const { location } = req.params;
    const rooms = await Room.find({ 
      location: location.toUpperCase() 
    }).sort({ order: 1 });
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a room
exports.createRoom = async (req, res) => {
  try {
    const { name, location, type, desc, epPrice, cpPrice, price, amenities, order } = req.body;
    
    let imageUrl = "";
    if (req.files && req.files.length > 0) {
        const file = req.files[0];
        const filePath = file.path;
        const fileBuffer = fs.readFileSync(filePath);
        const base64Image = fileBuffer.toString("base64");
        imageUrl = `data:${file.mimetype};base64,${base64Image}`;
        
        // Cleanup temp file
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }

    const roomData = {
        name,
        location,
        type,
        desc,
        epPrice,
        cpPrice,
        price,
        image: imageUrl,
        amenities: typeof amenities === 'string' ? amenities.split(',').map(a => a.trim()) : amenities,
        order: Number(order) || 0
    };

    const room = new Room(roomData);
    const newRoom = await room.save();
    res.status(201).json(newRoom);
  } catch (error) {
    console.error("Create room error:", error);
    res.status(400).json({ message: error.message });
  }
};

// Update a room (including rates)
exports.updateRoom = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = { ...req.body };
    
    if (updates.amenities && typeof updates.amenities === 'string') {
        updates.amenities = updates.amenities.split(',').map(a => a.trim());
    }

    if (req.files && req.files.length > 0) {
        const file = req.files[0];
        const filePath = file.path;
        const fileBuffer = fs.readFileSync(filePath);
        const base64Image = fileBuffer.toString("base64");
        updates.image = `data:${file.mimetype};base64,${base64Image}`;
        
        // Cleanup temp file
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }

    const updatedRoom = await Room.findByIdAndUpdate(id, updates, { new: true });
    if (!updatedRoom) return res.status(404).json({ message: "Room not found" });
    res.json(updatedRoom);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a room
exports.deleteRoom = async (req, res) => {
  try {
    const room = await Room.findByIdAndDelete(req.params.id);
    if (!room) return res.status(404).json({ message: "Room not found" });
    res.json({ message: "Room deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Bulk update rooms (useful for reordering or batch price changes)
exports.bulkUpdateRooms = async (req, res) => {
    try {
        const { rooms } = req.body;
        const promises = rooms.map(room => 
            Room.findByIdAndUpdate(room._id, room, { new: true })
        );
        const updatedRooms = await Promise.all(promises);
        res.json(updatedRooms);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
