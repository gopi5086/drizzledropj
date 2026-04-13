const Chat = require("../models/Chat");

// @desc    Save a chat message or create a new session
// @route   POST /api/chat/message
const saveMessage = async (req, res) => {
  try {
    const { sessionId, message, metadata } = req.body;

    let chat = await Chat.findOne({ sessionId });

    if (!chat) {
      chat = await Chat.create({
        sessionId,
        messages: [message],
        metadata,
      });
    } else {
      chat.messages.push(message);
      if (metadata) {
        chat.metadata = { ...chat.metadata, ...metadata };
      }
      await chat.save();
    }

    res.status(200).json({ success: true, chat });
  } catch (error) {
    console.error("Save message error:", error);
    res.status(500).json({ success: false, message: "Failed to save message." });
  }
};

// @desc    Get all chat sessions (Admin)
// @route   GET /api/chat
const getChats = async (req, res) => {
  try {
    const chats = await Chat.find().sort({ updatedAt: -1 });
    res.json(chats);
  } catch (error) {
    console.error("Get chats error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch chats." });
  }
};

// @desc    Get a single chat session
// @route   GET /api/chat/:sessionId
const getChatBySession = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const chat = await Chat.findOne({ sessionId });
    
    if (!chat) {
      return res.status(404).json({ success: false, message: "Chat session not found." });
    }
    
    res.json(chat);
  } catch (error) {
    console.error("Get chat error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch chat history." });
  }
};

module.exports = { saveMessage, getChats, getChatBySession };
