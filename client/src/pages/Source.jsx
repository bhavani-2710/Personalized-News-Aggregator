import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "https://newsdata.io/api/1/sources?country=in&apikey=pub_66920e85fdfc3ff5252f2635f412476fe4003";

const Card = ({ article }) => {
  const navigate = useNavigate();

  return (
    <div
      className="bg-gray-900 text-white p-5 rounded-2xl shadow-lg w-full md:w-1/3 overflow-hidden cursor-pointer hover:shadow-xl transition"
      onClick={() => navigate(`/article/${article.id}`)}
    >
      <img src={article.icon} alt={article.name} className="w-full h-40 object-cover rounded-xl" />
      <h2 className="text-xl font-bold mt-3 truncate">{article.name}</h2>
      <p className="text-gray-400 text-sm mt-2 line-clamp-3">{article.description || "No description available."}</p>
    </div>
  );
};

const Source = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(API_URL)
      .then((res) => {
        const filteredArticles = (res.data.results || []).filter((a) => a.icon && a.icon.trim() !== "");
        setArticles(filteredArticles);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Something went wrong while fetching news sources.");
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-white text-center mt-10 text-lg">Loading news sources...</p>;
  if (error) return <p className="text-red-500 text-center mt-10 text-lg">Error: {error}</p>;

  return (
    <div className="min-h-screen bg-gray-800 flex flex-wrap gap-6 p-6 justify-center">
      {articles.map((article) => <Card key={article.id} article={article} />)}
    </div>
  );
};

export default Source;
