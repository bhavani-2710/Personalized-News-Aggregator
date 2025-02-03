import React, { useEffect, useState } from "react";

const API_URL = "https://newsdata.io/api/1/sources?country=in&apikey=pub_669201d855deafa415ee593c86cf6feade4a7";

const Card = ({ article }) => {
  return (
    <div className="bg-gray-900 text-white p-6 rounded-3xl shadow-lg w-full md:w-1/3 h-auto overflow-hidden border border-gray-700">
      {/* Display the icon if available, else fallback to a placeholder */}
      <img
        src={article.icon || "https://via.placeholder.com/300x200"}
        alt={article.name}
        className="w-full h-48 object-cover rounded-xl border border-gray-600"
      />
      <h2 className="text-xl font-bold mt-4 truncate">{article.name}</h2>
      <p className="text-gray-400 text-sm mt-3 line-clamp-3">{article.description || "No description available."}</p>
      <p className="text-gray-300 text-xs mt-3 truncate">
        Category: <span className="font-semibold">{article.category || "Unknown"}</span>
      </p>
      <p className="text-gray-400 text-xs truncate">Country: {article.country || "Unknown"}</p>
      <p className="text-gray-500 text-xs truncate">Language: {article.language || "Unknown"}</p>
    </div>
  );
};

const App = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        if (data && Array.isArray(data.results)) {
          const filteredArticles = data.results.filter((article) => article.icon);
          setArticles(filteredArticles);
        } else {
          setError("Invalid data format received");
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-white text-center mt-10">Loading news sources...</p>;
  if (error) return <p className="text-red-500 text-center mt-10">Error: {error}</p>;

  return (
    <div className="min-h-screen bg-gray-800 flex flex-wrap gap-6 p-6 justify-center">
      {articles.map((article, index) => (
        <Card key={index} article={article} />
      ))}
    </div>
  );
};

export default App;
