import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { loadUser } from '../utils/authUtils';

const ProtectedRoute = ({ children }) => {
  const { email } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  useEffect(() => {
    const checkAuth = async () => {
      // If email is already in Redux store, user is authenticated
      if (email) {
        setIsAuthenticated(true);
        setLoading(false);
        return;
      }
      
      // Otherwise, try to load user data from backend
      try {
        const result = await loadUser();
        setIsAuthenticated(result);
      } catch (error) {
        console.error('Authentication check failed:', error);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };
    
    checkAuth();
  }, [email]);
  
  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  // If user is not authenticated, redirect to signup
  if (!isAuthenticated) {
    return <Navigate to="/signup" />;
  }
  
  // If user is authenticated, render the protected component
  return children;
};

export default ProtectedRoute;