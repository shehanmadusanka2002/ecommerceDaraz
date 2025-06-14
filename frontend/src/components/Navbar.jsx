import React from "react";
import { Search, ShoppingCart } from "lucide-react";

export default function Navbar({ search, setSearch, filterCategory, setFilterCategory, categories }) {
  return (
    <div className="flex flex-col w-full sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-orange-500 font-bold text-white text-xs">
        <div className="container gap-3 mx-auto flex flex-wrap justify-end py-1 px-4">
          <a href="#" className="mr-4 hover:text-black">SAVE MORE ON APP</a>
          <a href="#" className="mr-4 hover:text-black">BECOME A SELLER</a>
          <a href="#" className="mr-4 hover:text-black">HELP & SUPPORT</a>
          <a href="/login" className="mr-4 hover:text-black">LOGIN</a>
          <a href="/register" className="mr-4 hover:text-black">SIGN UP</a>
          <a href="#" className="hover:text-black">හෙළෝ තොරතුරු</a>
        </div>
      </div>

      {/* Main nav */}
      <nav className="bg-orange-500 py-3 shadow-md sticky top-0 z-50">
        <div className="container mx-auto flex flex-col md:flex-row items-center px-4">
          <div className="text-white font-bold text-2xl mb-3 md:mb-0 md:mr-6">
            <a href="#" className="flex items-center">
              <span>Daraz</span>
            </a>
          </div>

          <div className="flex-grow flex items-center mb-3 md:mb-0">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search in Daraz"
                className="w-full px-4 py-2 rounded-l-md focus:outline-none"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button className="absolute right-0 top-0 bg-orange-600 h-full px-4 rounded-r-md flex items-center justify-center hover:bg-orange-700">
                <Search className="text-white" size={20} />
              </button>
            </div>
          </div>

          <div className="md:ml-6">
            <button className="text-white">
              <ShoppingCart size={24} />
            </button>
          </div>
        </div>
      </nav>

      {/* Category bar */}
      <div className="bg-white shadow-sm border-t border-gray-200">
        <div className="container mx-auto px-4 py-2">
          <div className="flex overflow-x-auto space-x-4">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`whitespace-nowrap px-3 py-1 rounded-md text-sm transition-colors ${
                  filterCategory === cat 
                    ? "bg-orange-500 text-white font-medium" 
                    : "text-gray-600 hover:bg-orange-50 hover:text-orange-600"
                }`}
                onClick={() => setFilterCategory(cat)}
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
