import React, { useState, useRef } from "react";
import axios from "axios";
import { CheckCircle, AlertCircle, X, UploadCloud } from "lucide-react";

const ProductForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    category: "Electronics",
    rating: "",
  });
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [notification, setNotification] = useState(null);
  const fileInputRef = useRef(null);

  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleRemoveImage = () => {
    setImage(null);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) {
      showNotification("Please choose an image to upload.", "error");
      return;
    }
    if (!formData.name || !formData.price) {
      showNotification("Please fill in all required fields.", "error");
      return;
    }

    setSubmitting(true);
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => data.append(key, value));
    data.append("image", image);

    try {
      await axios.post("http://localhost:5000/api/products", data);
      showNotification("Product added successfully!");
      setFormData({
        name: "",
        price: "",
        description: "",
        category: "Electronics",
        rating: "",
      });
      handleRemoveImage();
    } catch (err) {
      showNotification("Failed to add product: " + err.message, "error");
    } finally {
      setSubmitting(false);
    }
  };

  const NotificationToast = () => {
    if (!notification) return null;

    return (
      <div
        className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg flex items-center space-x-2 transition-all duration-300 ${
          notification.type === "success"
            ? "bg-green-500 text-white"
            : "bg-red-500 text-white"
        }`}
      >
        {notification.type === "success" ? (
          <CheckCircle size={20} />
        ) : (
          <AlertCircle size={20} />
        )}
        <span>{notification.message}</span>
      </div>
    );
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow-md">
      <NotificationToast />
      <h2 className="text-xl font-bold mb-4 text-center">Add Product</h2>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
          disabled={submitting}
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
          disabled={submitting}
          min="0"
          step="0.01"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          disabled={submitting}
        />
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          disabled={submitting}
        >
          <option>Electronics</option>
          <option>Fashion</option>
          <option>Accessories</option>
          <option>Home</option>
        </select>
        <input
          type="number"
          step="0.1"
          name="rating"
          placeholder="Rating (0-5)"
          value={formData.rating}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          disabled={submitting}
          min="0"
          max="5"
        />
        <div
          className="border-2 border-dashed border-gray-300 rounded p-4 flex flex-col items-center justify-center cursor-pointer"
          onClick={() => fileInputRef.current && fileInputRef.current.click()}
        >
          {!previewUrl ? (
            <>
              <UploadCloud size={48} className="text-gray-400 mb-4" />
              <p className="text-gray-500 mb-2">
                Click or drag and drop an image here (max 5MB)
              </p>
            </>
          ) : (
            <div className="relative w-full">
              <img
                src={previewUrl}
                alt="Preview"
                className="w-full h-48 object-contain rounded"
              />
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveImage();
                }}
                className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1 hover:bg-red-700 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                if (!file.type.startsWith("image/")) {
                  showNotification("Please select a valid image file.", "error");
                  return;
                }
                if (file.size > 5 * 1024 * 1024) {
                  showNotification("File size should be less than 5MB.", "error");
                  return;
                }
                setImage(file);
                setPreviewUrl(URL.createObjectURL(file));
              }
            }}
            ref={fileInputRef}
            className="hidden"
            disabled={submitting}
          />
        </div>
        <button
          type="submit"
          disabled={submitting}
          className={`w-full py-2 rounded text-white transition-colors duration-200 ${
            submitting ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {submitting ? "Adding..." : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
