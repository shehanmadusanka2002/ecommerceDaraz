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
      <h2 className="text-2xl font-semibold mb-6">Admin Product Table</h2>
      <div className="overflow-x-auto rounded-lg shadow-lg border border-gray-200">
        <table className="min-w-full bg-white rounded-lg overflow-hidden">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="py-3 px-6 text-left text-gray-600 font-medium uppercase tracking-wider">Image</th>
              <th className="py-3 px-6 text-left text-gray-600 font-medium uppercase tracking-wider">Name</th>
              <th className="py-3 px-6 text-left text-gray-600 font-medium uppercase tracking-wider">Price</th>
              <th className="py-3 px-6 text-left text-gray-600 font-medium uppercase tracking-wider">Description</th>
              <th className="py-3 px-6 text-left text-gray-600 font-medium uppercase tracking-wider">Category</th>
              <th className="py-3 px-6 text-left text-gray-600 font-medium uppercase tracking-wider">Rating</th>
              <th className="py-3 px-6 text-left text-gray-600 font-medium uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr
                key={product._id}
                className={`transition-colors duration-300 ${
                  index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                } hover:bg-blue-100`}
              >
                <td className="py-4 px-6 text-gray-700">
                  <img
                    src={`http://localhost:5000/uploads/${product.image}`}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>

                {editingId === product._id ? (
                  <>
                    <td className="py-4 px-6">
                      <input
                        name="name"
                        value={editForm.name}
                        onChange={handleEditChange}
                        className="border border-gray-300 rounded px-2 py-1 w-full"
                      />
                    </td>
                    <td className="py-4 px-6">
                      <input
                        name="price"
                        value={editForm.price}
                        onChange={handleEditChange}
                        className="border border-gray-300 rounded px-2 py-1 w-full"
                      />
                    </td>
                    <td className="py-4 px-6">
                      <input
                        name="description"
                        value={editForm.description}
                        onChange={handleEditChange}
                        className="border border-gray-300 rounded px-2 py-1 w-full"
                      />
                    </td>
                    <td className="py-4 px-6">
                      <input
                        name="category"
                        value={editForm.category}
                        onChange={handleEditChange}
                        className="border border-gray-300 rounded px-2 py-1 w-full"
                      />
                    </td>
                    <td className="py-4 px-6">
                      <input
                        name="rating"
                        value={editForm.rating}
                        onChange={handleEditChange}
                        className="border border-gray-300 rounded px-2 py-1 w-full"
                      />
                    </td>
                    <td className="py-4 px-6">
                      <button
                        onClick={() => handleUpdate(product._id)}
                        className="bg-blue-600 text-white px-3 py-1 rounded-md shadow hover:bg-blue-700 mr-2 transition-colors duration-200"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="bg-gray-400 text-white px-3 py-1 rounded-md shadow hover:bg-gray-500 transition-colors duration-200"
                      >
                        Cancel
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="py-4 px-6 text-gray-700">{product.name}</td>
                    <td className="py-4 px-6 text-gray-700">RS:{product.price}</td>
                    <td className="py-4 px-6 text-gray-700">{product.description}</td>
                    <td className="py-4 px-6 text-gray-700">{product.category}</td>
                    <td className="py-4 px-6 text-gray-700">{product.rating}</td>
                    <td className="py-4 px-6">
                      <button
                        onClick={() => handleEditClick(product)}
                        className="bg-yellow-500 text-white px-3 py-1 rounded-md shadow hover:bg-yellow-600 mr-2 transition-colors duration-200"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="bg-red-600 text-white px-3 py-1 rounded-md shadow hover:bg-red-700 transition-colors duration-200"
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
