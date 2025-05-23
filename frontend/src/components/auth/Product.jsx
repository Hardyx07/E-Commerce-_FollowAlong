import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Product({ _id, name, images, description, price, category, tags }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const navigate = useNavigate();
    
    // Image carousel effect
    useEffect(() => {
        if (!images || images.length === 0 || isHovered) return;
        
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000);
        
        return () => clearInterval(interval);
    }, [images, isHovered]);

    // Handle manual image navigation
    const goToNextImage = (e) => {
        e.stopPropagation();
        if (!images || images.length <= 1) return;
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const goToPrevImage = (e) => {
        e.stopPropagation();
        if (!images || images.length <= 1) return;
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    // Get current image
    const currentImage = images && images.length > 0 ? images[currentIndex] : null;
    
    // Truncate description
    const truncatedDescription = description && description.length > 60 
        ? `${description.substring(0, 60)}...` 
        : description;

    return (
        <div 
            className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col h-full transform hover:-translate-y-1"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Image Container with Navigation */}
            <div className="relative w-full h-64 overflow-hidden bg-gray-100">
                {currentImage ? (
                    <img 
                        src={`http://localhost:8000${currentImage}`}
                        alt={name}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-200">
                        <span className="text-gray-400">No image available</span>
                    </div>
                )}
                
                {/* Image Navigation Buttons (visible on hover) */}
                {images && images.length > 1 && isHovered && (
                    <>
                        <button 
                            onClick={goToPrevImage}
                            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 rounded-full p-1 shadow-md hover:bg-opacity-100 transition-all duration-200"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <button 
                            onClick={goToNextImage}
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 rounded-full p-1 shadow-md hover:bg-opacity-100 transition-all duration-200"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </>
                )}
                
                {/* Image Indicator Dots */}
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
                
                {/* Category Badge */}
                {category && (
                    <div className="absolute top-2 left-2">
                        <span className="bg-indigo-600 text-white text-xs px-2 py-1 rounded-full">
                            {category}
                        </span>
                    </div>
                )}
                
                {/* Price Badge */}
                <div className="absolute top-2 right-2">
                    <span className="bg-white text-indigo-600 font-bold px-2 py-1 rounded-full shadow-md">
                        ${price.toFixed(2)}
                    </span>
                </div>
            </div>
            
            {/* Content */}
            <div className="p-4 flex-grow flex flex-col">
                <h2 className="text-lg font-bold text-gray-800 mb-1">{name}</h2>
                <p className="text-sm text-gray-600 mb-3 flex-grow">{truncatedDescription}</p>
                
                {/* Tags */}
                {tags && tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-3">
                        {tags.slice(0, 2).map((tag, index) => (
                            <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                                {tag}
                            </span>
                        ))}
                        {tags.length > 2 && (
                            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                                +{tags.length - 2}
                            </span>
                        )}
                    </div>
                )}
                
                <button 
                    className="w-full text-white px-4 py-2 rounded-md bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition duration-300 shadow-md"
                    onClick={() => navigate(`/product/${_id}`)}
                >
                    View Details
                </button>
            </div>
        </div>
    );
}

export default Product;