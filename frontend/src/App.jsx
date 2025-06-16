import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import ProductList from './components/ProductList'
import ProductForm from './components/ProductForm'
import HomePage from './components/HomePage'
import Navbar from './components/NavBar'
import AdminDashboard from './components/AdminDashboard'
import ProductDetails from './components/ProductDetails'

function App() {
  

  return (
    <>
      <div>
        <Router>
        
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/productlist" element={<ProductList />} />
            <Route path="/productform" element={<ProductForm />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/navbar" element={<Navbar />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/product/:id" element={<ProductDetails />} />
          </Routes>
        </Router>
      </div>
    </>
  )
}

export default App
