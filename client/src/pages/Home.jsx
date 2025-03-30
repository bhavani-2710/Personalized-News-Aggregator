import React, { useEffect, useState } from "react";
import Card from "../components/Cards";
import NewsCard from "../components/NewsCard";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import { useSelector } from "react-redux";

const API_URL = import.meta.env.VITE_API_BACKEND_URL;

const Home = () => {
  const [newsSources, setNewsSources] = useState([]);
  const [latestNews, setLatestNews] = useState([]);
  const [suggestedPublishers, setSuggestedPublishers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [language, setLanguage] = useState("en");
  const [dateFilter, setDateFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [articles, setArticles] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchPerformed, setSearchPerformed] = useState(false);

  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(
          `${API_URL}/history/recommendations/${user.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data);
        setNewsSources(response.data.recommendedSources);
        setLatestNews(response.data.recommendedArticles);
        setSuggestedPublishers(response.data.suggestedPublishers);
        setError(null);
      } catch (err) {
        setError(err.message || "Something went wrong while fetching data.");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [language]);

  const handleAddSource = async (source) => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.post(
        `${API_URL}/history/save-news`,
        { sources: [source] },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res);
      alert("Source added successfully!");
    } catch (err) {
      console.error(err);
      alert("Error adding source. Please try again.");
    }
  };

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
    // Reset search when language changes
    setSearchPerformed(false);
    setArticles([]);
  };

  const handleDateChange = (e) => {
    setDateFilter(e.target.value);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    
    setIsSearching(true);
    setSearchPerformed(true);
    
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${API_URL}/news/search`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { 
          searchWord: searchTerm.trim().toLowerCase(), 
          date: dateFilter, 
          language 
        },
      });
      setArticles(response.data.results);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsSearching(false);
    }
  };
  
  const clearSearch = () => {
    setSearchTerm("");
    setArticles([]);
    setSearchPerformed(false);
  };

  if (loading)
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <p className="text-gray-300 text-lg font-semibold animate-pulse">
          Loading...
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
        {/* Search & Filters */}
        <div className="flex flex-col w-auto ml-50 md:flex-row items-end gap-4 mb-6">
          <form onSubmit={handleSearch} className="relative w-full md:w-2/3">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 py-3 px-5 pl-12 shadow-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              placeholder="Search news..."
            />
            <button 
              type="submit" 
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white px-4 py-1.5 rounded-full hover:bg-blue-600 transition"
            >
              Search
            </button>
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">
              🔍
            </span>
          </form>
          
          {/* Filters */}
          <div className="flex ml-40 flex-end gap-6">
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

        {/* Search Results Section */}
        {searchPerformed && (
          <div className="mb-12">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-gray-300 text-3xl font-bold tracking-tight">
                Search Results
              </h2>
              <button
                onClick={clearSearch}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md text-sm transition"
              >
                Clear Search
              </button>
            </div>
            
            {isSearching ? (
              <div className="flex justify-center py-10">
                <p className="text-gray-300 text-lg font-semibold animate-pulse">
                  Searching...
                </p>
              </div>
            ) : articles.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 justify-items-center">
                {articles.map((article, index) => (
                  <NewsCard key={`search-${index}`} article={article} />
                ))}
              </div>
            ) : (
              <div className="bg-gray-800 p-8 rounded-lg text-center">
                <p className="text-gray-300">No results found for "{searchTerm}"</p>
                <p className="text-gray-500 mt-2 text-sm">Try different keywords or filters</p>
              </div>
            )}
          </div>
        )}

        {/* Only show recommended content if not searching */}
        {(!searchPerformed || articles.length === 0) && (
          <>
            {/* Suggested News Section */}
            <div className="bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-700 mb-12">
              <h3 className="text-2xl font-bold mb-3 text-blue-400 tracking-wide">
                Suggested for You
              </h3>
              <p className="text-sm text-gray-400 mb-6 italic">
                Follow publishers to see more of what you love
              </p>

              <div className="flex items-center space-x-6 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
                {suggestedPublishers.slice(0, 4).map((source) => (
                  <div
                    key={source.id}
                    className="flex items-center bg-gray-700 rounded-lg p-5 min-w-[320px] cursor-pointer transition-all duration-300 hover:bg-gray-600 hover:shadow-md hover:-translate-y-1 border border-gray-600"
                  >
                    <img
                      src={source.icon}
                      alt={source.title}
                      className="w-14 h-14 rounded-full mr-5 border-2 border-blue-500/20 object-cover"
                    />
                    <p className="font-semibold text-gray-300 truncate">
                      {source.name}
                    </p>
                    <button
                      className="ml-auto cursor-pointer text-blue-400 hover:text-blue-300 text-xl transition-colors duration-200"
                      onClick={() => handleAddSource(source)}
                    >
                      ➕
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommended News Sources */}
            <h2 className="text-gray-300 text-3xl mt-12 mb-8 font-bold tracking-tight">
              Recommended News Sources
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 justify-items-center">
              {newsSources.slice(2).map((source) => (
                <Card key={source.id} article={source} />
              ))}
            </div>

            {/* Latest News */}
            <h2 className="text-gray-300 text-3xl mt-12 mb-8 font-bold tracking-tight">
              Latest News
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 justify-items-center">
              {latestNews.slice(0, 4).map((news, index) => (
                <NewsCard key={index} article={news} />
              ))}
            </div>
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Home;