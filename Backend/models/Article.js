const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
  title: String,
  content: String,
  url: String,
  country: {type: String , default: "India"},
  state: String,
  city: String,
  timestamp: { type: Date, default: Date.now },
  isUpdated: { type: Boolean, default: false }, // 🔥 AI processed or not
  send: { type: Boolean, default: false } // 🔥 Sent to frontend or not
});

module.exports = mongoose.model("Article", articleSchema);
