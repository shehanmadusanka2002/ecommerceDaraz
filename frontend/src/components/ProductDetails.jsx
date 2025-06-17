import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import NavBar from './NavBar';
import Login from './Login';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const [showLogin, setShowLogin] = useState(false);

  // For zoom effect
  const imgRef = useRef(null);
  const zoomRef = useRef(null);
  const [showZoom, setShowZoom] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    fetchProductDetails();
  }, [id]);

  const fetchProductDetails = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:5000/api/products/${id}`);
      
      if (!response.ok) {
        throw new Error('Product not found');
      }
      
      const data = await response.json();
      setProduct(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleQuantityChange = (change) => {
    setQuantity(prev => Math.max(1, prev + change));
  };

  const handleAddToCartClick = () => {
    const token = localStorage.getItem('token');
    if (token) {
      // Navigate to payment page
      navigate(`/payment/${id}`, { 
        state: { 
          product, 
          quantity,
          action: 'add-to-cart'
        } 
      });
    } else {
      setShowLogin(true);
    }
  };

  const handleBuyNowClick = () => {
    const token = localStorage.getItem('token');
    if (token) {
      // Navigate to payment page
      navigate(`/shipping/${id}`, { 
        state: { 
          product, 
          quantity,
          action: 'buy-now'
        } 
      });
    } else {
      setShowLogin(true);
    }
  };

  // Zoom handlers
  const handleMouseEnter = () => {
    setShowZoom(true);
  };

  const handleMouseMove = (e) => {
    if (!imgRef.current || !zoomRef.current) return;

    const rect = imgRef.current.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;

    // Clamp x and y to image bounds
    x = Math.max(0, Math.min(x, rect.width));
    y = Math.max(0, Math.min(y, rect.height));

    // Calculate background position for zoom
    const bgX = (x / rect.width) * 100;
    const bgY = (y / rect.height) * 100;

    setZoomPosition({ x: bgX, y: bgY });
  };

  const handleMouseLeave = () => {
    setShowZoom(false);
  };

  if (loading) {
    return (
      <>
        <NavBar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <NavBar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="text-red-500 text-xl mb-4">Error: {error}</div>
            <Link to="/home" className="text-blue-600 hover:underline">
              Go back to Home
            </Link>
          </div>
        </div>
      </>
    );
  }

  if (!product) {
    return (
      <>
        <NavBar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="text-xl mb-4">Product not found</div>
            <Link to="/home" className="text-blue-600 hover:underline">
              Go back to Home
            </Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <Link to="/home" className="text-blue-600 hover:underline">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-600">{product.name}</span>
          </nav>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
              {/* Product Image with zoom */}
              <div 
                className="flex justify-center items-center bg-gray-50 rounded-lg p-8 relative"
                onMouseEnter={handleMouseEnter}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{ cursor: 'zoom-in' }}
              >
                <img
                  ref={imgRef}
                  src={`http://localhost:5000/uploads/${product.image}`}
                  alt={product.name}
                  className="max-w-full max-h-96 object-contain"
                />
                {showZoom && (
                  <div
                    ref={zoomRef}
                    className="absolute top-0 left-full ml-4 w-full h-96 border border-gray-300 rounded-lg bg-no-repeat bg-white shadow-lg z-10"
                    style={{
                      backgroundImage: `url(http://localhost:5000/uploads/${product.image})`,
                      backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                      backgroundSize: '200%',
                      pointerEvents: 'none',
                    }}
                  />
                )}
                {/* Zoom icon */}
                <div className="absolute top-4 right-4 bg-white bg-opacity-75 rounded-full p-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 15l5 5m-5-5a6 6 0 1112 0 6 6 0 01-12 0z" />
                  </svg>
                </div>
              </div>

              {/* Product Information */}
              <div className="space-y-6">
                {/* Brand */}
                <div>
                  <span className="inline-block bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
                    {product.brand || "ORAIMO"}
                  </span>
                </div>

                {/* Product Name */}
                <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>

                {/* Rating */}
                <div className="flex items-center space-x-2">
                  <div className="text-yellow-500 text-lg">
                    {'⭐'.repeat(Math.floor(product.rating || 4.5))}
                  </div>
                  <span className="text-gray-600">({product.rating || "4.5"} out of 5)</span>
                </div>

                {/* Price */}
                <div className="space-y-2">
                  <div className="flex items-center space-x-4">
                    <span className="text-3xl font-bold text-blue-700">
                      RS: {(product.price * 0.8).toFixed(2)}
                    </span>
                    <span className="text-xl line-through text-gray-400">
                      Rs: {product.price.toFixed(2)}
                    </span>
                    <span className="bg-red-100 text-red-800 text-sm font-medium px-2 py-1 rounded">
                      20% OFF
                    </span>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h3 className="text-lg font-semibold mb-2">Description</h3>
                  <p className="text-gray-700 leading-relaxed">
                    {product.description || "High-quality product with excellent features and durability. Perfect for your needs with premium materials and craftsmanship."}
                  </p>
                </div>

                {/* Specifications */}
                {product.specifications && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Specifications</h3>
                    <ul className="space-y-1 text-gray-700">
                      {Object.entries(product.specifications).map(([key, value]) => (
                        <li key={key}>
                          <span className="font-medium">{key}:</span> {value}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Quantity Selector */}
                <div className="flex items-center space-x-4">
                  <span className="text-lg font-medium">Quantity:</span>
                  <div className="flex items-center border rounded-lg">
                    <button
                      onClick={() => handleQuantityChange(-1)}
                      className="px-3 py-2 hover:bg-gray-100 transition duration-200"
                    >
                      -
                    </button>
                    <span className="px-4 py-2 border-x">{quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(1)}
                      className="px-3 py-2 hover:bg-gray-100 transition duration-200"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-4">
                  <button
                    onClick={handleAddToCartClick}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 transform hover:scale-105"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={handleBuyNowClick}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 transform hover:scale-105"
                  >
                    Buy Now
                  </button>
                  <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition duration-200">
                    ❤️
                  </button>
                </div>

                {/* Login Form */}
                {showLogin && (
                  <div className="mt-6 p-4 border rounded-lg bg-blue-50">
                    <h3 className="text-lg font-semibold mb-4 text-center">Please Login to Continue</h3>
                    <Login />
                    <button 
                      onClick={() => setShowLogin(false)}
                      className="mt-2 text-sm text-gray-600 hover:text-gray-800"
                    >
                      Cancel
                    </button>
                  </div>
                )}

                {/* Additional Info */}
                <div className="border-t pt-6 space-y-2 text-sm text-gray-600">
                  <p>✅ Free shipping on orders over Rs. 2000</p>
                  <p>🔄 30-day return policy</p>
                  <p>🛡️ 1-year warranty included</p>
                  <p>🚚 Fast delivery within 2-3 business days</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
