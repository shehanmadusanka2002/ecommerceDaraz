import React, { useState } from "react";
import axios from "axios";

const ProductForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    category: "Electronics",
    rating: "",
  });
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => data.append(key, value));
    data.append("image", image);

    try {
      await axios.post("http://localhost:5000/api/products", data);
      alert("Product added!");
    } catch (err) {
      alert("Failed to add product: ", err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-96 mx-auto mt-10">
      <h2 className="text-xl font-bold mb-4 text-center">Add Product</h2>
      <input type="text" name="name" placeholder="Product Name" onChange={handleChange} className="w-full p-2 border mb-2" required />
      <input type="number" name="price" placeholder="Price" onChange={handleChange} className="w-full p-2 border mb-2" required />
      <textarea name="description" placeholder="Description" onChange={handleChange} className="w-full p-2 border mb-2" />
      <select name="category" onChange={handleChange} className="w-full p-2 border mb-2">
        <option>Electronics</option>
        <option>Fashion</option>
        <option>Accessories</option>
        <option>Home</option>
      </select>
      <input type="number" step="0.1" name="rating" placeholder="Rating (0-5)" onChange={handleChange} className="w-full p-2 border mb-2" />
      <input type="file" onChange={(e) => setImage(e.target.files[0])} className="w-full p-2 border mb-2" required />
      <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">Add Product</button>
    </form>
  );
};

export default ProductForm;
