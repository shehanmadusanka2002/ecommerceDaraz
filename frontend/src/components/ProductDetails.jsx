import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';


const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);

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

  const handleAddToCart = () => {
    // Add to cart logic here
    console.log(`Added ${quantity} of ${product.name} to cart`);
  };

  if (loading) {
    return (
      <>
        
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-xl">Loading...</div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-red-500">Error: {error}</div>
        </div>
      </>
    );
  }

  if (!product) {
    return (
      <>
        
        <div className="min-h-screen flex items-center justify-center">
          <div>Product not found</div>
        </div>
      </>
    );
  }

  return (
    <>
      
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <Link to="/" className="text-blue-600 hover:underline">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-600">{product.name}</span>
          </nav>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
              {/* Product Image */}
              <div className="flex justify-center items-center bg-gray-50 rounded-lg p-8">
                <img
                  src={`http://localhost:5000/uploads/${product.image}`}
                  alt={product.name}
                  className="max-w-full max-h-96 object-contain"
                />
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
                      className="px-3 py-2 hover:bg-gray-100"
                    >
                      -
                    </button>
                    <span className="px-4 py-2 border-x">{quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(1)}
                      className="px-3 py-2 hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-4">
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200"
                  >
                    Add to Cart
                  </button>
                  <button className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200">
                    Buy Now
                  </button>
                  <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50">
                    ❤️
                  </button>
                </div>

                {/* Additional Info */}
                <div className="border-t pt-6 space-y-2 text-sm text-gray-600">
                  <p>✅ Free shipping on orders over Rs. 2000</p>
                  <p>🔄 30-day return policy</p>
                  <p>🛡️ 1-year warranty included</p>
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
