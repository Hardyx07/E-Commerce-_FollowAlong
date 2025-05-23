import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
    
    return (
        <nav className="bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    {/* Logo/Brand */}
                    <div className="flex items-center">
                        <NavLink to="/" className="flex items-center">
                            <span className="text-white text-xl font-bold tracking-wider">ShopEase</span>
                        </NavLink>
                    </div>
                    
                    {/* Hamburger Menu Button (visible on mobile) */}
                    <div className="flex items-center md:hidden">
                        <button
                            onClick={toggleMenu}
                            type="button"
                            className="text-gray-200 hover:text-white focus:outline-none focus:text-white"
                            aria-controls="mobile-menu"
                            aria-expanded={isOpen}
                        >
                            <span className="sr-only">Open main menu</span>
                            {!isOpen ? (
                                <svg
                                    className="h-6 w-6"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    className="h-6 w-6"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            )}
                        </button>
                    </div>
                    
                    {/* Desktop Navigation */}
                    <div className="hidden md:flex md:items-center md:justify-center">
                        <ul className="flex space-x-4">
                            <li>
                                <NavLink
                                    to="/"
                                    end
                                    className={({ isActive }) =>
                                        isActive
                                            ? "text-white font-semibold px-3 py-2 rounded-md text-md transition-all duration-200 border-b-2 border-white"
                                            : "text-gray-200 hover:text-white px-3 py-2 rounded-md text-md transition-all duration-200 hover:border-b-2 hover:border-white"
                                    }
                                >
                                    Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/my-products"
                                    className={({ isActive }) =>
                                        isActive
                                            ? "text-white font-semibold px-3 py-2 rounded-md text-md transition-all duration-200 border-b-2 border-white"
                                            : "text-gray-200 hover:text-white px-3 py-2 rounded-md text-md transition-all duration-200 hover:border-b-2 hover:border-white"
                                    }
                                >
                                    My Products
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/create-product"
                                    className={({ isActive }) =>
                                        isActive
                                            ? "text-white font-semibold px-3 py-2 rounded-md text-md transition-all duration-200 border-b-2 border-white"
                                            : "text-gray-200 hover:text-white px-3 py-2 rounded-md text-md transition-all duration-200 hover:border-b-2 hover:border-white"
                                    }
                                >
                                    Add Products
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/cart"
                                    className={({ isActive }) =>
                                        isActive
                                            ? "text-white font-semibold px-3 py-2 rounded-md text-md transition-all duration-200 border-b-2 border-white flex items-center"
                                            : "text-gray-200 hover:text-white px-3 py-2 rounded-md text-md transition-all duration-200 hover:border-b-2 hover:border-white flex items-center"
                                    }
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                    Cart
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/myorders"
                                    className={({ isActive }) =>
                                        isActive
                                            ? "text-white font-semibold px-3 py-2 rounded-md text-md transition-all duration-200 border-b-2 border-white flex items-center"
                                            : "text-gray-200 hover:text-white px-3 py-2 rounded-md text-md transition-all duration-200 hover:border-b-2 hover:border-white flex items-center"
                                    }
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                    </svg>
                                    My Orders
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/profile"
                                    className={({ isActive }) =>
                                        isActive
                                            ? "text-white font-semibold px-3 py-2 rounded-md text-md transition-all duration-200 border-b-2 border-white flex items-center"
                                            : "text-gray-200 hover:text-white px-3 py-2 rounded-md text-md transition-all duration-200 hover:border-b-2 hover:border-white flex items-center"
                                    }
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                    Profile
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            
            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-indigo-700 shadow-lg" id="mobile-menu">
                    <ul className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <li>
                            <NavLink
                                to="/"
                                end
                                className={({ isActive }) =>
                                    isActive
                                        ? "block text-white font-semibold px-3 py-2 rounded-md text-base transition-colors duration-200 bg-indigo-800"
                                        : "block text-gray-200 hover:text-white px-3 py-2 rounded-md text-base transition-colors duration-200 hover:bg-indigo-800"
                                }
                                onClick={() => setIsOpen(false)}
                            >
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/my-products"
                                className={({ isActive }) =>
                                    isActive
                                        ? "block text-white font-semibold px-3 py-2 rounded-md text-base transition-colors duration-200 bg-indigo-800"
                                        : "block text-gray-200 hover:text-white px-3 py-2 rounded-md text-base transition-colors duration-200 hover:bg-indigo-800"
                                }
                                onClick={() => setIsOpen(false)}
                            >
                                My Products
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/create-product"
                                className={({ isActive }) =>
                                    isActive
                                        ? "block text-white font-semibold px-3 py-2 rounded-md text-base transition-colors duration-200 bg-indigo-800"
                                        : "block text-gray-200 hover:text-white px-3 py-2 rounded-md text-base transition-colors duration-200 hover:bg-indigo-800"
                                }
                                onClick={() => setIsOpen(false)}
                            >
                                Add Products
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/cart"
                                className={({ isActive }) =>
                                    isActive
                                        ? "block text-white font-semibold px-3 py-2 rounded-md text-base transition-colors duration-200 bg-indigo-800 flex items-center"
                                        : "block text-gray-200 hover:text-white px-3 py-2 rounded-md text-base transition-colors duration-200 hover:bg-indigo-800 flex items-center"
                                }
                                onClick={() => setIsOpen(false)}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                                Cart
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/myorders"
                                className={({ isActive }) =>
                                    isActive
                                        ? "block text-white font-semibold px-3 py-2 rounded-md text-base transition-colors duration-200 bg-indigo-800 flex items-center"
                                        : "block text-gray-200 hover:text-white px-3 py-2 rounded-md text-base transition-colors duration-200 hover:bg-indigo-800 flex items-center"
                                }
                                onClick={() => setIsOpen(false)}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg>
                                My Orders
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/profile"
                                className={({ isActive }) =>
                                    isActive
                                        ? "block text-white font-semibold px-3 py-2 rounded-md text-base transition-colors duration-200 bg-indigo-800 flex items-center"
                                        : "block text-gray-200 hover:text-white px-3 py-2 rounded-md text-base transition-colors duration-200 hover:bg-indigo-800 flex items-center"
                                }
                                onClick={() => setIsOpen(false)}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                Profile
                            </NavLink>
                        </li>
                    </ul>
                </div>
            )}
        </nav>
    );
};
export default NavBar;