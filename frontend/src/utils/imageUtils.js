/**
 * Utility functions for handling image URLs
 */

// Get the API URL from environment variables
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

/**
 * Converts a relative image path to a full URL
 * @param {string} imagePath - The relative path to the image
 * @returns {string} The full URL to the image
 */
export const getImageUrl = (imagePath) => {
  if (!imagePath) return '';
  
  // If the path already starts with http, return it as is
  if (imagePath.startsWith('http')) {
    return imagePath;
  }
  
  // Make sure the path starts with a slash
  const normalizedPath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
  
  return `${API_URL}${normalizedPath}`;
};