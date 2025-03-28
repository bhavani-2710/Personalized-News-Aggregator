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

  const handleLanguageChange = (e) => {
    setLoading(true);
    setLanguage(e.target.value);
  };

  if (loading)
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center">
        <p className="text-gray-700 text-lg font-semibold animate-pulse">Loading...</p>
      </div>
    );
  if (error)
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center">
        <p className="text-red-500 text-lg font-semibold">Error: {error}</p>
      </div>
    );

  return (
    <>
      <Navbar />
      <Sidebar />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 p-10">
        {/* Language Switcher */}
        <div className="flex justify-end mb-8">
          <select
            value={language}
            onChange={handleLanguageChange}
            className="bg-white text-gray-800 p-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
          >
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
          </select>
        </div>

        {/* Suggested News Section */}
        <div className="bg-white text-gray-800 p-8 rounded-2xl shadow-xl border border-gray-200">
          <h3 className="text-2xl font-bold mb-3 text-blue-600 tracking-wide">🔵 Suggested for You</h3>
          <p className="text-sm text-gray-500 mb-6 italic">Follow publishers to see more of what you love</p>

          <div className="flex overflow-x-auto space-x-6 mt-4 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
            {newsSources.slice(0, 5).map((source) => (
              <div
                key={source.id}
                className="flex items-center bg-gray-50 rounded-lg p-5 min-w-[320px] cursor-pointer transition-all duration-300 hover:bg-gray-100 hover:shadow-md hover:-translate-y-1 border border-gray-200"
              >
                <img
                  src={source.icon}
                  alt={source.title}
                  className="w-14 h-14 rounded-full mr-5 border-2 border-blue-500/20 object-cover"
                />
                <p className="font-semibold text-gray-800 truncate">{source.title}</p>
                <button className="ml-auto text-blue-500 hover:text-blue-400 text-xl transition-colors duration-200">
                  ➕
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended News Sources */}
        <h2 className="text-gray-800 text-3xl mt-12 mb-8 font-bold tracking-tight">Recommended News Sources</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 justify-items-center">
          {newsSources.map((source) => (
            <Card key={source.id} article={source} />
          ))}
        </div>

        {/* Latest News */}
        <h2 className="text-gray-800 text-3xl mt-12 mb-8 font-bold tracking-tight">Latest News</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 justify-items-center">
          {latestNews.map((news, index) => (
            <NewsCard key={index} article={news} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;