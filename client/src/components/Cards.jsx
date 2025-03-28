import React from "react";
import { useNavigate } from "react-router-dom";

const Card = ({ article }) => {
  const navigate = useNavigate();

  const handleClick = (article) => {
    // const url = article.url
    // window.open(url, "_blank", "noopener, noreferrer"); // Open in new tab instead of navigate
    navigate("/domain-news", {
      state: { domain: article.id, name: article.name }, // Pass the article data to the new page
    });
  };

  return (
    <div
      className="bg-white text-gray-800 p-6 rounded-2xl shadow-md w-full max-w-[360px] min-h-[340px] cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-2 border border-gray-200"
      onClick={() => handleClick(article)}
    >
      {/* {console.log(article)} */}
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