import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../components/Cards";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

const API_URL = import.meta.env.VITE_API_BACKEND_URL;

const Source = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [language, setLanguage] = useState("en");
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  useEffect(() => {
    const fetchSources = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${API_URL}/news/sources/${language}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setArticles(res.data);
      } catch (err) {
        setError(err.message || "Something went wrong while fetching news sources.");
      } finally {
        setLoading(false);
      }
    };
    fetchSources();
  }, [language]);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${API_URL}/news/search`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { searchWord: searchTerm.trim().toLowerCase(), date: dateFilter, language },
      });
      setArticles(response.data.results);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
      setSearchTerm("");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-200">
      <Sidebar />
      <div className="flex-1 p-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-6 border-b-2 border-blue-500 pb-3">
            News Sources
          </h2>

          {/* Search & Filters */}
          <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
            <form onSubmit={handleSearch} className="relative w-full md:w-2/3">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 py-3 px-5 pl-12 shadow-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                placeholder="Search news..."
              />
              <button type="submit" className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white px-4 py-1.5 rounded-full hover:bg-blue-600 transition">
                Search
              </button>
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">
                🔍
              </span>
            </form>
            
            {/* Filters */}
            <div className="flex gap-4">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 p-2 rounded-md shadow-sm focus:ring-blue-500 focus:outline-none transition"
              >
                <option value="en">English</option>
                <option value="hi">Hindi</option>
                <option value="mr">Marathi</option>
                <option value="ta">Tamil</option>
              </select>
              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 p-2 rounded-md shadow-sm focus:ring-blue-500 focus:outline-none transition"
              >
                <option value="">All Time</option>
                <option value="today">Today</option>
                <option value="yesterday">Yesterday</option>
                <option value="last7days">Last 7 Days</option>
              </select>
            </div>
          </div>

          {/* News Sources */}
          {loading ? (
            <p className="text-center text-lg">Loading news sources...</p>
          ) : error ? (
            <p className="text-center text-red-500 bg-red-100 p-3 rounded-lg">Error: {error}</p>
          ) : articles.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {articles.map((article) => (
                <Card key={article.id} article={article} />
              ))}
            </div>
          ) : (
            <p className="text-center text-lg bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">No news sources available.</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Source;