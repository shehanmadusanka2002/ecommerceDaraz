import React, { useEffect, useState } from 'react';
import axios from 'axios';

const HeroImageTable = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/hero-images');
      setImages(res.data);
    } catch (err) {
      console.error('Failed to load images', err);
    }
  };

  const deleteImage = async (id) => {
    if (!window.confirm('Are you sure you want to delete this image?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/hero-images/${id}`);
      setImages(images.filter((img) => img._id !== id));
    } catch (err) {
      alert('Error deleting image: ' + err.message);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">Hero Image Table</h2>
      <table className="min-w-full border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-4 border">Preview</th>
            <th className="py-2 px-4 border">Uploaded Date</th>
            <th className="py-2 px-4 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {images.map((image) => (
            <tr key={image._id} className="text-center">
              <td className="py-2 px-4 border">
                <img
                  src={`http://localhost:5000/uploads/${image.filename}`}
                  alt="Hero"
                  className="h-20 mx-auto rounded"
                />
              </td>
              <td className="py-2 px-4 border">
                {new Date(image.uploadedAt).toLocaleString()}
              </td>
              <td className="py-2 px-4 border">
                <button
                  onClick={() => deleteImage(image._id)}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {images.length === 0 && (
            <tr>
              <td colSpan="3" className="text-center py-4 text-gray-500">
                No images uploaded yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default HeroImageTable;
