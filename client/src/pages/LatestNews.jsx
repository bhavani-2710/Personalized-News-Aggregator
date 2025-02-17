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
      .then((response) => response.json())
      .then((data) => {
        setArticles(data.results);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [language]);

  if (loading)
    return (
      <p className="text-white text-center mt-10">Loading news sources...</p>
    );
  if (error)
    return <p className="text-red-500 text-center mt-10">Error: {error}</p>;

  return (
    <div className="min-h-screen bg-gray-800 flex flex-wrap gap-6 p-6 justify-center">
      {console.log(articles)} {/**/}
      {articles &&
        articles.map((article, index) => (
          <NewsCard key={index} article={article} />
        ))}
    </div>
  );
};

export default LatestNews;
