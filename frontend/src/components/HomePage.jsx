import React, { useEffect, useState } from "react";
import axios from "axios";
import ImageCard from "./ImageCard";
import HeroImage from "./HeroImage";
import Navbar from "./Navbar";
import Footer from "./Footer";
import '../App.css';


const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  const categories = ["All", ...new Set(products.map((p) => p.category || "Uncategorized"))];

  const filteredProducts = products.filter((p) => {
    const matchesCategory = filterCategory === "All" || p.category === filterCategory;
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const groupByCategory = (products) => {
    const grouped = {};
    products.forEach((product) => {
      const category = product.category || "Uncategorized";
      if (!grouped[category]) grouped[category] = [];
      grouped[category].push(product);
    });
    return grouped;
  };

  const groupedProducts = groupByCategory(filteredProducts);

  return (
    <div className="min-h-screen flex flex-col font-sans bg-gray-50">
      {/* Navbar */}
      <Navbar
        search={search}
        setSearch={setSearch}
        filterCategory={filterCategory}
        setFilterCategory={setFilterCategory}
        categories={categories}
      />

      {/* Hero Section */}
      <div className="py-4 px-6 text-center">
        <HeroImage />
      </div>

      {/* Products */}
      <div className="flex flex-col w-full px-6 py-4 space-y-10">
      {Object.keys(groupedProducts).length === 0 ? (
      <p className="text-center text-gray-600">No products found.</p>
      ) : (
      Object.keys(groupedProducts).map((category, index) => (
      <div
        key={category}
        className="category-section bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200"
      >
        {/* Category Title */}
        <div className="p-6 border-b flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-gray-800">{category}</h2>

          {/* Arrow Buttons */}
          <div className="space-x-2">
            <button
              onClick={() =>
                document
                  .getElementById(`scroll-row-${index}`)
                  .scrollBy({ left: -300, behavior: "smooth" })
              }
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full"
            >
              ◀
            </button>
            <button
              onClick={() =>
                document
                  .getElementById(`scroll-row-${index}`)
                  .scrollBy({ left: 300, behavior: "smooth" })
              }
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full"
            >
              ▶
            </button>
          </div>
        </div>

        {/* Scrollable Product Row */}
        <div
          id={`scroll-row-${index}`}
          className="p-6 flex gap-4 overflow-x-auto scrollbar-hide"
        >
          {groupedProducts[category].map((p) => (
            <div key={p._id || p.id} className="flex-shrink-0">
              <ImageCard product={p} />
            </div>
          ))}
        </div>
      </div>
    ))
  )}
</div>

      {/* Categories Section */}
      <div className="px-6 py-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Categories</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {categories
            .filter((cat) => cat !== "All")
            .map((category) => {
              const product = products.find((p) => p.category === category);
              return (
                <div
                  key={category}
                  className="flex flex-col items-center bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition"
                >
                  {/* Category Image */}
                  <div className="w-24 h-24 flex items-center justify-center bg-gray-50 rounded-full overflow-hidden mb-2">
                    {product ? (
                      <img
                        src={`http://localhost:5000/uploads/${product.image}`}
                        alt={category}
                        className="object-cover h-full w-full"
                      />
                    ) : (
                      <span className="text-sm text-gray-400">No Image</span>
                    )}
                  </div>

                  {/* Category Name */}
                  <span className="text-gray-700 text-sm font-semibold text-center">
                    {category}
                  </span>
                </div>
              );
            })}
        </div>
      </div>



      {/* Footer */}
      <footer className="bg-gray-100 text-center text-sm text-gray-500 py-4 mt-auto">
        <Footer />
      </footer>
    </div>
  );
};

export default HomePage;
