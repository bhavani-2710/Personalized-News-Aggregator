import React, { useEffect, useState } from "react";
import Card from "../components/Cards";
import NewsCard from "../components/NewsCard";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_BACKEND_URL;

const Home = () => {
  const [newsSources, setNewsSources] = useState([]);
  const [latestNews, setLatestNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    const fetchNews = async () => {
      const token = localStorage.getItem("token");
      try {
        const [sourcesRes, latestNewsRes] = await Promise.all([
          axios.get(`${API_URL}/news/sources/${language}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${API_URL}/news/lang/${language}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);
        setNewsSources(sourcesRes.data);
        setLatestNews(latestNewsRes.data.results);
      } catch (err) {
        setError(err.message || "Something went wrong while fetching data.");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [language]);

  if (loading)
    return <p className="text-white text-center mt-10">Loading...</p>;
  if (error)
    return <p className="text-red-500 text-center mt-10">Error: {error}</p>;

  
  return (
    <>
      <Navbar />
      <Sidebar />
      <div className="min-h-screen bg-gray-800 p-6">

        {/* Suggested News Section */}
        <div className="bg-gray-900 text-white p-4 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold mb-3">🔵 Suggested for you</h3>
          <p className="text-sm text-gray-400">Follow publishers to see more of what you like</p>

          <div className="flex overflow-x-auto space-x-4 mt-3 scrollbar-hide">
            {newsSources.slice(0, 5).map((source) => (
              <div
                key={source.id}
                className="flex items-center bg-gray-700 rounded-lg p-3 min-w-[250px] cursor-pointer hover:bg-gray-600"
              >
                <img src={source.icon} alt={source.title} className="w-10 h-10 rounded-full mr-3" />
                <p className="font-medium">{source.title}</p>
                <button className="ml-auto text-gray-400 hover:text-white text-lg">➕</button>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended News Sources */}
        <h2 className="text-white text-xl mt-8 mb-4">Recommended News Sources</h2>
        <div className="flex flex-wrap gap-6 justify-center">
          {newsSources.map((source) => (
            <Card key={source.id} article={source} />
          ))}
        </div>

        {/* Latest News */}
        <h2 className="text-white text-xl mt-8 mb-4">Latest News</h2>
        <div className="flex flex-wrap gap-6 justify-center">
          {latestNews.map((news, index) => (
            <NewsCard key={index} article={news} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;

// Dummy Data for testing before backend integration
export const dummyNewsSources = [
  {
    id: "1",
    title: "BBC News",
    description: "Latest international news and analysis.",
    icon: "https://logo.clearbit.com/bbc.com",
  },
  {
    id: "2",
    title: "The Verge",
    description: "Technology and media insights.",
    icon: "https://logo.clearbit.com/theverge.com",
  },
  {
    id: "3",
    title: "CNN",
    description: "Breaking news from around the world.",
    icon: "https://logo.clearbit.com/cnn.com",
  },
];

export const dummyLatestNews = [
  {
    id: "101",
    title: "Stock Market Hits Record High",
    description: "The stock market sees an all-time high today with tech leading the way.",
    url: "https://example.com/news/stock-market",
  },
  {
    id: "102",
    title: "AI Breakthrough in Medicine",
    description: "New AI model predicts diseases with 95% accuracy.",
    url: "https://example.com/news/ai-medicine",
  },
  {
    id: "103",
    title: "Climate Change Report Released",
    description: "A new study highlights critical climate change risks.",
    url: "https://example.com/news/climate-change",
  },
];
