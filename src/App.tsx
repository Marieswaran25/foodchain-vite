// import { useState } from 'react'
import './App.css'
// import colors from './assets/theme/colors.module.scss'
import 'bootstrap/dist/css/bootstrap.min.css'
import SignupForm from './components/Registration'
import {BrowserRouter,Route,Routes}from 'react-router-dom'
import LoginForm from './components/Login'
import LandingPage from './components/LandingPage'
import CheckoutPage from './components/CheckoutPage'
import Cart from './components/Cart'
import OrderConfirmation from './components/OrderConfirmation'
function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<SignupForm />}></Route>
      <Route path="/login" element={<LoginForm />}></Route>
      <Route path='/hotels' element={<LandingPage />}></Route>
      <Route path='hotels/:hotelname' element={<CheckoutPage />}></Route>
      <Route path='/cart' element={<Cart />}></Route>
      <Route path='/order-success' element={<OrderConfirmation />}></Route>
    </Routes>
  </BrowserRouter>
  )
}

export default App
