import React, { useState, useRef, useEffect } from "react";
import { Menu, Book, Clock, User, LogOut, Home, Bookmark } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../redux/userSlice";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
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
        className={`fixed top-0 left-0 h-full bg-gray-900/90 backdrop-blur-lg text-white shadow-lg transition-transform transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } w-72 z-50 border-r border-gray-800 p-6 flex flex-col`}
      >
        <h2 className="text-3xl font-extrabold mb-8 text-blue-400">NewsHub</h2>
        <ul className="space-y-3 flex-grow">
          {["home", "sources", "latest-news", "saved"].map((item, index) => {
            const icons = [Home, Book, Clock, Bookmark];
            const labels = ["Home", "Sources", "Latest", "Saved"];
            const Icon = icons[index];
            return (
              <NavLink key={item} to={`/${item}`} className={({ isActive }) =>
                `flex items-center gap-4 p-4 rounded-lg transition-all duration-200 text-lg font-medium hover:bg-blue-600 hover:text-white ${
                  isActive ? "bg-blue-600 text-white" : "text-gray-400"
                }`}
              >
                <Icon className="w-6 h-6" />
                <p>{labels[index]}</p>
              </NavLink>
            );
          })}
        </ul>

        {/* User Info & Logout */}
        <div className="border-t border-gray-700 pt-6">
          <div className="flex items-center gap-4 mb-6">
            <User className="w-8 h-8 text-gray-500" />
            <div>
              <p className="font-semibold text-white text-lg">{user.name}</p>
              <p className="text-sm text-gray-400">{user.email}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-4 w-full bg-red-600 text-white p-4 rounded-lg hover:bg-red-700 transition-all duration-200 text-lg font-semibold shadow-md"
          >
            <LogOut className="w-6 h-6" />
            <span>Log Out</span>
          </button>
        </div>
      </div>

      {/* Sidebar Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-4 left-4 bg-white text-black p-2 rounded-full shadow-lg hover:bg-gray-200 focus:outline-none z-50 transition-all"
      >
        <Menu size={28} />
      </button>
    </div>
  );
};

export default Sidebar;
