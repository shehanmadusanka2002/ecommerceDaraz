import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-10">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

        {/* Logo / About */}
        <div>
          <h1 className="text-white text-2xl font-bold mb-4">Daraz.lk</h1>
          <p className="text-sm">
            Your one-stop shop for electronics, fashion, home essentials & more. Trusted by millions across the region.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h2 className="text-white text-lg font-semibold mb-4">Explore</h2>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white">Home</a></li>
            <li><a href="#" className="hover:text-white">Shop</a></li>
            <li><a href="#" className="hover:text-white">Categories</a></li>
            <li><a href="#" className="hover:text-white">Deals</a></li>
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h2 className="text-white text-lg font-semibold mb-4">Customer Care</h2>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white">Help Center</a></li>
            <li><a href="#" className="hover:text-white">Returns</a></li>
            <li><a href="#" className="hover:text-white">Track Order</a></li>
            <li><a href="#" className="hover:text-white">Shipping Info</a></li>
          </ul>
        </div>

        {/* Follow Us */}
        <div>
          <h2 className="text-white text-lg font-semibold mb-4">Follow Us</h2>
          <div className="flex space-x-4 text-xl">
            <a href="#" className="hover:text-white"><FaFacebookF /></a>
            <a href="#" className="hover:text-white"><FaTwitter /></a>
            <a href="#" className="hover:text-white"><FaInstagram /></a>
            <a href="#" className="hover:text-white"><FaLinkedinIn /></a>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="border-t border-gray-700 text-center text-sm py-4">
        © {new Date().getFullYear()} Daraz.lk — All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
