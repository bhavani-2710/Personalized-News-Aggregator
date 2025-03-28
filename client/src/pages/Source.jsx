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

  useEffect(() => {
    const fetchSources = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${API_URL}/news/sources/${language}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log(res.data);
        setArticles(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Fetch sources error:", err);
        setError(
          err.message || "Something went wrong while fetching news sources."
        );
        setLoading(false);
      }
    };

    fetchSources();
  }, [language]);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);

    const term = e.target.value;
    setSearchTerm(term);

    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        `${API_URL}/news/search&searchWord=${term}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setArticles(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <p className="text-gray-600 text-center mt-10 text-lg">
        Loading news sources...
      </p>
    );

  if (error)
    return (
      <div className="text-red-500 text-center mt-10 text-lg bg-red-50 p-3 rounded-lg">
        Error: {error}
      </div>
    );

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
      <Sidebar />
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
      
      <div className="flex-1 bg-gradient-to-br from-blue-50 to-gray-100 p-6">
        <div className="w-full max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-800 mb-6 border-b-2 border-blue-500 pb-3">
            News Sources
          </h2>
          <div className="flex flex-wrap gap-8 justify-center">
            {articles && articles.length > 0 ? (
              articles.map((article) => (
                <Card key={article.id} article={article} />
              ))
            ) : (
              <p className="text-gray-600 text-lg bg-white p-6 rounded-lg shadow-lg">
                No news sources available.
              </p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Source;