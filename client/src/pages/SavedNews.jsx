import React, { useEffect, useState } from "react";
import NewsCard from "../components/NewsCard";
import Card from "../components/Cards";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_BACKEND_URL;

const SavedNews = () => {
  const [visitedNews, setVisitedNews] = useState([]);
  const [visitedSources, setVisitedSources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchVisitedNews = axios.get(`${API_URL}/news/visited`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const fetchVisitedSources = axios.get(`${API_URL}/news/visited-sources`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    Promise.all([fetchVisitedNews, fetchVisitedSources])
      .then(([newsRes, sourcesRes]) => {
        setVisitedNews(newsRes.data.results || []);
        setVisitedSources(sourcesRes.data || []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Something went wrong while fetching data.");
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <p className="text-white text-center mt-10 text-lg">
        Loading saved news...
      </p>
    );
  if (error)
    return (
      <p className="text-red-500 text-center mt-10 text-lg">Error: {error}</p>
    );

  return (
    <>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <div className="min-h-screen bg-yellow-950 p-6 flex flex-col gap-10 w-full">
          <section>
            <h2 className="text-white text-2xl mb-4 font-bold border-b-2 border-yellow-600 pb-2">
              Visited News
            </h2>
            <div className="flex flex-wrap gap-6 justify-center">
              {visitedNews.length > 0 ? (
                visitedNews.map((article, index) => (
                  <NewsCard key={index} article={article} />
                ))
              ) : (
                <p className="text-gray-300 text-lg">
                  No visited news available.
                </p>
              )}
            </div>
          </section>
          <section>
            <h2 className="text-white text-2xl mb-4 font-bold border-b-2 border-yellow-600 pb-2">
              Visited Sources
            </h2>
            <div className="flex flex-wrap gap-6 justify-center">
              {visitedSources.length > 0 ? (
                visitedSources.map((source, index) => (
                  <Card key={index} article={source} />
                ))
              ) : (
                <p className="text-gray-300 text-lg">
                  No visited sources available.
                </p>
              )}
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default SavedNews;
