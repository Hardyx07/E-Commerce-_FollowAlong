import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {LoginPage, SignupPage, Home, CreateProduct, MyProducts, Cart, ProductDetails, Profile, CreateAddress, SelectAddress, OrderConfirmation, MyOrdersPage} from "./Routes";
import ProtectedRoute from './components/ProtectedRoute';
import "./App.css";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path="/signup" element={<SignupPage />} />
        
        {/* Protected routes - redirect to signup if not authenticated */}
        <Route path="/create-product" element={
          <ProtectedRoute>
            <CreateProduct />
          </ProtectedRoute>
        } />
        <Route path="/create-product/:id" element={
          <ProtectedRoute>
            <CreateProduct />
          </ProtectedRoute>
        } />
        <Route path="/my-products" element={
          <ProtectedRoute>
            <MyProducts />
          </ProtectedRoute>
        } />
        <Route path="/cart" element={
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        } />
        <Route path="/product/:id" element={
          <ProtectedRoute>
            <ProductDetails />
          </ProtectedRoute>
        } />
        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />
        <Route path='/create-address' element={
          <ProtectedRoute>
            <CreateAddress />
          </ProtectedRoute>
        } />
        <Route path="/select-address" element={
          <ProtectedRoute>
            <SelectAddress />
          </ProtectedRoute>
        } />
        <Route path="/order-confirmation" element={
          <ProtectedRoute>
            <OrderConfirmation />
          </ProtectedRoute>
        } />
        <Route path="/myorders" element={
          <ProtectedRoute>
            <MyOrdersPage />
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  )
}

export default App