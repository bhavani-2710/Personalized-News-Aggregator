const express = require("express");
const NewsHistory = require("../models/newsHistoryModel");

const router = express.Router();

// 🔹 Save User History
router.post("/save", async (req, res) => {
  const { userId, article, source } = req.body;
  try {
    let userHistory = await NewsHistory.findOne({ userId });

    if (!userHistory) {
      userHistory = new NewsHistory({ userId, articles: [], sources: [] });
    }

    if (!userHistory.articles.find((a) => a.link === article.link)) {
      userHistory.articles.push(article);
    }

    if (!userHistory.sources.find((s) => s.domain === source.domain)) {
      userHistory.sources.push(source);
    }

    await userHistory.save();
    res.json({ message: "Article & source saved!" });
  } catch (error) {
    res.status(500).json({ error: "Error saving history" });
  }
});

// 🔹 Fetch User History
router.get("/:userId", async (req, res) => {
  const userHistory = await NewsHistory.findOne({ userId: req.params.userId });
  res.json(userHistory || { articles: [], sources: [] });
});

module.exports = router;
