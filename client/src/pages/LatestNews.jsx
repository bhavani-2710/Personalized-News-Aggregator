import React, { useEffect, useState } from "react";
import Card from "../components/Cards";
import NewsCard from "../components/NewsCard";

const API_URL =
  "https://newsdata.io/api/1/latest?country=in&language=en&apikey=pub_66444a397d41a7fb2885640ab4febc90b95bb";

const LatestNews = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        setArticles(data.results);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

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
        articles.map(
          (article, index) =>
            (article.description && (
              <NewsCard key={index} article={article} />
            )) || <p>Loading...</p>
        )}
    </div>
  );
};

export default LatestNews;
