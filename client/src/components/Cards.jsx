import React from "react";
import { useNavigate } from "react-router-dom";

const Card = ({ article }) => {
  const navigate = useNavigate();

  return (
    <div
      className="bg-gray-900 text-white p-5 rounded-2xl shadow-lg w-full md:w-1/3 overflow-hidden cursor-pointer hover:shadow-xl transition"
      onClick={() => navigate(`https://newsdata.io/api/1/latest?country=in&apikey=pub_66920f1da3317060c541d77964cfde57742ba/domain=${article.id}`)}
    >
      {article && (
        <>
          <img
            src={article.icon}
            alt={article.name}
            className="w-full h-40 object-cover rounded-xl"
          />
          <h2 className="text-xl font-bold mt-3 truncate">{article.name}</h2>
          <p className="text-gray-400 text-sm mt-2 line-clamp-3">
            {article.description || "No description available."}
          </p>
        </>
      )}
    </div>
  );
};

export default Card;
