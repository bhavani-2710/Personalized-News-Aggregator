import React, { useEffect, useState } from "react";
import NewsCard from "../components/NewsCard";


const API_URL = import.meta.env.VITE_API_BACKEND_URL;

const LatestNews = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(`${API_URL}/news/lang/${language}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch news articles");
        }
        return response.json();
      })
      .then((data) => {
        setArticles(data.results || []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [language]);

  const handleLanguageChange = (e) => {
    setLoading(true);
    setLanguage(e.target.value);
  };

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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center">
        <p className="text-gray-700 text-lg font-semibold animate-pulse">Loading news articles...</p>
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
      {/* Search Bar */}
      <div className="hidden sm:ml-8 sm:flex sm:flex-1 sm:justify-center">
                  <form className="relative w-full max-w-2xl mx-auto">
                    <input
                      type="text"
                      className="w-full rounded-full border-gray-300 bg-gray-50 text-gray-800 placeholder-gray-400 py-2.5 pl-12 pr-24 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-200"
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
            {/* Add more languages as needed */}
          </select>
        </div>

        {/* Latest News Section */}
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
              No articles available for this language.
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default LatestNews;