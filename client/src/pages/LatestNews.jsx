import React, { useEffect, useState } from "react";
import NewsCard from "../components/NewsCard";
import Navbar from "../components/Navbar";

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
      <Navbar />
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