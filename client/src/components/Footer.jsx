import React from 'react';
import { Facebook, Instagram, Twitter, Github, Youtube } from 'lucide-react';

const Footer = () => {
  const solutions = [
    { name: 'Marketing', href: '#' },
    { name: 'Analytics', href: '#' },
    { name: 'Automation', href: '#' },
    { name: 'Commerce', href: '#' },
    { name: 'Insights', href: '#' }
  ];

  const support = [
    { name: 'Submit ticket', href: '#' },
    { name: 'Documentation', href: '#' },
    { name: 'Guides', href: '#' }
  ];

  const company = [
    { name: 'About', href: '#' },
    { name: 'Blog', href: '#' },
    { name: 'Jobs', href: '#' },
    { name: 'Press', href: '#' }
  ];

  const legal = [
    { name: 'Terms of service', href: '#' },
    { name: 'Privacy policy', href: '#' },
    { name: 'License', href: '#' }
  ];

  const socialLinks = [
    { Icon: Facebook, href: '#' },
    { Icon: Instagram, href: '#' },
    { Icon: Twitter, href: '#' },
    { Icon: Github, href: '#' },
    { Icon: Youtube, href: '#' }
  ];

  return (
    <footer className="bg-[#0B0F19] text-gray-300 py-12 px-6 justify-end mt-123">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Logo and tagline section */}
          <div className="col-span-1">
            <div className="mb-4">
              <svg viewBox="0 0 24 24" className="h-6 w-6 text-blue-500 fill-current">
                <path d="M12 4.5c-4.5 0-8.5 3-9.5 7.5 1-4.5 5-7.5 9.5-7.5s8.5 3 9.5 7.5c-1-4.5-5-7.5-9.5-7.5z" />
              </svg>
            </div>
            <p className="text-sm">
              Making the world a better place through constructing elegant hierarchies.
            </p>
            <div className="flex space-x-4 mt-4">
              {socialLinks.map(({ Icon, href }, index) => (
                <a
                  key={index}
                  href={href}
                  className="text-gray-400 hover:text-gray-300 transition-colors"
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Solutions section */}
          <div className='h-full'>
            <h3 className="font-semibold mb-4 text-white">Solutions</h3>
            <ul className="space-y-2">
              {solutions.map((item) => (
                <li key={item.name}>
                  <a href={item.href} className="text-sm hover:text-white transition-colors">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support section */}
          <div>
            <h3 className="font-semibold mb-4 text-white">Support</h3>
            <ul className="space-y-2">
              {support.map((item) => (
                <li key={item.name}>
                  <a href={item.href} className="text-sm hover:text-white transition-colors">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company section */}
          <div>
            <h3 className="font-semibold mb-4 text-white">Company</h3>
            <ul className="space-y-2">
              {company.map((item) => (
                <li key={item.name}>
                  <a href={item.href} className="text-sm hover:text-white transition-colors">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal section */}
          <div>
            <h3 className="font-semibold mb-4 text-white">Legal</h3>
            <ul className="space-y-2">
              {legal.map((item) => (
                <li key={item.name}>
                  <a href={item.href} className="text-sm hover:text-white transition-colors">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright notice */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <p className="text-sm text-gray-400">
            © 2024 Your Company, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;