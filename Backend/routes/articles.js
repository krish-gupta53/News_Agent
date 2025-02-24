const express = require("express");
const router = express.Router();
const Article = require("../models/Article");

// GET Articles with Pagination (Default: India News)
router.get("/", async (req, res) => {
  const { page = 1, limit = 10, send } = req.query;

  try {
    let filter = {};

    // If `send=false` is passed, fetch only articles that haven't been sent
    if (send === "false") {
      filter = { send: false, isUpdated: true }; 
    }

    const articles = await Article.find(filter)
      .sort({ timestamp: -1 }) // 🔥 Newest first
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    res.json(articles);
  } catch (error) {
    res.status(500).json({ error: "Error fetching articles" });
  }
});

// Export the router
module.exports = router;
