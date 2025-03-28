import React from "react";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
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
    <Disclosure as="nav" className="bg-white shadow-md">
      {({ open }) => (
        <>
          <div className="mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              {/* Mobile menu button */}
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <DisclosureButton className="inline-flex items-center justify-center rounded-md p-2 text-gray-600 hover:bg-gray-100 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </DisclosureButton>
              </div>

              {/* Logo Section */}
              <div className="flex flex-1 items-center justify-center sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <img
                    className="h-10 w-auto rounded-full"
                    src="./src/assets/logo.webp"
                    alt="Logo"
                  />
                </div>

                {/* Search Bar */}
                <div className="hidden sm:ml-8 sm:flex sm:flex-1 sm:justify-center">
                  <form className="relative w-full max-w-2xl mx-auto">
                    <input
                      type="text"
                      className="w-full rounded-full border-gray-300 bg-gray-50 text-gray-800 placeholder-gray-400 py-2.5 pl-12 pr-24 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-200"
                      placeholder="Search trending news..."
                    />
                    <button
                      type="submit"
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-500 text-white rounded-full px-4 py-1.5 hover:bg-blue-600 transition-colors duration-200"
                    >
                      Search
                    </button>
                    <div className="absolute left-4 top-1/2 -translate-y-1/2">
                      <svg
                        className="h-5 w-5 text-gray-500"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 20"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M8 4a4 4 0 100 8 4 4 0 000-8zm6 14l-4-4"
                        />
                      </svg>
                    </div>
                  </form>
                </div>
              </div>

              {/* Right side items */}
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:pr-0">
                {/* Language Dropdown */}
                <Menu as="div" className="relative hidden sm:ml-6 sm:flex">
                  <MenuButton className="flex items-center rounded-full bg-gray-100 px-4 py-2 text-gray-700 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200">
                    <span>Language</span>
                  </MenuButton>
                  <MenuItems className="absolute right-0 mt-2 w-48 origin-top-right rounded-lg bg-white shadow-lg ring-1 ring-gray-200 focus:outline-none">
                    {["Hindi", "Bengali", "Tamil"].map((lang) => (
                      <MenuItem key={lang}>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? "bg-gray-100 text-blue-500" : "text-gray-700",
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

          {/* Mobile Menu Panel */}
          <DisclosurePanel className="sm:hidden">
            {/* Mobile Search Bar */}
            <div className="px-4 pt-4 pb-3">
              <form className="relative w-full">
                <input
                  type="text"
                  className="w-full rounded-full border-gray-300 bg-gray-50 text-gray-800 placeholder-gray-400 py-2.5 pl-12 pr-24 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-200"
                  placeholder="Search trending news..."
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-500 text-white rounded-full px-4 py-1.5 hover:bg-blue-600 transition-colors duration-200"
                >
                  Search
                </button>
                <div className="absolute left-4 top-1/2 -translate-y-1/2">
                  <svg
                    className="h-5 w-5 text-gray-500"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zm6 14l-4-4"
                    />
                  </svg>
                </div>
              </form>
            </div>

            {/* Mobile Language Options */}
            <div className="border-t border-gray-200 pb-4 pt-4">
              <div className="px-4">
                <p className="text-gray-700 text-sm font-medium mb-2">
                  Select Language
                </p>
                {["Hindi", "Bengali", "Tamil"].map((lang) => (
                  <a
                    key={lang}
                    href="#"
                    className="block rounded-md px-3 py-2 text-base text-gray-700 hover:bg-gray-100 hover:text-blue-500 transition-colors duration-200"
                  >
                    {lang}
                  </a>
                ))}
              </div>
            </div>
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  );
};

export default Navbar;