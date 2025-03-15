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
    <Disclosure as="nav" className="bg-yellow-950">
      {({ open }) => (
        <>
          <div className="mx-auto px-2 sm:px-4 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              {/* Mobile menu button */}
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <DisclosureButton className="inline-flex items-center justify-center rounded-md p-2 text-yellow-300 hover:bg-yellow-700 hover:text-white">
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
                    className="h-8 w-auto sm:h-12 rounded-full"
                    src="./src/assets/logo.webp"
                    alt="Logo"
                  />
                </div>

                {/* Search Bar */}
                <div className="hidden sm:ml-6 sm:flex sm:flex-1 sm:justify-center">
                  <form className="relative w-full max-w-3xl mx-auto">
                    <input
                      type="text"
                      className="w-full rounded-full border-yellow-600 bg-yellow-800 text-yellow-300 placeholder-yellow-500 py-2 pl-10 pr-24 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                      placeholder="Search trending news..."
                    />
                    <button
                      type="submit"
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-yellow-600 text-white rounded-full px-3 py-1 hover:bg-yellow-700"
                    >
                      Search
                    </button>
                    <div className="absolute left-3 top-1/2 -translate-y-1/2">
                      <svg
                        className="h-5 w-5 text-yellow-400"
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
                <Menu as="div" className="relative hidden sm:ml-4 sm:flex">
                  <MenuButton className="flex items-center rounded-full bg-yellow-800 p-2 text-yellow-300 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-yellow-900">
                    <span className="text-yellow-300">Language</span>
                  </MenuButton>
                  <MenuItems className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-yellow-700 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    {["Hindi", "Bengali", "Tamil"].map((lang) => (
                      <MenuItem key={lang}>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? "bg-yellow-600" : "",
                              "block px-4 py-2 text-sm text-white"
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
                <div className="hidden sm:flex sm:items-center sm:ml-4">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/2560px-Flag_of_India.svg.png"
                    alt="India Flag"
                    className="h-6 w-10 rounded-sm"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Menu Panel */}
          <DisclosurePanel className="sm:hidden">
            {/* Mobile Search Bar */}
            <div className="px-2 pt-2 pb-3">
              <form className="relative w-full">
                <input
                  type="text"
                  className="w-full rounded-full border-yellow-600 bg-yellow-800 text-yellow-300 placeholder-yellow-500 py-2 pl-10 pr-24 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                  placeholder="Search trending news..."
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-yellow-600 text-white rounded-full px-3 py-1 hover:bg-yellow-700"
                >
                  Search
                </button>
                <div className="absolute left-3 top-1/2 -translate-y-1/2">
                  <svg
                    className="h-5 w-5 text-yellow-400"
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
            <div className="border-t border-yellow-700 pb-3 pt-4">
              <div className="px-2">
                <p className="text-yellow-400 text-sm font-medium">
                  Select Language
                </p>
                {["Hindi", "Bengali", "Tamil"].map((lang) => (
                  <a
                    key={lang}
                    href="#"
                    className="block rounded-md px-3 py-2 text-base font-medium text-yellow-300 hover:bg-yellow-700 hover:text-white"
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
