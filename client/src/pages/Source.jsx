import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../components/Cards"

const API_URL =
  "https://newsdata.io/api/1/sources?country=in&apikey=pub_667716bd1fe9b716e3abc1d23292d16e44fd4";

const Source = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(API_URL)
      .then((res) => {
        const filteredArticles = (res.data.results || []).filter(
          (a) => a.icon && a.icon.trim() !== ""
        );
        setArticles(filteredArticles);
        setLoading(false);
      })
      .catch((err) => {
        setError(
          err.message || "Something went wrong while fetching news sources."
        );
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <p className="text-white text-center mt-10 text-lg">
        Loading news sources...
      </p>
    );
  if (error)
    return (
      <p className="text-red-500 text-center mt-10 text-lg">Error: {error}</p>
    );

  return (
    <div className="min-h-screen bg-gray-800 flex flex-wrap gap-6 p-6 justify-center">
      {console.log(articles)}
      {articles.map((article) => (
        <Card key={article.id} article={article} />
      ))}
    </div>
  );
};

export default Source;
