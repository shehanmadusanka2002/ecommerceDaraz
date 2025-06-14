import React, { useState, useRef } from "react";
import axios from "axios";
import { UploadCloud, X, CheckCircle, AlertCircle } from "lucide-react";

const HeroImageUploadForm = () => {
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [notification, setNotification] = useState(null);
  const fileInputRef = useRef(null);

  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleFileChange = (e) => {
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
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        showNotification("Please drop a valid image file.", "error");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        showNotification("File size should be less than 5MB.", "error");
        return;
      }
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
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

    setUploading(true);
    const data = new FormData();
    data.append("heroImage", image);

    try {
      await axios.post("http://localhost:5000/api/hero-images", data);
      showNotification("Hero image uploaded successfully!");
      setImage(null);
      setPreviewUrl(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = null;
      }
    } catch (error) {
      showNotification("Error uploading image: " + error.message, "error");
    } finally {
      setUploading(false);
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
      <h2 className="text-xl font-bold mb-4 text-center">Upload Hero Image</h2>

      <form
        onSubmit={handleSubmit}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="border-2 border-dashed border-gray-300 rounded p-6 flex flex-col items-center justify-center cursor-pointer"
        onClick={() => fileInputRef.current && fileInputRef.current.click()}
      >
        {!previewUrl ? (
          <>
            <UploadCloud size={48} className="text-gray-400 mb-4" />
            <p className="text-gray-500 mb-2">
              Drag & drop an image here, or click to select
            </p>
            <p className="text-gray-400 text-sm">Max size: 5MB</p>
          </>
        ) : (
          <div className="relative w-full">
            <img
              src={previewUrl}
              alt="Preview"
              className="w-full h-64 object-contain rounded"
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
          onChange={handleFileChange}
          ref={fileInputRef}
          className="hidden"
          disabled={uploading}
        />
      </form>

      <button
        type="submit"
        onClick={handleSubmit}
        disabled={uploading}
        className={`mt-6 w-full py-2 rounded text-white transition-colors duration-200 ${
          uploading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {uploading ? "Uploading..." : "Upload Image"}
      </button>
    </div>
  );
};

export default HeroImageUploadForm;
