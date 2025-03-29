import React, { useEffect, useState } from "react";
import axios from "axios";
import NewsCard from "../components/NewsCard";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const API_URL = import.meta.env.VITE_API_BACKEND_URL;

const LatestNews = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [language, setLanguage] = useState("en");
  const [dateFilter, setDateFilter] = useState("");

  useEffect(() => {
    const fetchNews = async () => {
      const token = localStorage.getItem("token");
      setLoading(true);

      try {
        let url = `${API_URL}/news/lang/${language}`;
        const params = {};

        if (dateFilter) {
          params.date = dateFilter;
        }

        const response = await axios.get(url, {
          headers: { Authorization: `Bearer ${token}` },
          params,
        });

        setArticles(response.data.results);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchNews();
  }, [language, dateFilter]);

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  const handleDateChange = (e) => {
    setDateFilter(e.target.value);
  };

  if (loading)
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <p className="text-gray-300 text-lg font-semibold animate-pulse">
          Loading news articles...
        </p>
      </div>
    );
  if (error)
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <p className="text-red-400 text-lg font-semibold">Error: {error}</p>
      </div>
    );

  return (
    <>
      <Navbar />
      <Sidebar />
      <div className="min-h-screen bg-gray-900 p-10 text-white">
        <div className="px-6 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <div className="flex items-center mr-10 gap-8">
              <div className="w-auto">
                <select
                  id="language-filter"
                  value={language}
                  onChange={handleLanguageChange}
                  className="bg-gray-800 text-gray-300 p-2.5 rounded-lg border border-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
                >
                  <option value="en">English</option>
                  <option value="hi">Hindi</option>
                  <option value="mr">Marathi</option>
                  <option value="ta">Tamil</option>
                  <option value="te">Telugu</option>
                  <option value="ml">Malayalam</option>
                  <option value="kn">Kannada</option>
                  <option value="pa">Punjabi</option>
                  <option value="bn">Bengali</option>
                  <option value="gu">Gujarati</option>
                </select>
              </div>

              <div className="w-auto">
                <select
                  id="date-filter"
                  value={dateFilter}
                  onChange={handleDateChange}
                  className="bg-gray-800 text-gray-300 p-2.5 rounded-lg border border-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
                >
                  <option value="">All Time</option>
                  <option value="today">Today</option>
                  <option value="yesterday">Yesterday</option>
                  <option value="last7days">Last 7 Days</option>
                  <option value="last30days">Last 30 Days</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <h2 className="text-gray-300 text-3xl mt-12 mb-8 font-bold tracking-tight text-center">
          Latest News
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 justify-items-center">
          {articles.length > 0 ? (
            articles.map((article, index) => (
              <NewsCard key={index} article={article} />
            ))
          ) : (
            <p className="text-gray-500 text-center col-span-full">
              No articles available for your search or selected filters.
            </p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LatestNews;
