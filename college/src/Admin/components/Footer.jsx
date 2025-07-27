import React from 'react';

const Footer = () => {
  return (
    <footer className="border-t border-black px-4 py-3 bg-white">
      <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-between text-sm text-gray-700">
        <span>&copy; {new Date().getFullYear()} MCAclg. All rights reserved. Admin Panel</span>
        <div className="mt-2 md:mt-0">
          <a href="#" className="hover:underline mx-2">Privacy Policy</a>
          <a href="#" className="hover:underline mx-2">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
