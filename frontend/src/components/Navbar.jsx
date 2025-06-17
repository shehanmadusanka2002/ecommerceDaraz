import React from "react";
import { Search, ShoppingCart } from "lucide-react";
import darazLogo from '../assets/daraz-logo.png';

export default function NavBar({ search, setSearch, filterCategory, setFilterCategory, categories }) {
  return (
    <div className="w-full sticky top-0 z-50">
      {/* Top Info Bar */}
      <div className="bg-orange-500 text-white text-xs font-semibold">
        <div className="container mx-auto px-4 py-1 flex flex-wrap justify-end gap-5">
          <a href="#" className="hover:text-black">SAVE MORE ON APP</a>
          <a href="#" className="hover:text-black">BECOME A SELLER</a>
          <a href="#" className="hover:text-black">HELP & SUPPORT</a>
          <a href="/login" className="hover:text-black">LOGIN</a>
          <a href="/register" className="hover:text-black">SIGN UP</a>
          <a href="#" className="hover:text-black">හෙළෝ තොරතුරු</a>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="bg-orange-500 shadow-md">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center space-x-3 cursor-pointer mb-3 md:mb-0">
            <img
              src={darazLogo}
              alt="Daraz Logo"
              className="w-40 object-contain"
              title="Daraz Home"
            />
          </div>

          {/* Search Bar */}
          <div className="w-full max-w-lg relative mb-3 md:mb-0">
            <input
              type="text"
              placeholder="Search in Daraz"
              className="w-full px-4 py-2 focus:outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="absolute top-0 right-0 bg-orange-600 h-full px-4 hover:bg-orange-700 flex items-center justify-center">
              <Search className="text-white" size={20} />
            </button>
          </div>

          {/* Cart Icon */}
          <div className="flex items-center">
            <button className="text-white hover:text-gray-100 relative">
              <ShoppingCart size={24} />
              {/* Optional cart item count badge */}
              {/* <span className="absolute -top-1 -right-2 bg-red-600 text-white text-xs rounded-full px-1">2</span> */}
            </button>
          </div>
        </div>
      </div>

      {/* Category Bar */}
      <div className="bg-white shadow border-t border-gray-200">
        <div className="container mx-auto px-4 py-2">
          <div className="flex overflow-x-auto space-x-3 scrollbar-hide">
            {categories?.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-3 py-1 rounded-md text-sm whitespace-nowrap transition-colors ${
                  filterCategory === cat
                    ? "bg-orange-500 text-white font-medium"
                    : "text-gray-700 hover:bg-orange-100 hover:text-orange-600"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
