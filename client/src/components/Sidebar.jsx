import React, { useState, useRef, useEffect } from "react";
import { Menu, Book, Clock, User, LogOut, Home, Bookmark } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../redux/userSlice";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const sidebarRef = useRef(null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(clearUser());
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
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative">
      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed top-0 left-0 h-full bg-white text-gray-800 shadow-lg transition-transform transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } w-72 z-50 border-r border-gray-200`}
      >
        <h2 className="text-2xl font-bold mb-6 p-6 border-b border-gray-200 text-blue-500">
          NewsHub
        </h2>
        <ul className="space-y-3 p-6">
          {/* Home */}
          <NavLink to="/home" onClick={() => setSelectedSection("home")}>
            <button
              className={`flex items-center gap-4 w-full text-left p-3 rounded-lg transition-colors ${
                selectedSection === "home"
                  ? "bg-blue-50 text-blue-500"
                  : "text-gray-700 hover:bg-gray-100 hover:text-blue-500"
              }`}
            >
              <Home className="w-5 h-5" />
              <p>Home</p>
            </button>
          </NavLink>

          {/* Source */}
          <NavLink to="/source" onClick={() => setSelectedSection("source")}>
            <button
              className={`flex items-center gap-4 w-full text-left p-3 rounded-lg transition-colors ${
                selectedSection === "source"
                  ? "bg-blue-50 text-blue-500"
                  : "text-gray-700 hover:bg-gray-100 hover:text-blue-500"
              }`}
            >
              <Book className="w-5 h-5" />
              <p>Source</p>
            </button>
          </NavLink>

          {/* Latest News */}
          <NavLink
            to="/latest-news"
            onClick={() => setSelectedSection("latest-news")}
          >
            <button
              className={`flex items-center gap-4 w-full text-left p-3 rounded-lg transition-colors ${
                selectedSection === "latest-news"
                  ? "bg-blue-50 text-blue-500"
                  : "text-gray-700 hover:bg-gray-100 hover:text-blue-500"
              }`}
            >
              <Clock className="w-5 h-5" />
              <p>Latest News</p>
            </button>
          </NavLink>

          {/* Saved News */}
          <NavLink
            to="/saved-news"
            onClick={() => setSelectedSection("saved-news")}
          >
            <button
              className={`flex items-center gap-4 w-full text-left p-3 rounded-lg transition-colors ${
                selectedSection === "saved-news"
                  ? "bg-blue-50 text-blue-500"
                  : "text-gray-700 hover:bg-gray-100 hover:text-blue-500"
              }`}
            >
              <Bookmark className="w-5 h-5" />
              <p>Saved News</p>
            </button>
          </NavLink>
        </ul>

        {/* User Info & Logout */}
        <div className="absolute bottom-6 left-6 right-6 border-t border-gray-200 pt-6">
          <div className="flex items-center gap-4 mb-6">
            <User className="w-6 h-6 text-gray-500" />
            <div>
              <p className="font-semibold text-gray-800">{user.name}</p>
              <p className="text-sm text-gray-600">{user.email}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-4 w-full bg-red-500 text-white p-3 rounded-lg hover:bg-red-600 transition-colors duration-200"
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
            className="fixed top-4 left-4 bg-white text-gray-600 p-2 rounded-full shadow-md hover:bg-gray-100 hover:text-blue-500 focus:outline-none z-50 transition-colors duration-200"
          >
            <Menu size={24} />
          </button>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
