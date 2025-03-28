import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../components/Cards";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar"; // Importing Navbar
import Footer from "../components/Footer"; // Importing Footer

const API_URL = import.meta.env.VITE_API_BACKEND_URL;

const Source = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [language, setLanguage] = useState("en");

  useEffect(async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${API_URL}/news/sources/${language}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const filteredArticles = response.data;
      setArticles(filteredArticles);
    } catch (error) {
      console.log(error);
      setError(
        error.message || "Something went wrong while fetching news sources."
      );
    } finally {
      setLoading(false);
    }
  }, [language]);

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
    <div className="flex flex-col min-h-screen">
      <Navbar /> {/* Adding Navbar */}
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1 bg-gradient-to-br from-blue-50 to-gray-100 p-8">
          <div className="w-full max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-gray-800 mb-6 border-b-2 border-blue-500 pb-3">
              News Sources
            </h2>
            <div className="flex flex-wrap gap-8 justify-center">
              {articles && articles.length > 0 ? (
                articles.map((article, index) => (
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
      </div>
      <Footer /> {/* Adding Footer */}
    </div>
  );
};

export default Source;