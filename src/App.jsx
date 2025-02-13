import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import RegisterScreen from './screens/RegisterScreen'
import LoginScreen from './screens/LoginScreen'
import ProtectedRoute from './componentes/ProtectedRoute'
import HomeScreen from './screens/HomeScreen'
import "./styles/appStyle.css"





const App = () => {
  
  return (
    <div>
      <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/register" element={<RegisterScreen/>} />
        <Route path="/login" element={<LoginScreen />} />
         <Route element={<ProtectedRoute/>}>
          <Route path="/home" element={<HomeScreen />} />
        </Route> 
      </Routes>
    </div>
  )
}
export default App
