import React from "react";
import { useNavigate } from "react-router-dom";

function NewsCard({ article }) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (article.link) {
      window.open(article.link, "_blank", "noopener,noreferrer"); // Open in new tab
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 w-full max-w-[360px] min-h-[460px] shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-2 border border-gray-200">
      <a href={article.link} target="_blank" rel="noopener noreferrer">
        <img
          className="w-full h-52 object-cover rounded-xl mb-4"
          src={article.image_url || "./../assets/react.svg"} // Fallback to placeholder if no image
          alt={article.title || "News Image"}
        />
      </a>
      <div className="flex flex-col h-full">
        <a href={article.link} target="_blank" rel="noopener noreferrer">
          <h5 className="text-xl font-semibold text-gray-800 mb-3 line-clamp-2">
            {article.title || "No title available"}
          </h5>
        </a>
        <p className="text-sm text-gray-600 mb-4 line-clamp-4 ">
          {article.description || "No description available"}
        </p>
        {/* <button
          onClick={handleClick}
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 focus:outline-none transition-colors duration-200 mt-auto"
        >
          Read more
          <svg
            className="w-3.5 h-3.5 ml-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </button> */}
      </div>
    </div>
  );
}

export default NewsCard;