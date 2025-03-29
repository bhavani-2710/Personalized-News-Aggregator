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
        className={`fixed top-0 left-0 h-full bg-gray-900 text-white shadow-xl transition-transform transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } w-72 z-50 border-r border-gray-800`}
      >
        <h2 className="text-3xl font-bold mb-8 p-6 border-b border-gray-700 text-blue-400">
          NewsHub
        </h2>
        <ul className="space-y-3 p-6">
          {/* Sidebar Links */}
          {["home", "source", "latest-news", "saved-news"].map((item, index) => {
            const icons = [Home, Book, Clock, Bookmark];
            const labels = ["Home", "Source", "Latest News", "Saved News"];
            const Icon = icons[index];
            return (
              <NavLink key={item} to={`/${item}`} onClick={() => setSelectedSection(item)}>
                <button
                  className={`flex items-center gap-4 w-full text-left p-4 rounded-lg transition-colors text-lg font-medium ${
                    selectedSection === item
                      ? "bg-blue-600 text-white"
                      : "text-gray-400 hover:bg-gray-800 hover:text-blue-300"
                  }`}
                >
                  <Icon className="w-6 h-6" />
                  <p>{labels[index]}</p>
                </button>
              </NavLink>
            );
          })}
        </ul>

        {/* User Info & Logout */}
        <div className="absolute bottom-6 left-6 right-6 border-t border-gray-700 pt-6">
          <div className="flex items-center gap-4 mb-6">
            <User className="w-7 h-7 text-gray-500" />
            <div>
              <p className="font-semibold text-white text-lg">{user.name}</p>
              <p className="text-sm text-gray-400">{user.email}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-4 w-full bg-red-600 text-white p-4 rounded-lg hover:bg-red-700 transition-colors duration-200 text-lg font-semibold"
          >
            <LogOut className="w-6 h-6" />
            <span>Log Out</span>
          </button>
        </div>
      </div>

      {/* Sidebar Toggle Button */}
      <div className="flex-grow">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="fixed top-4 left-4 bg-white text-black p-1.5 rounded-full shadow-md hover:bg-gray-800 focus:outline-none z-50 transition-all"
          >
            <Menu size={28} />
          </button>
        )}
      </div>
    </div>
  );
};

export default Sidebar;