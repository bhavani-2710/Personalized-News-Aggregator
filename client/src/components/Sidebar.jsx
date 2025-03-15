import React, { useState } from 'react';
import { Menu, Book, Clock, User, LogOut } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState('');
  const navigate = useNavigate();

  const handleLogout = () => {
    alert('Logging out...');
    navigate('/login');
  };

  const renderContent = () => {
    switch (selectedSection) {
      case "source":
        return <div>Here are the sources of news.</div>;
      case "latest-news":
        return <div>Showing the latest news.</div>;
      default:
        return <div>Select a section to view content.</div>;
    }
  };

  return (
    <div className="h-10 bg-gray-800 flex">
      <div
        className={`fixed top-0 left-0 h-full bg-black text-white shadow-lg transition-transform transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } w-64 z-50`}
      >
        <h2 className="text-2xl font-bold mb-6 p-4 border-b border-gray-600">
          News Aggregator
        </h2>
        <ul className="space-y-2 p-4">
          <NavLink to={"/source"}>
            <button
              onClick={() => setSelectedSection("source")}
              className={`flex items-center gap-3 w-full text-left p-3 rounded-lg transition-colors ${
                selectedSection === "source"
                  ? "bg-gray-700"
                  : "hover:bg-gray-700"
              }`}
            >
              <Book className="w-5 h-5" />
              <p>Source</p>
            </button>
          </NavLink>
          <NavLink to={"/latest-news"}>
            <button
              onClick={() => setSelectedSection("latest-news")}
              className={`flex items-center gap-3 w-full text-left p-3 rounded-lg transition-colors ${
                selectedSection === "latest-news"
                  ? "bg-gray-700"
                  : "hover:bg-gray-700"
              }`}
            >
              <Clock className="w-5 h-5" />
              <p>Latest News</p>
            </button>
          </NavLink>
        </ul>
        <div className="absolute bottom-4 left-4 right-4 border-t border-gray-600 pt-4">
          <div className="flex items-center gap-3 mb-4">
            <User className="w-5 h-5" />
            <div>
              <p className="font-bold">Profile</p>
              <p className="text-sm">user@example.com</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full bg-red-500 text-white p-3 rounded-lg hover:bg-red-600"
          >
            <LogOut className="w-5 h-5" />
            <span>Log Out</span>
          </button>
        </div>
      </div>

      <div
        className={`flex-grow transition-all duration-300 ${
          isOpen ? "ml-64" : "ml-0"
        }`}
        onClick={(e) => {
          if (isOpen) {
            e.stopPropagation();
            setIsOpen(false);
          }
        }}
      >
        {!isOpen && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(!isOpen);
            }}
            className="absolute top-4 left-4 bg-gray-800 text-white p-2 rounded-full focus:outline-none z-50 shadow-lg"
          >
            <Menu size={24} />
          </button>
        )}
        {/* <div className="p-4">{renderContent()}</div> */}
      </div>
      </div>
  );
};

export default Sidebar;
