const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const NewsHistory = require("../models/newsHistoryModel");

router.post("/save-news", async (req, res) => {
  try {
    const user_id = req.user.id;
    const { articles, sources } = req.body;

    if (!user_id || !articles || !sources) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    if (!mongoose.Types.ObjectId.isValid(user_id)) {
      return res.status(400).json({ message: "Invalid user_id format." });
    }

    // Check if user already has a document
    let existingUser = await NewsHistory.findOne({ user_id });

    if (existingUser) {
      // Convert existing article IDs to a Set
      const existingArticleIds = new Set(existingUser.articles.map(a => a.article_id));

      // Filter out duplicate articles based on article_id
      const uniqueArticles = articles.filter(article => !existingArticleIds.has(article.article_id));

      // Convert existing source IDs to a Set
      const existingSourceIds = new Set(existingUser.sources.map(source => source.id));

      // Filter out duplicate sources based on id
      const uniqueSources = sources.filter(source => !existingSourceIds.has(source.id));

      // Append only unique data
      if (uniqueArticles.length > 0) {
        existingUser.articles.push(...uniqueArticles);
      }
      if (uniqueSources.length > 0) {
        existingUser.sources.push(...uniqueSources);
      }

      await existingUser.save();
      return res.status(200).json({ message: "News history updated!", data: existingUser });
    } else {
      // Create a new document if user doesn't exist
      const newHistory = new NewsHistory({
        user_id,
        articles: [...new Map(articles.map(article => [article.article_id, article])).values()], // Ensure unique articles
        sources: [...new Map(sources.map(source => [source.id, source])).values()] // Ensure unique sources
      });

      await newHistory.save();
      return res.status(201).json({ message: "News history created!", data: newHistory });
    }
  } catch (error) {
    console.error("Error saving news history:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});

router.get("/fetch-history", async (req, res) => {
  try {
    const user_id = req.user.id;

    if (!mongoose.Types.ObjectId.isValid(user_id)) {
      return res.status(400).json({ message: "Invalid user_id format." });
    }

    const userHistory = await NewsHistory.findOne({ user_id });

    if (!userHistory) {
      return res.status(404).json({ message: "No history found for this user." });
    }

    return res.status(200).json({ message: "User history retrieved!", data: userHistory });
  } catch (error) {
    console.error("Error fetching user history:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});


module.exports = router;
