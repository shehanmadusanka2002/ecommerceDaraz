import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminProductTable = () => {
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
    rating: ''
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await axios.get("http://localhost:5000/api/products");
    setProducts(res.data);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure to delete this product?")) {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      fetchProducts();
    }
  };

  const handleEditClick = (product) => {
    setEditingId(product._id);
    setEditForm({
      name: product.name,
      price: product.price,
      description: product.description,
      category: product.category,
      rating: product.rating
    });
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (id) => {
  try {
    const updatedForm = {
      ...editForm,
      price: parseFloat(editForm.price),
      rating: parseFloat(editForm.rating),
    };
    await axios.put(`http://localhost:5000/api/products/${id}`, updatedForm);
    setEditingId(null);
    fetchProducts();
  } catch (err) {
    console.error("Update failed:", err.response?.data || err.message);
    alert("Update failed!");
  }
};

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Admin Product Table</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 border">Image</th>
              <th className="py-2 px-4 border">Name</th>
              <th className="py-2 px-4 border">Price</th>
              <th className="py-2 px-4 border">Description</th>
              <th className="py-2 px-4 border">Category</th>
              <th className="py-2 px-4 border">Rating</th>
              <th className="py-2 px-4 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td className="py-2 px-4 border">
                  <img
                    src={`http://localhost:5000/uploads/${product.image}`}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>

                {editingId === product._id ? (
                  <>
                    <td className="py-2 px-4 border">
                      <input name="name" value={editForm.name} onChange={handleEditChange} className="border p-1" />
                    </td>
                    <td className="py-2 px-4 border">
                      <input name="price" value={editForm.price} onChange={handleEditChange} className="border p-1" />
                    </td>
                    <td className="py-2 px-4 border">
                      <input name="description" value={editForm.description} onChange={handleEditChange} className="border p-1" />
                    </td>
                    <td className="py-2 px-4 border">
                      <input name="category" value={editForm.category} onChange={handleEditChange} className="border p-1" />
                    </td>
                    <td className="py-2 px-4 border">
                      <input name="rating" value={editForm.rating} onChange={handleEditChange} className="border p-1" />
                    </td>
                    <td className="py-2 px-4 border">
                      <button
                        onClick={() => handleUpdate(product._id)}
                        className="bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700 mr-2"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="bg-gray-400 text-white px-2 py-1 rounded hover:bg-gray-500"
                      >
                        Cancel
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="py-2 px-4 border">{product.name}</td>
                    <td className="py-2 px-4 border">RS:{product.price}</td>
                    <td className="py-2 px-4 border">{product.description}</td>
                    <td className="py-2 px-4 border">{product.category}</td>
                    <td className="py-2 px-4 border">{product.rating}</td>
                    <td className="py-2 px-4 border">
                      <button
                        onClick={() => handleEditClick(product)}
                        className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminProductTable;
