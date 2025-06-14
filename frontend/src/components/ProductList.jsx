import React, { useEffect, useState } from "react";
import axios from "axios";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/products")
      .then(res => setProducts(res.data));
  }, []);

  return (
    <div className="p-2">
      <h2 className="text-2xl font-bold mb-4">All Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map(p => (
          <div key={p._id} className="bg-white shadow rounded p-4">
            <img src={`http://localhost:5000/uploads/${p.image}`} alt={p.name} className="w-full h-40 object-cover mb-2" />
            <h3 className="text-lg font-bold">{p.name}</h3>
            <p className="text-gray-600">{p.price}</p>
            <p className="text-sm">{p.description}</p>
            <p className="text-sm">⭐ {p.rating}</p>
            <p className="text-sm italic">{p.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
