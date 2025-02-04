import React from "react";

const Card = ({ article }) => {
  return (
    <div className="bg-gray-900 text-white p-5 rounded-2xl shadow-lg w-full md:w-1/3 overflow-hidden">
      <img
        src={article.image_url && article.image_url !== "" ? article.image_url : "https://via.placeholder.com/300x150"}
        alt={article.name}
        className="w-full h-40 object-cover rounded-xl"
      />
      <h2 className="text-xl font-bold mt-3 truncate">{article.name}</h2>
      <p className="text-gray-400 text-sm mt-2 line-clamp-3">{article.description || "No description available."}</p>
      <p className="text-gray-300 text-xs mt-2 truncate">
        Category: <span className="font-semibold">{article.category || "Unknown"}</span>
      </p>
      <p className="text-gray-400 text-xs truncate">Country: {article.country || "Unknown"}</p>
      <p className="text-gray-500 text-xs truncate">Language: {article.language || "Unknown"}</p>
    </div>
  );
};

export default Card;