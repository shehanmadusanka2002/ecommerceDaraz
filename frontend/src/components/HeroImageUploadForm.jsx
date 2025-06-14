import React, { useState } from "react";
import axios from "axios";

const HeroImageUploadForm = () => {
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) return alert("Please choose an image.");

    const data = new FormData();
    data.append("heroImage", image);

    try {
      await axios.post("http://localhost:5000/api/hero-images", data);
      alert("Hero image uploaded successfully!");
    } catch (error) {
      alert("Error uploading image: " + error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-96 mx-auto mt-10">
      <h2 className="text-xl font-bold mb-4 text-center">Upload Hero Image</h2>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
        className="w-full p-2 border mb-4"
        required
      />
      <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
        Upload Image
      </button>
    </form>
  );
};

export default HeroImageUploadForm;
