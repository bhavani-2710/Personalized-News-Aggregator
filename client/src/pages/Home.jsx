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
        {/* Suggested News Section */}
        <div className="bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-700">
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
      </div>
      <Footer />
    </>
  );
};

export default Home;
