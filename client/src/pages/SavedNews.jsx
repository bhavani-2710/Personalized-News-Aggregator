import React, { useEffect, useState } from "react";
import NewsCard from "../components/NewsCard";
import Card from "../components/Cards";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer"; // Importing Footer
import axios from "axios";

const API_URL = import.meta.env.VITE_API_BACKEND_URL;

const SavedNews = () => {
  const [visitedNews, setVisitedNews] = useState([]);
  const [visitedSources, setVisitedSources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchHistory = async () => {
    try {
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };

      const result = await axios.get(`${API_URL}/history/fetch-history`, { headers });
      console.log(result.data);

      setVisitedNews(result.data.data.articles || []);
      setVisitedSources(result.data.data.sources || []);
    } catch (err) {
      setError(err.response?.data?.message || "Error fetching data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  if (loading)
    return (
      <p className="text-gray-600 text-center mt-10 text-lg">
        Loading saved news...
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
      <Navbar /> {/* Navbar is already here */}
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1 bg-gradient-to-br from-blue-50 to-gray-100 p-8">
          <div className="w-full max-w-7xl mx-auto flex flex-col gap-12">
            <section>
              <h2 className="text-4xl font-bold text-gray-800 mb-6 border-b-2 border-blue-500 pb-3">
                Visited News
              </h2>
              <div className="flex flex-wrap gap-8 justify-center">
                {visitedNews.length > 0 ? (
                  visitedNews.map((article, index) => (
                    <NewsCard key={index} article={article} />
                  ))
                ) : (
                  <p className="text-gray-600 text-lg bg-white p-6 rounded-lg shadow-lg">
                    No visited news available.
                  </p>
                )}
              </div>
            </section>
            <section>
              <h2 className="text-4xl font-bold text-gray-800 mb-6 border-b-2 border-blue-500 pb-3">
                Visited Sources
              </h2>
              <div className="flex flex-wrap gap-8 justify-center">
                {visitedSources.length > 0 ? (
                  visitedSources.map((source, index) => (
                    <Card key={index} article={source} />
                  ))
                ) : (
                  <p className="text-gray-600 text-lg bg-white p-6 rounded-lg shadow-lg">
                    No visited sources available.
                  </p>
                )}
              </div>
            </section>
          </div>
        </div>
      </div>
      <Footer /> {/* Adding Footer */}
    </div>
  );
};

export default SavedNews;