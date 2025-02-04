import React, { useEffect, useState } from 'react'
import Card from '../components/Cards'

const API_URL = "https://newsdata.io/api/1/sources?country=in&apikey=pub_66920f1da3317060c541d77964cfde57742ba";

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

  if (loading) return <p className="text-white text-center mt-10">Loading news sources...</p>;
  if (error) return <p className="text-red-500 text-center mt-10">Error: {error}</p>;

  return (
    <div className="min-h-screen bg-gray-800 flex flex-wrap gap-6 p-6 justify-center">
        {console.log(articles)} {/**/}
      {articles && articles.map((article, index) => (
        <Card key={index} article={article} />
      ))}
    </div>
  );
};

export default LatestNews