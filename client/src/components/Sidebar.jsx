import React, { useState, useRef, useEffect } from 'react';
import { Menu, Book, Clock, User, LogOut } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState("");
  const navigate = useNavigate();
  const sidebarRef = useRef(null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // Close sidebar if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="h-10 bg-yellow-950 flex">
      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed top-0 left-0 h-full bg-yellow-950 text-white shadow-lg transition-transform transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } w-64 z-50`}
      >
        <h2 className="text-2xl font-bold mb-6 p-4 border-b border-yellow-700 text-yellow-400">
          NewsHub
        </h2>
        <ul className="space-y-2 p-4">
          <NavLink to={'/source'}>
            <button
              onClick={() => setSelectedSection('source')}
              className={`flex items-center gap-3 w-full text-left p-3 rounded-lg transition-colors ${
                selectedSection === 'source' ? 'bg-yellow-800' : 'hover:bg-yellow-700'
              }`}
            >
              <Book className="w-5 h-5 text-yellow-400" />
              <p>Source</p>
            </button>
          </NavLink>
          <NavLink to={'/latest-news'}>
            <button
              onClick={() => setSelectedSection('latest-news')}
              className={`flex items-center gap-3 w-full text-left p-3 rounded-lg transition-colors ${
                selectedSection === 'latest-news' ? 'bg-yellow-800' : 'hover:bg-yellow-700'
              }`}
            >
              <Clock className="w-5 h-5 text-yellow-400" />
              <p>Latest News</p>
            </button>
          </NavLink>
        </ul>
        <div className="absolute bottom-4 left-4 right-4 border-t border-yellow-700 pt-4">
          <div className="flex items-center gap-3 mb-4">
            <User className="w-5 h-5 text-yellow-400" />
            <div>
              <p className="font-bold text-yellow-300">Profile</p>
              <p className="text-sm text-yellow-500">user@example.com</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full bg-red-600 text-white p-3 rounded-lg hover:bg-red-700"
          >
            <LogOut className="w-5 h-5" />
            <span>Log Out</span>
          </button>
        </div>
      </div>

      {/* Sidebar Toggle Button */}
      <div className="flex-grow">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="absolute top-4 left-4 bg-yellow-950 text-yellow-400 p-2 rounded-full focus:outline-none z-50 shadow-lg hover:bg-yellow-800"
          >
            <Menu size={24} />
          </button>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
