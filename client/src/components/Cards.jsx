import React from "react";
import { useNavigate } from "react-router-dom";

const Card = ({ article }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    const url = `https://newsdata.io/api/1/latest?country=in&apikey=pub_66920f1da3317060c541d77964cfde57742ba/domain=${article.id}`;
    window.open(url, "_blank", "noopener,noreferrer"); // Open in new tab instead of navigate
  };

  return (
    <div
      className="bg-white text-gray-800 p-6 rounded-2xl shadow-md w-full max-w-[360px] min-h-[340px] cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-2 border border-gray-200"
      onClick={handleClick}
    >
      {article && (
        <>
          <img
            src={article.icon}
            alt={article.name}
            className="w-full h-48 object-cover rounded-xl mb-4"
          />
          <h2 className="text-xl font-semibold text-gray-800 truncate">{article.name}</h2>
          <p className="text-gray-600 text-sm mt-3 line-clamp-3">
            {article.description || "No description available."}
          </p>
        </>
      )}
    </div>
  );
};

export default Card;