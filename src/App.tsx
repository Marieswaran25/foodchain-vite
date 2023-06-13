// import { useState } from 'react'
import './App.css'
// import colors from './assets/theme/colors.module.scss'
import 'bootstrap/dist/css/bootstrap.min.css'
import SignupForm from './components/Registration'
import {BrowserRouter,Route,Routes}from 'react-router-dom'
import LoginForm from './components/Login'
function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<SignupForm />}></Route>
      <Route path="/login" element={<LoginForm />}></Route>
    </Routes>
  </BrowserRouter>
  )
}

export default App
