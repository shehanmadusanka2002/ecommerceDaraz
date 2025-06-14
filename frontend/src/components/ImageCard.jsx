import React from "react";

const ImageCard = ({ product }) => {
  return (
    <div
      key={product._id}
      className="relative bg-white h-auto rounded-xl border hover:shadow-xl transition-all duration-300 overflow-hidden group flex flex-col"
    >
    
      {/* Favorite Icon */}
      <button className="absolute top-2 right-2 text-gray-400 hover:text-red-500 z-10">
        ❤️
      </button>

      {/* Product Image */}
      <div className="w-full h-40 flex items-center justify-center bg-gray-50 p-2">
        <img
          src={`http://localhost:5000/uploads/${product.image}`}
          alt={product.name}
          className="max-h-full object-contain"
        />
      </div>

      {/* Product Info */}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-sm font-semibold text-gray-800 line-clamp-2">{product.name}</h3>
        <p className="text-green-600 font-bold text-xs mb-1">{product.brand || "ORAIMO"}</p>

        {/* Rating */}
        <div className="text-yellow-500 text-sm mb-1">⭐ {product.rating || "4.5"}</div>

        {/* Price */}
        <div className="flex items-center gap-2 mb-2">
          <span className="text-blue-700 font-bold text-lg">
            RS:{(product.price * 0.8).toFixed(2)}
          </span>
          <span className="line-through text-gray-400 text-sm">
            Rs:{product.price.toFixed(2)}
          </span>
        </div>

        {/* Hover Buttons */}
        <div className="mt-2 flex justify-center gap-2 opacity-0 group-hover:opacity-100 transition">
          <button className="bg-white border text-xs px-3 py-1 rounded-full shadow hover:bg-blue-50">
            Quick View
          </button>
          <button className="bg-white border text-xs px-3 py-1 rounded-full shadow hover:bg-green-50">
            Quick Order
          </button>
        </div>

        {/* Add to Cart Button */}
        <div className="flex justify-end mt-auto">
          <button className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full shadow">
            🛒
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageCard;
