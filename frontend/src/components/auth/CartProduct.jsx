import React, { useState, useEffect } from "react";
import { IoIosAdd, IoIosRemove, IoIosTrash } from "react-icons/io";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "../../axiosConfig";

export default function CartProduct({ _id, name, images, quantity, price, description, onRemove }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [quantityVal, setQuantityVal] = useState(quantity);
    const [isUpdating, setIsUpdating] = useState(false);
    const [isRemoving, setIsRemoving] = useState(false);
    
    const navigate = useNavigate();
    const email = useSelector((state) => state.user.email);

    // Image carousel effect
    useEffect(() => {
        if (!images || images.length === 0) return;
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [images]);

    const handleIncrement = () => {
        const newQuantity = quantityVal + 1;
        setQuantityVal(newQuantity);
        updateQuantity(newQuantity);
    };

    const handleDecrement = () => {
        const newQuantity = quantityVal > 1 ? quantityVal - 1 : 1;
        setQuantityVal(newQuantity);
        updateQuantity(newQuantity);
    };

    const updateQuantity = async (quantity) => {
        if (!email) return;
        
        setIsUpdating(true);
        try {
            const response = await axios.put('/api/v2/product/cartproduct/quantity', {
                email: email,
                productId: _id,
                quantity,
            });
            console.log('Quantity updated:', response.data);
        } catch (err) {
            console.error('Error updating quantity:', err);
            // Revert to previous quantity on error
            setQuantityVal(quantityVal);
        } finally {
            setIsUpdating(false);
        }
    };
    
    const handleRemoveItem = async () => {
        if (!email) return;
        
        setIsRemoving(true);
        try {
            // Implement the remove API call here
            // This is a placeholder - you'll need to implement the actual API endpoint
            await axios.delete(`/api/v2/product/cart/${_id}?email=${email}`);
            
            // Call the onRemove callback to update the parent component
            if (onRemove) {
                onRemove(_id);
            }
        } catch (err) {
            console.error('Error removing item:', err);
            setIsRemoving(false);
        }
    };

    const navigateToProduct = () => {
        navigate(`/product/${_id}`);
    };

    const currentImage = images && images.length > 0 ? images[currentIndex] : "";
    
    // Calculate the total price with 2 decimal places
    const totalPrice = (price * quantityVal).toFixed(2);
    
    // Truncate description if it's too long
    const truncatedDescription = description && description.length > 60 
        ? `${description.substring(0, 60)}...` 
        : description;

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-4 hover:shadow-lg transition-shadow duration-300">
            <div className="flex flex-col sm:flex-row">
                {/* Product Image */}
                <div 
                    className="relative w-full sm:w-1/4 cursor-pointer"
                    onClick={navigateToProduct}
                >
                    {currentImage ? (
                        <img
                            src={`http://localhost:8000${currentImage}`}
                            alt={name}
                            className="w-full h-48 sm:h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-48 sm:h-full bg-gray-200 flex items-center justify-center">
                            <span className="text-gray-400">No image</span>
                        </div>
                    )}
                    
                    {/* Image Navigation Indicators */}
                    {images && images.length > 1 && (
                        <div className="absolute bottom-2 left-0 right-0 flex justify-center space-x-1">
                            {images.map((_, index) => (
                                <div 
                                    key={index} 
                                    className={`h-1.5 rounded-full transition-all duration-200 ${
                                        index === currentIndex ? 'w-4 bg-white' : 'w-1.5 bg-white bg-opacity-60'
                                    }`}
                                />
                            ))}
                        </div>
                    )}
                </div>
                
                {/* Product Details */}
                <div className="w-full sm:w-3/4 p-4 flex flex-col sm:flex-row">
                    {/* Product Info */}
                    <div className="flex-grow">
                        <h3 
                            className="text-lg font-semibold text-gray-800 mb-1 cursor-pointer hover:text-indigo-600 transition-colors"
                            onClick={navigateToProduct}
                        >
                            {name}
                        </h3>
                        
                        {truncatedDescription && (
                            <p className="text-sm text-gray-600 mb-3">{truncatedDescription}</p>
                        )}
                        
                        <p className="text-lg font-bold text-indigo-600 mb-2">
                            ${totalPrice}
                            <span className="text-sm text-gray-500 font-normal ml-1">
                                (${price.toFixed(2)} each)
                            </span>
                        </p>
                        
                        {/* Mobile Quantity Controls */}
                        <div className="flex sm:hidden items-center space-x-4 mt-2">
                            <div className="flex items-center border border-gray-300 rounded-md">
                                <button
                                    onClick={handleDecrement}
                                    disabled={isUpdating}
                                    className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                                >
                                    <IoIosRemove />
                                </button>
                                <span className="px-4 py-1 text-center">{quantityVal}</span>
                                <button
                                    onClick={handleIncrement}
                                    disabled={isUpdating}
                                    className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                                >
                                    <IoIosAdd />
                                </button>
                            </div>
                            
                            <button
                                onClick={handleRemoveItem}
                                disabled={isRemoving}
                                className="text-red-500 hover:text-red-700"
                            >
                                <IoIosTrash size={20} />
                            </button>
                        </div>
                    </div>
                    
                    {/* Desktop Quantity Controls */}
                    <div className="hidden sm:flex flex-col items-end justify-between">
                        <div className="flex items-center border border-gray-300 rounded-md">
                            <button
                                onClick={handleDecrement}
                                disabled={isUpdating}
                                className="px-3 py-1 text-gray-600 hover:bg-gray-100 transition-colors"
                            >
                                <IoIosRemove />
                            </button>
                            <span className="px-4 py-1 text-center min-w-[40px]">
                                {isUpdating ? (
                                    <div className="w-4 h-4 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                                ) : (
                                    quantityVal
                                )}
                            </span>
                            <button
                                onClick={handleIncrement}
                                disabled={isUpdating}
                                className="px-3 py-1 text-gray-600 hover:bg-gray-100 transition-colors"
                            >
                                <IoIosAdd />
                            </button>
                        </div>
                        
                        <button
                            onClick={handleRemoveItem}
                            disabled={isRemoving}
                            className="text-red-500 hover:text-red-700 flex items-center mt-4"
                        >
                            {isRemoving ? (
                                <div className="w-4 h-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin mr-1"></div>
                            ) : (
                                <IoIosTrash size={18} className="mr-1" />
                            )}
                            Remove
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}