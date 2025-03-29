import React, { useEffect, useState } from "react";
import axios from "axios";
import NewsCard from "../components/NewsCard";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const API_URL = import.meta.env.VITE_API_BACKEND_URL;

const LatestNews = () => {
  const [allArticles, setAllArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [language, setLanguage] = useState("en");
  const [dateFilter, setDateFilter] = useState("");
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [articlesPerPage] = useState(8);

  useEffect(() => {
    const fetchNews = async () => {
      const token = localStorage.getItem("token");
      setLoading(true);

      try {
        // Only filter by language on the backend
        const url = `${API_URL}/news/lang/${language}`;
        
        const response = await axios.get(url, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setAllArticles(response.data.results);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchNews();
  }, [language]); // Only re-fetch when language changes

  // Apply date filtering in frontend
  useEffect(() => {
    if (allArticles.length === 0) return;
    
    let filtered = [...allArticles];
    
    if (dateFilter) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      switch (dateFilter) {
        case 'today':
          filtered = filtered.filter(article => {
            const pubDate = new Date(article.pubDate);
            return pubDate >= today;
          });
          break;
        case 'yesterday':
          const yesterday = new Date(today);
          yesterday.setDate(yesterday.getDate() - 1);
          filtered = filtered.filter(article => {
            const pubDate = new Date(article.pubDate);
            return pubDate >= yesterday && pubDate < today;
          });
          break;
        case 'last7days':
          const last7Days = new Date(today);
          last7Days.setDate(last7Days.getDate() - 7);
          filtered = filtered.filter(article => {
            const pubDate = new Date(article.pubDate);
            return pubDate >= last7Days;
          });
          break;
        case 'last30days':
          const last30Days = new Date(today);
          last30Days.setDate(last30Days.getDate() - 30);
          filtered = filtered.filter(article => {
            const pubDate = new Date(article.pubDate);
            return pubDate >= last30Days;
          });
          break;
        default:
          // No filter or unrecognized filter
          break;
      }
    }
    
    setFilteredArticles(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [allArticles, dateFilter]);

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  const handleDateChange = (e) => {
    setDateFilter(e.target.value);
  };

  // Get current articles for pagination
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = filteredArticles.slice(indexOfFirstArticle, indexOfLastArticle);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
  // Calculate total pages
  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);
  
  // Generate page numbers array
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

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
          {currentArticles.length > 0 ? (
            currentArticles.map((article, index) => (
              <NewsCard key={index} article={article} />
            ))
          ) : (
            <p className="text-gray-500 text-center col-span-full">
              No articles available for your search or selected filters.
            </p>
          )}
        </div>
        
        {/* Pagination Controls */}
        {filteredArticles.length > articlesPerPage && (
          <div className="mt-10 flex justify-center">
            <nav className="flex items-center">
              <button
                onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}
                disabled={currentPage === 1}
                className={`mx-1 px-3 py-2 rounded-md ${
                  currentPage === 1
                    ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700 cursor-pointer"
                }`}
              >
                Previous
              </button>
              
              {pageNumbers.map(number => (
                <button
                  key={number}
                  onClick={() => paginate(number)}
                  className={`mx-1 px-4 py-2 rounded-md cursor-pointer ${
                    currentPage === number
                      ? "bg-blue-600 text-white"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  {number}
                </button>
              ))}
              
              <button
                onClick={() => paginate(currentPage < totalPages ? currentPage + 1 : totalPages)}
                disabled={currentPage === totalPages || totalPages === 0}
                className={`mx-1 px-3 py-2 rounded-md ${
                  currentPage === totalPages || totalPages === 0
                    ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700 cursor-pointer"
                }`}
              >
                Next
              </button>
            </nav>
          </div>
        )}
        
      </div>
      <Footer />
    </>
  );
};

export default LatestNews;