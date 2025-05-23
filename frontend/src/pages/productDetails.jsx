import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../axiosConfig";
import NavBar from "../components/auth/nav";
import { IoIosAdd, IoIosRemove, IoIosArrowBack } from "react-icons/io";
import { useSelector } from "react-redux";

export default function ProductDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [isAddingToCart, setIsAddingToCart] = useState(false);
    const [addedToCart, setAddedToCart] = useState(false);
    
    // Get email from Redux state
    const email = useSelector((state) => state.user.email);
 
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`/api/v2/product/product/${id}`);
                setProduct(response.data.product);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching product:", err);
                setError(err);
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    // Handler to increment quantity
    const handleIncrement = () => {
        setQuantity((prevQuantity) => prevQuantity + 1);
    };

    // Handler to decrement quantity
    const handleDecrement = () => {
        setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
    };

    // Add to cart handler
    const addToCart = async () => {
        if (!email) {
            alert("No user email found! Please login.");
            return;
        }
        
        try {
            setIsAddingToCart(true);
            const response = await axios.post("/api/v2/product/cart", {
                userId: email,
                productId: id,
                quantity: quantity,
            });
            
            console.log("Added to cart:", response.data);
            setAddedToCart(true);
            
            // Reset the added to cart message after 3 seconds
            setTimeout(() => {
                setAddedToCart(false);
            }, 3000);
        } catch (err) {
            console.error("Error adding to cart:", err);
            alert(err.response?.data?.message || "Error adding to cart");
        } finally {
            setIsAddingToCart(false);
        }
    };

    // Loading state
    if (loading) {
        return (
            <>
                <NavBar />
                <div className="flex justify-center items-center min-h-screen bg-gray-50">
                    <div className="animate-pulse flex flex-col items-center">
                        <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                        <p className="mt-4 text-lg text-indigo-600 font-medium">Loading product details...</p>
                    </div>
                </div>
            </>
        );
    }

    // Error state
    if (error) {
        return (
            <>
                <NavBar />
                <div className="flex justify-center items-center min-h-screen bg-gray-50">
                    <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
                        <div className="flex items-center justify-center text-red-500 mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Error Loading Product</h2>
                        <p className="text-center text-gray-600 mb-6">{error.message}</p>
                        <button 
                            onClick={() => navigate(-1)} 
                            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-300"
                        >
                            Go Back
                        </button>
                    </div>
                </div>
            </>
        );
    }

    // No product found state
    if (!product) {
        return (
            <>
                <NavBar />
                <div className="flex justify-center items-center min-h-screen bg-gray-50">
                    <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
                        <div className="flex items-center justify-center text-gray-400 mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Product Not Found</h2>
                        <p className="text-center text-gray-600 mb-6">The product you're looking for doesn't exist or has been removed.</p>
                        <button 
                            onClick={() => navigate('/')} 
                            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-300"
                        >
                            Back to Home
                        </button>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <NavBar />
            <div className="bg-gray-50 min-h-screen py-8">
                <div className="container mx-auto px-4">
                    {/* Breadcrumb */}
                    <div className="mb-6">
                        <button 
                            onClick={() => navigate(-1)} 
                            className="flex items-center text-indigo-600 hover:text-indigo-800 transition-colors"
                        >
                            <IoIosArrowBack className="mr-1" />
                            <span>Back to products</span>
                        </button>
                    </div>
                    
                    <div className="bg-white rounded-xl shadow-md overflow-hidden">
                        <div className="md:flex">
                            {/* Image Gallery Section */}
                            <div className="md:w-1/2 p-6">
                                <div className="relative aspect-square overflow-hidden rounded-lg mb-4 bg-gray-100">
                                    {product.images && product.images.length > 0 ? (
                                        <img
                                            src={`http://localhost:8000${product.images[selectedImageIndex]}`}
                                            alt={product.name}
                                            className="w-full h-full object-contain"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-gray-200">
                                            <span className="text-gray-400">No image available</span>
                                        </div>
                                    )}
                                </div>
                                
                                {/* Thumbnail Gallery */}
                                {product.images && product.images.length > 1 && (
                                    <div className="flex space-x-2 overflow-x-auto pb-2">
                                        {product.images.map((image, index) => (
                                            <div 
                                                key={index}
                                                onClick={() => setSelectedImageIndex(index)}
                                                className={`w-16 h-16 rounded-md overflow-hidden cursor-pointer border-2 ${
                                                    selectedImageIndex === index 
                                                        ? 'border-indigo-500' 
                                                        : 'border-transparent hover:border-indigo-300'
                                                }`}
                                            >
                                                <img 
                                                    src={`http://localhost:8000${image}`}
                                                    alt={`${product.name} thumbnail ${index + 1}`}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                            
                            {/* Product Information Section */}
                            <div className="md:w-1/2 p-6 md:border-l border-gray-200">
                                {/* Category Badge */}
                                {product.category && (
                                    <div className="mb-2">
                                        <span className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                                            {product.category}
                                        </span>
                                    </div>
                                )}
                                
                                {/* Product Title */}
                                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                    {product.name}
                                </h1>
                                
                                {/* Price */}
                                <div className="flex items-center mb-6">
                                    <span className="text-3xl font-bold text-indigo-600">
                                        ${parseFloat(product.price).toFixed(2)}
                                    </span>
                                </div>
                                
                                {/* Description */}
                                <div className="mb-6">
                                    <h2 className="text-lg font-semibold text-gray-900 mb-2">
                                        Description
                                    </h2>
                                    <p className="text-gray-700 leading-relaxed">
                                        {product.description}
                                    </p>
                                </div>
                                
                                {/* Tags */}
                                {product.tags && product.tags.length > 0 && (
                                    <div className="mb-6">
                                        <h2 className="text-lg font-semibold text-gray-900 mb-2">
                                            Tags
                                        </h2>
                                        <div className="flex flex-wrap gap-2">
                                            {product.tags.map((tag, index) => (
                                                <span
                                                    key={index}
                                                    className="bg-gray-100 text-gray-800 text-sm font-medium px-3 py-1 rounded-full"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                
                                {/* Quantity Selector */}
                                <div className="mb-6">
                                    <h2 className="text-lg font-semibold text-gray-900 mb-2">
                                        Quantity
                                    </h2>
                                    <div className="flex items-center">
                                        <button
                                            onClick={handleDecrement}
                                            className="flex justify-center items-center w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-l-lg transition-colors"
                                        >
                                            <IoIosRemove className="text-gray-600 text-xl" />
                                        </button>
                                        <div className="w-16 h-10 flex items-center justify-center bg-gray-50 border-t border-b border-gray-200 text-gray-900 font-medium">
                                            {quantity}
                                        </div>
                                        <button
                                            onClick={handleIncrement}
                                            className="flex justify-center items-center w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-r-lg transition-colors"
                                        >
                                            <IoIosAdd className="text-gray-600 text-xl" />
                                        </button>
                                    </div>
                                </div>
                                
                                {/* Add to Cart Button */}
                                <div className="flex flex-col space-y-3">
                                    <button 
                                        onClick={addToCart}
                                        disabled={isAddingToCart}
                                        className={`w-full py-3 px-6 rounded-lg font-semibold text-white shadow-md transition-all duration-300 flex items-center justify-center ${
                                            isAddingToCart 
                                                ? 'bg-indigo-400 cursor-not-allowed' 
                                                : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-lg'
                                        }`}
                                    >
                                        {isAddingToCart ? (
                                            <>
                                                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Adding to Cart...
                                            </>
                                        ) : (
                                            <>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                                </svg>
                                                Add to Cart
                                            </>
                                        )}
                                    </button>
                                    
                                    {/* Buy Now Button */}
                                    <button 
                                        onClick={() => {
                                            addToCart();
                                            setTimeout(() => navigate('/cart'), 500);
                                        }}
                                        disabled={isAddingToCart}
                                        className={`w-full py-3 px-6 rounded-lg font-semibold text-indigo-700 border border-indigo-600 hover:bg-indigo-50 transition-colors duration-300 ${
                                            isAddingToCart ? 'opacity-50 cursor-not-allowed' : ''
                                        }`}
                                    >
                                        Buy Now
                                    </button>
                                    
                                    {/* Added to Cart Message */}
                                    {addedToCart && (
                                        <div className="flex items-center justify-center text-green-600 mt-2 animate-pulse">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            Added to cart!
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}