import React, { useContext } from 'react'
import { Router ,Route, Routes, Outlet, useNavigate } from 'react-router-dom'
import AppContext from '../context/AppContext'
import { Navigate } from 'react-router-dom'

function ProtectedRoutes() {

  const {LoginState} = useContext(AppContext)

  return (
    
    LoginState? <Outlet/> : <Navigate to="/login" replace />


  )
}

export default ProtectedRoutes