import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../components/Cards";
import Sidebar from "../components/Sidebar";

const API_URL = import.meta.env.VITE_API_BACKEND_URL;

const Source = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios
      .get(`${API_URL}/news/sources/${language}`, {headers: {Authorization: `Bearer ${token}`}})
      .then((res) => {
        console.log(res);
        // const filteredArticles = (res.data.results || []).filter(
        //   (a) => a.icon && a.icon.trim() !== ""
        // );
        const filteredArticles = res.data;
        setArticles(filteredArticles);
        setLoading(false);
      })
      .catch((err) => {
        setError(
          err.message || "Something went wrong while fetching news sources."
        );
        setLoading(false);
      });
  }, [language]);

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

  return (<>
  <Sidebar />
    <div className=" bg-gray-800 flex flex-wrap gap-6 p-6 justify-center">
      {articles &&
        articles.map((article, index) => (
          <Card key={article.id} article={article} />
        ))}
    </div>
    </>
  );
};

export default Source;
