import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import ProductList from './components/ProductList'
import ProductForm from './components/ProductForm'
import HomePage from './components/HomePage'
import NavBar from './components/NavBar'
import AdminDashboard from './components/AdminDashboard'
import ProductDetails from './components/ProductDetails'
import PaymentPage from './components/PaymentPage'
import ShippingPage from './components/ShippingPage'

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
            <Route path="/navbar" element={<NavBar />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/payment/:id" element={<PaymentPage />} />
            <Route path="/shipping/:id" element={< ShippingPage/>} />
          </Routes>
        </Router>
      </div>
    </>
  )
}

export default App
