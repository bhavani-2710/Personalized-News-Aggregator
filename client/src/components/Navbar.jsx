import React from "react";
import {
  Disclosure,
  DisclosureButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Navbar = () => {
  return (
    <Disclosure as="nav" className="bg-gray-900 shadow-lg text-white">
      {({ open }) => (
        <>
          <div className="mx-auto px-6 sm:px-10 lg:px-16">
            <div className="relative flex h-16 items-center justify-between">
              {/* Mobile menu button */}
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <DisclosureButton className="inline-flex items-center justify-center rounded-md p-2 text-gray-300 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-400">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </DisclosureButton>
              </div>

              {/* Logo Section */}
              <div className="flex flex-1 items-center justify-start">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/1146/1146884.png"
                  alt="News Logo"
                  className="h-12 w-12 mr-3"
                />
                <h1 className="text-2xl font-extrabold text-white tracking-wide">WorldNews 24/7</h1>
              </div>

              {/* Search Bar */}
              <div className="hidden sm:flex sm:flex-1 sm:justify-center">
                <form className="relative w-full max-w-2xl">
                  <input
                    type="text"
                    className="w-full rounded-full border-gray-700 bg-gray-800 text-gray-300 placeholder-gray-400 py-3 pl-12 pr-24 focus:border-blue-400 focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all duration-200"
                    placeholder="Search the latest news..."
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-500 text-white rounded-full px-5 py-2 hover:bg-blue-600 transition-colors duration-200"
                  >
                    Search
                  </button>
                </form>
              </div>

              {/* Right side items */}
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:pr-0">
                {/* Language Dropdown */}
                <Menu as="div" className="relative hidden sm:flex sm:ml-6">
                  <MenuButton className="flex items-center rounded-full bg-gray-800 px-4 py-2 text-gray-300 hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors duration-200">
                    <span>Language</span>
                  </MenuButton>
                  <MenuItems className="absolute right-0 mt-2 w-48 origin-top-right rounded-lg bg-gray-800 shadow-lg ring-1 ring-gray-700 focus:outline-none">
                    {["English", "Hindi", "Bengali", "Tamil"].map((lang) => (
                      <MenuItem key={lang}>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? "bg-gray-700 text-blue-400" : "text-gray-300",
                              "block px-4 py-2 text-sm transition-colors duration-200"
                            )}
                          >
                            {lang}
                          </a>
                        )}
                      </MenuItem>
                    ))}
                  </MenuItems>
                </Menu>

                {/* Indian Flag */}
                <div className="hidden sm:flex sm:items-center sm:ml-6">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/2560px-Flag_of_India.svg.png"
                    alt="India Flag"
                    className="h-7 w-11 rounded-sm"
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </Disclosure>
  );
};

export default Navbar;