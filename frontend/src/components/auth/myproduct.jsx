import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Myproduct({ _id, name, images, description, price }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const [showConfirmDelete, setShowConfirmDelete] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!images || images.length === 0) return;
        if (isHovered) return; // Don't auto-rotate when hovered
        
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [images, isHovered]);

    const currentImage = images && images.length > 0 ? images[currentIndex] : null;

    const handleEdit = () => {
        navigate(`/create-product/${_id}`);
    };

    const handleDelete = async () => {
        try {
            const response = await axios.delete(
                `http://localhost:8000/api/v2/product/delete-product/${_id}`
            );
            if (response.status === 200) {
                // Use a more elegant notification instead of alert
                const notification = document.createElement('div');
                notification.className = 'fixed top-4 right-4 bg-green-600 text-white px-6 py-3 rounded-md shadow-lg z-50 animate-fade-in-out';
                notification.textContent = 'Product deleted successfully!';
                document.body.appendChild(notification);
                
                setTimeout(() => {
                    notification.remove();
                    window.location.reload();
                }, 2000);
            }
        } catch (err) {
            console.error("Error deleting product:", err);
            const notification = document.createElement('div');
            notification.className = 'fixed top-4 right-4 bg-red-600 text-white px-6 py-3 rounded-md shadow-lg z-50 animate-fade-in-out';
            notification.textContent = 'Failed to delete product.';
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.remove();
            }, 3000);
        }
    };

    // Function to truncate description
    const truncateDescription = (text, maxLength = 80) => {
        if (!text) return '';
        if (text.length <= maxLength) return text;
        return text.substr(0, maxLength) + '...';
    };

    // Navigate to product details
    const viewProductDetails = () => {
        navigate(`/product/${_id}`);
    };

    return (
        <div 
            className="bg-gradient-to-b from-neutral-700 to-neutral-800 rounded-xl shadow-xl overflow-hidden transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => {
                setIsHovered(false);
                setShowConfirmDelete(false);
            }}
        >
            {/* Image container with navigation dots */}
            <div className="relative w-full h-64 overflow-hidden group">
                {currentImage ? (
                    <img
                        src={`http://localhost:8000${currentImage}`}
                        alt={name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                ) : (
                    <div className="w-full h-full bg-neutral-600 flex items-center justify-center">
                        <span className="text-neutral-400">No image available</span>
                    </div>
                )}
                
                {/* Image navigation dots */}
                {images && images.length > 1 && (
                    <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
                        {images.map((_, index) => (
                            <button 
                                key={index}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setCurrentIndex(index);
                                }}
                                className={`w-2 h-2 rounded-full transition-all ${
                                    currentIndex === index 
                                        ? 'bg-white scale-125' 
                                        : 'bg-white/50 hover:bg-white/80'
                                }`}
                            />
                        ))}
                    </div>
                )}
                
                {/* Price tag */}
                <div className="absolute top-3 right-3 bg-blue-600 text-white px-3 py-1 rounded-full font-bold shadow-lg">
                    ${price.toFixed(2)}
                </div>
            </div>
            
            {/* Content */}
            <div className="p-5">
                <h2 className="text-xl font-bold text-white mb-2 line-clamp-1">{name}</h2>
                <p className="text-neutral-300 text-sm mb-4 line-clamp-2">
                    {truncateDescription(description)}
                </p>
                
                {/* Action buttons */}
                <div className="flex gap-2 mt-4">
                    <button
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-md transition-all duration-300 flex items-center justify-center"
                        onClick={viewProductDetails}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                        </svg>
                        View
                    </button>
                    <button
                        className="flex-1 bg-neutral-600 hover:bg-neutral-500 text-white px-4 py-2.5 rounded-md transition-all duration-300 flex items-center justify-center"
                        onClick={handleEdit}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                        Edit
                    </button>
                </div>
                
                {/* Delete button with confirmation */}
                {!showConfirmDelete ? (
                    <button
                        onClick={() => setShowConfirmDelete(true)}
                        className="w-full mt-2 text-white px-4 py-2.5 rounded-md bg-red-600 hover:bg-red-700 transition-all duration-300 flex items-center justify-center"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        Delete
                    </button>
                ) : (
                    <div className="mt-2 flex gap-2">
                        <button
                            onClick={() => setShowConfirmDelete(false)}
                            className="flex-1 bg-neutral-600 hover:bg-neutral-700 text-white px-2 py-2.5 rounded-md transition-all duration-300"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleDelete}
                            className="flex-1 bg-red-600 hover:bg-red-700 text-white px-2 py-2.5 rounded-md transition-all duration-300 flex items-center justify-center"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                            Confirm
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
    

export default Myproduct;