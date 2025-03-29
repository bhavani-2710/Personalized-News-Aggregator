import React, { useEffect, useState } from "react";
import axios from "axios";
import NewsCard from "../components/NewsCard";
import Sidebar from "../components/Sidebar";

const API_URL = import.meta.env.VITE_API_BACKEND_URL;

const LatestNews = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [language, setLanguage] = useState("en");
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState(""); // New date filter state

  useEffect(() => {
    const fetchNews = async () => {
      const token = localStorage.getItem("token");
      setLoading(true);

      try {
        let url = `${API_URL}/news/lang/${language}`;
        const params = {};

        // Add date filter if selected
        if (dateFilter) {
          params.date = dateFilter;
        }

        const response = await axios.get(url, {
          headers: { Authorization: `Bearer ${token}` },
          params
        });

        setArticles(response.data.results);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchNews();
  }, [language, dateFilter]); // Add dateFilter as a dependency

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  const handleDateChange = (e) => {
    setDateFilter(e.target.value);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);

    const term = searchTerm.trim().toLowerCase();
    const token = localStorage.getItem("token");

    try {
      if (!term) {
        // If search term is empty, fetch regular news with current filters
        const params = {};
        if (dateFilter) params.date = dateFilter;

        const response = await axios.get(`${API_URL}/news/lang/${language}`, {
          headers: { Authorization: `Bearer ${token}` },
          params
        });
        setArticles(response.data.results);
      } else {
        // Search with term and apply filters if present
        const params = { searchWord: term };
        if (dateFilter) params.date = dateFilter;
        if (language !== "en") params.language = language;

        const response = await axios.get(
          `${API_URL}/news/search`,
          {
            headers: { Authorization: `Bearer ${token}` },
            params
          }
        );
        setArticles(response.data.results);
      }
    } catch (error) {
      console.error("Search error:", error);
      setError(error.message);
    } finally {
      setLoading(false);
      setSearchTerm(""); // Clear search term after search
    }
  };

  if (loading)
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center">
        <p className="text-gray-700 text-lg font-semibold animate-pulse">
          Loading news articles...
        </p>
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
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
        <Sidebar /> {/* Sidebar component for navigation */}

        {/* Search and Filters Area - Horizontal Layout */}
        <div className="px-6 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {/* Search Bar */}
            <div className="w-full px-4 sm:px-8 my-5 ">
              <form onSubmit={handleSearch} className="max-w-2xl  mx-auto relative">
                <input
                  type="text"
                  name="searchInput"
                  className="w-full rounded-full border-gray-300 bg-gray-50 text-gray-800 placeholder-gray-400 py-3.5 pl-12 pr-24 border-blue-500 ring-blue-200 ring focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-200"
                  placeholder="Search trending news..."
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-500 text-white rounded-full px-4 py-1.5 hover:bg-blue-600 transition-colors duration-200"
                >
                  Search
                </button>
                <div className="absolute left-4 top-1/2 -translate-y-1/2">
                  <svg
                    className="h-5 w-5 text-gray-500"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zm6 14l-4-4"
                    />
                  </svg>
                </div>
              </form>
            </div>

            {/* Filters - Now to the right of search bar */}
            <div className="flex items-center mr-10 gap-8">
              {/* Language Filter */}
              <div className="w-auto ">
                <select
                  id="language-filter"
                  value={language}
                  onChange={handleLanguageChange}
                  className="bg-white text-gray-800 p-2.5 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
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

              {/* Date Filter */}
              <div className="w-auto">
                <select
                  id="date-filter"
                  value={dateFilter}
                  onChange={handleDateChange}
                  className="bg-white text-gray-800 p-2.5 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
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

        {/* Latest News Section */}
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 p-10">
          <h2 className="text-gray-800 text-3xl mt-4 mb-8 font-bold tracking-tight text-center">
            Latest News
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 justify-items-center">
            {articles.length > 0 ? (
              articles.map((article, index) => (
                <NewsCard key={index} article={article} />
              ))
            ) : (
              <p className="text-gray-600 text-center col-span-full">
                No articles available for your search or selected filters.
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default LatestNews;