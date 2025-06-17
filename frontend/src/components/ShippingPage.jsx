// ShippingPage.js
import React, { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import NavBar from './NavBar';


const ShippingPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get product details from navigation state
  const { product, quantity, action } = location.state || {};

  const [shippingDetails, setShippingDetails] = useState({
    country: 'Sri Lanka',
    province: '',
    district: '',
    city: '',
    streetAddress: '',
    building: '',
    firstName: '',
    lastName: '',
    phoneNumber: ''
  });

  const [errors, setErrors] = useState({});

  const sriLankanProvinces = [
    'Western Province',
    'Central Province',
    'Southern Province',
    'Northern Province',
    'Eastern Province',
    'North Western Province',
    'North Central Province',
    'Uva Province',
    'Sabaragamuwa Province'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingDetails(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!shippingDetails.province) newErrors.province = 'Province is required';
    if (!shippingDetails.district) newErrors.district = 'District is required';
    if (!shippingDetails.city) newErrors.city = 'City is required';
    if (!shippingDetails.streetAddress.trim()) newErrors.streetAddress = 'Street address is required';
    if (!shippingDetails.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!shippingDetails.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!shippingDetails.phoneNumber.trim()) newErrors.phoneNumber = 'Phone number is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinueToPayment = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    // Navigate to payment page with shipping details
    navigate(`/payment/${id}`, {
      state: {
        product,
        quantity,
        action,
        shippingDetails
      }
    });
  };

  const handleGoBack = () => {
    navigate(`/product/${id}`);
  };

  if (!product) {
    return (
      <>
        <NavBar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="text-xl mb-4">Loading shipping page...</div>
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
          <nav className="mb-8 text-sm text-gray-600">
            <span>Home</span>
            <span className="mx-2">›</span>
            <span>Contact information</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Shipping Form */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6">Shipping address</h2>
              
              <form onSubmit={handleContinueToPayment} className="space-y-6">
                {/* Country/Region */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Country / Region <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="country"
                    value={shippingDetails.country}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="Sri Lanka">Sri Lanka</option>
                  </select>
                </div>

                {/* Province */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Province <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="province"
                    value={shippingDetails.province}
                    onChange={handleInputChange}
                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.province ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select</option>
                    {sriLankanProvinces.map(province => (
                      <option key={province} value={province}>{province}</option>
                    ))}
                  </select>
                  {errors.province && <p className="text-red-500 text-sm mt-1">{errors.province}</p>}
                </div>

                {/* District */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    District <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="district"
                    value={shippingDetails.district}
                    onChange={handleInputChange}
                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.district ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select</option>
                    <option value="Colombo">Colombo</option>
                    <option value="Gampaha">Gampaha</option>
                    <option value="Kalutara">Kalutara</option>
                    <option value="Kandy">Kandy</option>
                    <option value="Matale">Matale</option>
                    <option value="Nuwara Eliya">Nuwara Eliya</option>
                    {/* Add more districts as needed */}
                  </select>
                  {errors.district && <p className="text-red-500 text-sm mt-1">{errors.district}</p>}
                </div>

                {/* City */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    City <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="city"
                    value={shippingDetails.city}
                    onChange={handleInputChange}
                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.city ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select</option>
                    <option value="Colombo">Colombo</option>
                    <option value="Dehiwala">Dehiwala</option>
                    <option value="Moratuwa">Moratuwa</option>
                    <option value="Kandy">Kandy</option>
                    {/* Add more cities as needed */}
                  </select>
                  {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                </div>

                {/* Street Address */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Street name and number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="streetAddress"
                    placeholder="Ex: 230 Sea Street"
                    value={shippingDetails.streetAddress}
                    onChange={handleInputChange}
                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.streetAddress ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.streetAddress && <p className="text-red-500 text-sm mt-1">{errors.streetAddress}</p>}
                </div>

                {/* Building (Optional) */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Building and apartment <span className="text-gray-400">(optional)</span>
                  </label>
                  <input
                    type="text"
                    name="building"
                    placeholder="Ex: Western Lodge"
                    value={shippingDetails.building}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Name Fields */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={shippingDetails.firstName}
                      onChange={handleInputChange}
                      className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.firstName ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Last Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={shippingDetails.lastName}
                      onChange={handleInputChange}
                      className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.lastName ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                  </div>
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Phone number <span className="text-red-500">*</span>
                  </label>
                  <div className="text-sm text-gray-500 mb-2">May be used to assist delivery</div>
                  <div className="flex">
                    <select className="p-3 border border-gray-300 rounded-l-lg bg-gray-50">
                      <option>LK +94</option>
                    </select>
                    <input
                      type="tel"
                      name="phoneNumber"
                      placeholder="Enter a 10-digit number"
                      value={shippingDetails.phoneNumber}
                      onChange={handleInputChange}
                      className={`flex-1 p-3 border rounded-r-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.phoneNumber ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                  </div>
                  {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>}
                </div>

                {/* Buttons */}
                <div className="flex space-x-4 pt-6">
                  <button
                    type="button"
                    onClick={handleGoBack}
                    className="flex-1 border border-gray-300 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-50 transition"
                  >
                    Back to Product
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-3 px-6 rounded-lg transition font-semibold"
                  >
                    Continue to payment
                  </button>
                </div>
              </form>
            </div>

            {/* Order Summary */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-xl font-bold mb-6">Order Summary</h3>
              
              <div className="flex items-center space-x-4 mb-6">
                <img
                  src={`http://localhost:5000/uploads/${product.image}`}
                  alt={product.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h4 className="font-semibold">{product.name}</h4>
                  <p className="text-gray-600">Quantity: {quantity}</p>
                  <p className="text-blue-600 font-semibold">
                    Rs. {(product.price * 0.8).toFixed(2)} each
                  </p>
                </div>
              </div>

              {/* Security Features */}
              <div className="space-y-3 text-sm">
                <div className="flex items-center text-green-600">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Temu protects your card information
                </div>
                <div className="flex items-center text-green-600">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Temu follows the Payment Card Industry Data Security Standard (PCI DSS)
                </div>
                <div className="flex items-center text-green-600">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Card information is secure and uncompromised
                </div>
                <div className="flex items-center text-green-600">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  All data is encrypted
                </div>
                <div className="flex items-center text-green-600">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Temu never sells your card information
                </div>
              </div>

              {/* Payment Icons */}
              <div className="mt-6 pt-6 border-t">
                <div className="flex flex-wrap gap-2">
                  <img src="/visa.png" alt="Visa" className="h-8" />
                  <img src="/mastercard.png" alt="Mastercard" className="h-8" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShippingPage;
