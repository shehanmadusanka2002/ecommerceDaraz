import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { 
  Trash2, 
  Eye, 
  RefreshCw, 
  Calendar, 
  Image as ImageIcon,
  X,
  AlertCircle,
  CheckCircle,
  Download
} from 'lucide-react';

const HeroImageTable = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);
  const [sortOrder, setSortOrder] = useState('desc');
  const [notification, setNotification] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(null);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:5000/api/hero-images');
      setImages(res.data);
      setError(null);
    } catch (err) {
      console.error('Failed to load images', err);
      setError('Failed to load images. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const deleteImage = async (id) => {
    if (!window.confirm('Are you sure you want to delete this image?')) return;
    
    setDeleteLoading(id);
    try {
      await axios.delete(`http://localhost:5000/api/hero-images/${id}`);
      setImages(images.filter((img) => img._id !== id));
      showNotification('Image deleted successfully!');
    } catch (err) {
      console.error('Error deleting image:', err);
      showNotification('Failed to delete image. Please try again.', 'error');
    } finally {
      setDeleteLoading(null);
    }
  };

  const deleteBatchImages = async () => {
    if (selectedImages.length === 0) return;
    if (!window.confirm(`Are you sure you want to delete ${selectedImages.length} image(s)?`)) return;

    try {
      await Promise.all(
        selectedImages.map(id => axios.delete(`http://localhost:5000/api/hero-images/${id}`))
      );
      setImages(images.filter(img => !selectedImages.includes(img._id)));
      setSelectedImages([]);
      showNotification(`${selectedImages.length} image(s) deleted successfully!`);
    } catch (err) {
      console.error('Error deleting images:', err);
      showNotification('Failed to delete some images. Please try again.', 'error');
    }
  };

  const handleImageError = (e) => {
    e.target.src = 'https://via.placeholder.com/200x150?text=Image+Not+Found';
  };

  const toggleImageSelection = (id) => {
    setSelectedImages(prev => 
      prev.includes(id) 
        ? prev.filter(imgId => imgId !== id)
        : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    setSelectedImages(
      selectedImages.length === images.length ? [] : images.map(img => img._id)
    );
  };

  const sortedImages = [...images].sort((a, b) => {
    const dateA = new Date(a.uploadedAt);
    const dateB = new Date(b.uploadedAt);
    return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
  });

  const LoadingSkeleton = () => (
    <div className="animate-pulse">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4">
          <div className="flex items-center space-x-4">
            <div className="w-32 h-24 bg-gray-200 rounded"></div>
            <div className="flex-1">
              <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
            <div className="w-20 h-8 bg-gray-200 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  );

  const ImagePreviewModal = () => {
    if (!previewImage) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
        <div className="relative max-w-4xl max-h-full">
          <button
            onClick={() => setPreviewImage(null)}
            className="absolute -top-10 right-0 text-white hover:text-gray-300 transition-colors"
          >
            <X size={24} />
          </button>
          <img
            src={previewImage.imageUrl}
            alt="Hero Preview"
            className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4 rounded-b-lg">
            <p className="text-sm">
              Uploaded: {new Date(previewImage.uploadedAt).toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    );
  };

  const NotificationToast = () => {
    if (!notification) return null;

    return (
      <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg flex items-center space-x-2 transition-all duration-300 ${
        notification.type === 'success' 
          ? 'bg-green-500 text-white' 
          : 'bg-red-500 text-white'
      }`}>
        {notification.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
        <span>{notification.message}</span>
      </div>
    );
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      <NotificationToast />
      <ImagePreviewModal />
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Hero Images Gallery</h2>
          <p className="text-gray-600">Manage your hero images collection</p>
        </div>
        
        <div className="flex items-center space-x-3 mt-4 sm:mt-0">
          <button
            onClick={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200"
          >
            <Calendar size={16} />
            <span className="text-sm">Sort {sortOrder === 'desc' ? '↓' : '↑'}</span>
          </button>
          
          <button
            onClick={fetchImages}
            disabled={loading}
            className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors duration-200 disabled:opacity-50"
          >
            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
            <span className="text-sm">Refresh</span>
          </button>
        </div>
      </div>

      {/* Batch Actions */}
      {images.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedImages.length === images.length}
                  onChange={toggleSelectAll}
                  className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
                />
                <span className="text-sm text-gray-700">
                  Select All ({selectedImages.length}/{images.length})
                </span>
              </label>
            </div>
            
            {selectedImages.length > 0 && (
              <button
                onClick={deleteBatchImages}
                className="flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200"
              >
                <Trash2 size={16} />
                <span className="text-sm">Delete Selected ({selectedImages.length})</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 flex items-center space-x-2">
          <AlertCircle size={20} />
          <span>{error}</span>
        </div>
      )}

      {/* Content */}
      {loading ? (
        <LoadingSkeleton />
      ) : images.length === 0 ? (
        <div className="text-center py-12">
          <ImageIcon size={64} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No Images Found</h3>
          <p className="text-gray-500">Upload your first hero image to get started.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedImages.map((image) => (
            <div
              key={image._id}
              className={`bg-white rounded-xl shadow-lg border-2 transition-all duration-300 hover:shadow-xl hover:scale-105 ${
                selectedImages.includes(image._id) 
                  ? 'border-indigo-500 ring-2 ring-indigo-200' 
                  : 'border-gray-200'
              }`}
            >
              {/* Selection Checkbox */}
              <div className="p-4 pb-0">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedImages.includes(image._id)}
                    onChange={() => toggleImageSelection(image._id)}
                    className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
                  />
                  <span className="text-sm text-gray-600">Select</span>
                </label>
              </div>

              {/* Image */}
              <div className="relative p-4 pt-2">
                <div className="relative w-full h-48 rounded-lg overflow-hidden bg-gray-100">
                  <img
                    src={image.imageUrl}
                    alt="Hero"
                    onError={handleImageError}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center opacity-0 hover:opacity-100">
                    <button
                      onClick={() => setPreviewImage(image)}
                      className="bg-white bg-opacity-90 hover:bg-opacity-100 p-2 rounded-full transition-all duration-200"
                    >
                      <Eye size={20} className="text-gray-700" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Info */}
              <div className="p-4 pt-0">
                <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                  <span className="flex items-center space-x-1">
                    <Calendar size={14} />
                    <span>{new Date(image.uploadedAt).toLocaleDateString()}</span>
                  </span>
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                    {new Date(image.uploadedAt).toLocaleTimeString()}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => setPreviewImage(image)}
                    className="flex items-center space-x-2 px-3 py-2 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 rounded-lg transition-colors duration-200"
                  >
                    <Eye size={16} />
                    <span className="text-sm">Preview</span>
                  </button>

                  <button
                    onClick={() => deleteImage(image._id)}
                    disabled={deleteLoading === image._id}
                    className="flex items-center space-x-2 px-3 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg transition-colors duration-200 disabled:opacity-50"
                  >
                    {deleteLoading === image._id ? (
                      <RefreshCw size={16} className="animate-spin" />
                    ) : (
                      <Trash2 size={16} />
                    )}
                    <span className="text-sm">Delete</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Stats */}
      {images.length > 0 && (
        <div className="mt-8 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div>
              <h3 className="text-2xl font-bold text-indigo-600">{images.length}</h3>
              <p className="text-gray-600">Total Images</p>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-purple-600">{selectedImages.length}</h3>
              <p className="text-gray-600">Selected</p>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-green-600">
                {images.filter(img => new Date(img.uploadedAt) > new Date(Date.now() - 7*24*60*60*1000)).length}
              </h3>
              <p className="text-gray-600">This Week</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeroImageTable;
