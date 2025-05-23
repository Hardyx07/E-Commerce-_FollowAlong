import React, { useState, useEffect } from 'react';
import CartProduct from '../components/auth/CartProduct';
import NavBar from '../components/auth/nav';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from '../axiosConfig';

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Get the email from Redux state
  const email = useSelector((state) => state.user.email);
  
  // Calculate cart totals
  const subtotal = products.reduce((sum, product) => sum + (product.price * product.quantity), 0);
  const shipping = subtotal > 0 ? 5.99 : 0; // Example shipping cost
  const tax = subtotal * 0.07; // Example tax rate (7%)
  const total = subtotal + shipping + tax;

  const fetchCartProducts = () => {
    // Only fetch if email is available
    if (!email) {
      setLoading(false);
      return;
    }
    
    setLoading(true);
    axios.get(`/api/v2/product/cartproducts?email=${email}`)
      .then((res) => {
        setProducts(res.data.cart.map(product => ({
          quantity: product.quantity,
          ...product.productId,
        })));
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setError(err.message || "Failed to load cart items");
        setLoading(false);
      });
  };
  
  useEffect(() => {
    fetchCartProducts();
  }, [email]);

  const handlePlaceOrder = () => {
    navigate('/select-address');
  };
  
  const handleRemoveItem = (productId) => {
    // Filter out the removed product
    setProducts(products.filter(product => product._id !== productId));
  };
  
  const handleContinueShopping = () => {
    navigate('/');
  };

  return (
    <>
      <NavBar />
      <div className="bg-gray-50 min-h-screen py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Your Shopping Cart</h1>
          
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-pulse flex flex-col items-center">
                <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="mt-4 text-lg text-indigo-600 font-medium">Loading your cart...</p>
              </div>
            </div>
          ) : error ? (
            <div className="bg-white rounded-lg shadow-md p-8 max-w-md mx-auto">
              <div className="flex items-center justify-center text-red-500 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Error Loading Cart</h2>
              <p className="text-center text-gray-600 mb-6">{error}</p>
              <button 
                onClick={() => fetchCartProducts()} 
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-300"
              >
                Try Again
              </button>
            </div>
          ) : products.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-8 max-w-md mx-auto text-center">
              <div className="flex justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
              <p className="text-gray-600 mb-8">Looks like you haven't added any products to your cart yet.</p>
              <button 
                onClick={handleContinueShopping} 
                className="bg-indigo-600 text-white py-3 px-6 rounded-md hover:bg-indigo-700 transition duration-300 inline-flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Cart Items */}
              <div className="lg:w-2/3">
                <div className="bg-white rounded-lg shadow-md p-6 mb-4">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">Cart Items ({products.length})</h2>
                  
                  <div className="space-y-4">
                    {products.map(product => (
                      <CartProduct 
                        key={product._id} 
                        {...product} 
                        onRemove={handleRemoveItem}
                      />
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-between items-center mt-6">
                  <button 
                    onClick={handleContinueShopping}
                    className="text-indigo-600 hover:text-indigo-800 flex items-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Continue Shopping
                  </button>
                </div>
              </div>
              
              {/* Order Summary */}
              <div className="lg:w-1/3">
                <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                  <h2 className="text-xl font-semibold text-gray-800 mb-6">Order Summary</h2>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    
                    <div className="flex justify-between text-gray-600">
                      <span>Shipping</span>
                      <span>${shipping.toFixed(2)}</span>
                    </div>
                    
                    <div className="flex justify-between text-gray-600">
                      <span>Tax (7%)</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    
                    <div className="border-t pt-4 mt-4">
                      <div className="flex justify-between font-semibold text-lg">
                        <span>Total</span>
                        <span className="text-indigo-600">${total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                  
                  <button
                    onClick={handlePlaceOrder}
                    className="w-full mt-6 bg-indigo-600 text-white py-3 px-6 rounded-md hover:bg-indigo-700 transition duration-300 flex items-center justify-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Proceed to Checkout
                  </button>
                  
                  <div className="mt-6 text-center text-sm text-gray-500">
                    <p>We accept:</p>
                    <div className="flex justify-center space-x-2 mt-2">
                      <div className="w-10 h-6 bg-blue-900 rounded"></div>
                      <div className="w-10 h-6 bg-red-500 rounded"></div>
                      <div className="w-10 h-6 bg-green-600 rounded"></div>
                      <div className="w-10 h-6 bg-yellow-500 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;