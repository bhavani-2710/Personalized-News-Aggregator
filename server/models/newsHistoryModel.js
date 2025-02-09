const mongoose = require("mongoose");

const NewsHistorySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  articles: [
    {
      title: String,
      link: String,
      source: String,
      imageUrl: String,
      publishedAt: String,
      category: String,
      timestamp: { type: Date, default: Date.now },
    },
  ],
  sources: [
    {
      domain: String,
      name: String,
      url: String,
      icon: String,
      description: String,
      category: [String],
      language: [String],
      country: [String]
    }
  ],
});

module.exports = mongoose.model("NewsHistory", NewsHistorySchema);
