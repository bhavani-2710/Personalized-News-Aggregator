import React from "react";
import { Facebook, Instagram, Twitter, Github, Youtube } from "lucide-react";

const Footer = () => {
  const solutions = [
    { name: "Marketing", href: "#" },
    { name: "Analytics", href: "#" },
    { name: "Automation", href: "#" },
    { name: "Commerce", href: "#" },
    { name: "Insights", href: "#" },
  ];

  const support = [
    { name: "Submit ticket", href: "#" },
    { name: "Documentation", href: "#" },
    { name: "Guides", href: "#" },
  ];

  const company = [
    { name: "About", href: "#" },
    { name: "Blog", href: "#" },
    { name: "Jobs", href: "#" },
    { name: "Press", href: "#" },
  ];

  const legal = [
    { name: "Terms of service", href: "#" },
    { name: "Privacy policy", href: "#" },
    { name: "License", href: "#" },
  ];

  const socialLinks = [
    { Icon: Facebook, href: "#" },
    { Icon: Instagram, href: "#" },
    { Icon: Twitter, href: "#" },
    { Icon: Github, href: "#" },
    { Icon: Youtube, href: "#" },
  ];

  return (
    <footer className="bg-gray-100 text-gray-700 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
          {/* Logo and tagline section */}
          <div className="col-span-1">
            <div className="mb-6">
              <svg viewBox="0 0 24 24" className="h-8 w-8 text-blue-500 fill-current">
                <path d="M12 4.5c-4.5 0-8.5 3-9.5 7.5 1-4.5 5-7.5 9.5-7.5s8.5 3 9.5 7.5c-1-4.5-5-7.5-9.5-7.5z" />
              </svg>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              Making the world a better place through constructing elegant hierarchies.
            </p>
            <div className="flex space-x-6 mt-6">
              {socialLinks.map(({ Icon, href }, index) => (
                <a
                  key={index}
                  href={href}
                  className="text-gray-500 hover:text-blue-500 transition-colors duration-200"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon size={24} />
                </a>
              ))}
            </div>
          </div>

          {/* Solutions section */}
          <div>
            <h3 className="font-semibold text-lg mb-5 text-gray-800">Solutions</h3>
            <ul className="space-y-3">
              {solutions.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-sm text-gray-600 hover:text-blue-500 transition-colors duration-200"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support section */}
          <div>
            <h3 className="font-semibold text-lg mb-5 text-gray-800">Support</h3>
            <ul className="space-y-3">
              {support.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-sm text-gray-600 hover:text-blue-500 transition-colors duration-200"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company section */}
          <div>
            <h3 className="font-semibold text-lg mb-5 text-gray-800">Company</h3>
            <ul className="space-y-3">
              {company.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-sm text-gray-600 hover:text-blue-500 transition-colors duration-200"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal section */}
          <div>
            <h3 className="font-semibold text-lg mb-5 text-gray-800">Legal</h3>
            <ul className="space-y-3">
              {legal.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-sm text-gray-600 hover:text-blue-500 transition-colors duration-200"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright notice */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Your Company, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;