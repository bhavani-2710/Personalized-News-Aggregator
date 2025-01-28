import React, { useState } from 'react';
import { Menu } from 'lucide-react';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState('');

  const renderContent = () => {
    switch (selectedSection) {
      case 'source':
        return <div>Here are the sources of news.</div>;
      case 'all-news':
        return <div>Displaying all news articles.</div>;
      case 'latest-news':
        return <div>Showing the latest news.</div>;
      default:
        return <div>Select a section to view content.</div>;
    }
  };

  return (
    <div className="h-screen flex">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-gray-100 shadow-md transition-transform transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } w-64 p-4 z-50`}
      >
        <h2 className="text-xl font-bold mb-6 border-b pb-2">News Aggregator</h2>
        <ul className="space-y-4">
          <li key="source">
            <button
              onClick={() => setSelectedSection('source')}
              className={`block text-gray-800 ${
                selectedSection === 'source' ? 'bg-gray-200' : 'hover:bg-gray-200'
              } p-3 rounded flex items-center space-x-2`}
            >
              <span>📚</span>
              <span>Source</span>
            </button>
          </li>
          <li key="all-news">
            <button
              onClick={() => setSelectedSection('all-news')}
              className={`block text-gray-800 ${
                selectedSection === 'all-news' ? 'bg-gray-200' : 'hover:bg-gray-200'
              } p-3 rounded flex items-center space-x-2`}
            >
              <span>📰</span>
              <span>All News</span>
            </button>
          </li>
          <li key="latest-news">
            <button
              onClick={() => setSelectedSection('latest-news')}
              className={`block text-gray-800 ${
                selectedSection === 'latest-news' ? 'bg-gray-200' : 'hover:bg-gray-200'
              } p-3 rounded flex items-center space-x-2`}
            >
              <span>⏰</span>
              <span>Latest News</span>
            </button>
          </li>
        </ul>
        <div className="mt-8 border-t pt-4">
          <p className="text-gray-600 text-sm">More Features Coming Soon!</p>
        </div>
      </div>

      {/* Main Content */}
      <div
        className={`flex-grow transition-all duration-300 ${isOpen ? 'ml-64' : 'ml-0'}`}
        onClick={(e) => {
          if (isOpen) {
            e.stopPropagation();
            setIsOpen(false);
          }
        }}
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(!isOpen);
          }}
          className="absolute top-4 left-4 bg-gray-800 text-white p-2 rounded focus:outline-none z-50"
        >
          <Menu size={24} />
        </button>
        <div className="p-4">{renderContent()}</div>
      </div>
    </div>
  );
};

export default Sidebar;
