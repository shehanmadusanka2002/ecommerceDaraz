import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-gray-300 mt-10 shadow-inner">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">

        {/* Logo / About */}
        <div>
          <h1 className="text-white text-3xl font-extrabold mb-6 tracking-wide">Daraz.lk</h1>
          <p className="text-sm leading-relaxed max-w-xs">
            Your one-stop shop for electronics, fashion, home essentials & more. Trusted by millions across the region.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h2 className="text-white text-xl font-semibold mb-6 border-b border-gray-700 pb-2">Explore</h2>
          <ul className="space-y-3 text-sm">
            <li><a href="#" className="hover:text-white transition-colors duration-300">Home</a></li>
            <li><a href="#" className="hover:text-white transition-colors duration-300">Shop</a></li>
            <li><a href="#" className="hover:text-white transition-colors duration-300">Categories</a></li>
            <li><a href="#" className="hover:text-white transition-colors duration-300">Deals</a></li>
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h2 className="text-white text-xl font-semibold mb-6 border-b border-gray-700 pb-2">Customer Care</h2>
          <ul className="space-y-3 text-sm">
            <li><a href="#" className="hover:text-white transition-colors duration-300">Help Center</a></li>
            <li><a href="#" className="hover:text-white transition-colors duration-300">Returns</a></li>
            <li><a href="#" className="hover:text-white transition-colors duration-300">Track Order</a></li>
            <li><a href="#" className="hover:text-white transition-colors duration-300">Shipping Info</a></li>
          </ul>
        </div>

        {/* Follow Us */}
        <div>
          <h2 className="text-white text-xl font-semibold mb-6 border-b border-gray-700 pb-2">Follow Us</h2>
          <div className="flex space-x-6 text-2xl">
            <a href="#" className="hover:text-white transition-colors duration-300"><FaFacebookF /></a>
            <a href="#" className="hover:text-white transition-colors duration-300"><FaTwitter /></a>
            <a href="#" className="hover:text-white transition-colors duration-300"><FaInstagram /></a>
            <a href="#" className="hover:text-white transition-colors duration-300"><FaLinkedinIn /></a>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="border-t border-gray-700 text-center text-sm py-6 text-gray-400 select-none">
        © {new Date().getFullYear()} Daraz.lk — All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
