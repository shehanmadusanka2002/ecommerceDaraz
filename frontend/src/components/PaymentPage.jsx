// PaymentPage.js - Complete component with validation
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import NavBar from './NavBar';

const PaymentPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get product details from navigation state
  const { product, quantity, action } = location.state || {};
  
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expiry: '',
    cvv: '',
    cardholderName: ''
  });

  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);

  // Redirect if no product data
  useEffect(() => {
    if (!product) {
      navigate(`/product/${id}`);
    }
  }, [product, id, navigate]);

  const handleCardInputChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    // Format card number with spaces
    if (name === 'cardNumber') {
      formattedValue = value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();
      if (formattedValue.length > 19) return; // Limit to 16 digits + 3 spaces
    }

    // Format expiry date
    if (name === 'expiry') {
      formattedValue = value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2');
      if (formattedValue.length > 5) return; // Limit to MM/YY
    }

    // Format CVV
    if (name === 'cvv') {
      formattedValue = value.replace(/\D/g, '');
      if (formattedValue.length > 4) return; // Limit to 4 digits
    }

    setCardDetails(prev => ({ ...prev, [name]: formattedValue }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateCard = () => {
    const newErrors = {};
    
    // Validate cardholder name
    if (!cardDetails.cardholderName.trim()) {
      newErrors.cardholderName = 'Cardholder name is required';
    } else if (cardDetails.cardholderName.trim().length < 2) {
      newErrors.cardholderName = 'Name must be at least 2 characters';
    }
    
    // Validate card number
    const cardNumber = cardDetails.cardNumber.replace(/\s/g, '');
    if (!cardNumber) {
      newErrors.cardNumber = 'Card number is required';
    } else if (cardNumber.length < 13 || cardNumber.length > 19) {
      newErrors.cardNumber = 'Please enter a valid card number';
    } else if (!/^\d+$/.test(cardNumber)) {
      newErrors.cardNumber = 'Card number must contain only digits';
    }
    
    // Validate expiry date
    if (!cardDetails.expiry) {
      newErrors.expiry = 'Expiry date is required';
    } else if (!/^\d{2}\/\d{2}$/.test(cardDetails.expiry)) {
      newErrors.expiry = 'Please enter date in MM/YY format';
    } else {
      const [month, year] = cardDetails.expiry.split('/');
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear() % 100;
      const currentMonth = currentDate.getMonth() + 1;
      
      if (parseInt(month) < 1 || parseInt(month) > 12) {
        newErrors.expiry = 'Please enter a valid month (01-12)';
      } else if (parseInt(year) < currentYear || 
                (parseInt(year) === currentYear && parseInt(month) < currentMonth)) {
        newErrors.expiry = 'Card has expired';
      }
    }
    
    // Validate CVV
    if (!cardDetails.cvv) {
      newErrors.cvv = 'CVV is required';
    } else if (cardDetails.cvv.length < 3 || cardDetails.cvv.length > 4) {
      newErrors.cvv = 'CVV must be 3 or 4 digits';
    } else if (!/^\d+$/.test(cardDetails.cvv)) {
      newErrors.cvv = 'CVV must contain only digits';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCardFormSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateCard()) {
      return;
    }

    setIsProcessing(true);
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Payment processing logic here
      const paymentData = {
        productId: id,
        productName: product?.name,
        quantity,
        amount: (product?.price * 0.8 * quantity).toFixed(2),
        action,
        cardDetails: {
          ...cardDetails,
          cardNumber: '****' + cardDetails.cardNumber.slice(-4) // Mask card number
        }
      };
      
      console.log('Payment processed:', paymentData);
      
      // Navigate to success page
      navigate('/payment/success', { 
        state: { 
          paymentData,
          product,
          quantity 
        } 
      });
      
    } catch (error) {
      console.error('Payment failed:', error);
      alert('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
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
            <div className="text-xl mb-4">Loading payment page...</div>
          </div>
        </div>
      </>
    );
  }

  const totalAmount = (product.price * 0.8 * quantity).toFixed(2);

  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          {/* Back button */}
          <button
            onClick={handleGoBack}
            className="mb-6 flex items-center text-blue-600 hover:text-blue-800 transition"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Product
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Order Summary */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
              
              <div className="flex items-center space-x-4 mb-6">
                <img
                  src={`http://localhost:5000/uploads/${product.image}`}
                  alt={product.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{product.name}</h3>
                  <p className="text-gray-600">Quantity: {quantity}</p>
                  <p className="text-blue-600 font-semibold">
                    Rs. {(product.price * 0.8).toFixed(2)} each
                  </p>
                </div>
              </div>

              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>Rs. {totalAmount}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping:</span>
                  <span className="text-green-600">Free</span>
                </div>
                <div className="flex justify-between text-lg font-bold border-t pt-2">
                  <span>Total:</span>
                  <span>Rs. {totalAmount}</span>
                </div>
              </div>
            </div>

            {/* Payment Form */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-6">Payment Details</h2>
              
              <form onSubmit={handleCardFormSubmit} className="space-y-4">
                {/* Cardholder Name */}
                <div>
                  <input
                    type="text"
                    name="cardholderName"
                    placeholder="Cardholder Name"
                    value={cardDetails.cardholderName}
                    onChange={handleCardInputChange}
                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.cardholderName ? 'border-red-500' : 'border-gray-300'
                    }`}
                    required
                  />
                  {errors.cardholderName && (
                    <p className="text-red-500 text-sm mt-1">{errors.cardholderName}</p>
                  )}
                </div>

                {/* Card Number */}
                <div>
                  <input
                    type="text"
                    name="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    value={cardDetails.cardNumber}
                    onChange={handleCardInputChange}
                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.cardNumber ? 'border-red-500' : 'border-gray-300'
                    }`}
                    required
                  />
                  {errors.cardNumber && (
                    <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>
                  )}
                </div>

                {/* Expiry and CVV */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      name="expiry"
                      placeholder="MM/YY"
                      value={cardDetails.expiry}
                      onChange={handleCardInputChange}
                      className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.expiry ? 'border-red-500' : 'border-gray-300'
                      }`}
                      required
                    />
                    {errors.expiry && (
                      <p className="text-red-500 text-sm mt-1">{errors.expiry}</p>
                    )}
                  </div>
                  <div>
                    <input
                      type="text"
                      name="cvv"
                      placeholder="CVV"
                      value={cardDetails.cvv}
                      onChange={handleCardInputChange}
                      className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.cvv ? 'border-red-500' : 'border-gray-300'
                      }`}
                      required
                    />
                    {errors.cvv && (
                      <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>
                    )}
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isProcessing}
                  className={`w-full py-3 rounded-lg font-semibold transition duration-200 ${
                    isProcessing
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                >
                  {isProcessing ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Processing...
                    </div>
                  ) : (
                    `Complete Payment - Rs. ${totalAmount}`
                  )}
                </button>
              </form>

              {/* Security Info */}
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center text-sm text-gray-600">
                  <svg className="w-5 h-5 mr-2 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                  Your payment information is secure and encrypted
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentPage;
