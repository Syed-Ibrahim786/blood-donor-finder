import React, { useContext, useLayoutEffect } from 'react'
import { Router ,Route, Routes, Outlet, useNavigate } from 'react-router-dom'
import AppContext from '../context/AppContext'
import { Navigate } from 'react-router-dom'

function ProtectedRoutes() {

  const AuthToken = localStorage.getItem("AuthToken")
  const {setLoginState} = useContext(AppContext)
  useLayoutEffect( () => {
    async function verify(){
const res = await fetch("https://bloodnet-du9t.onrender.com/verify",
      {
        method:"GET",
        headers:{
          authorization:`Bearer ${AuthToken}`
        }
      }
    )
    const data = await res.json()
    if(res.ok){
      setLoginState(true)
    }
    }

    verify()
    
    
  },[])

  const {LoginState} = useContext(AppContext)

  return (
    
    LoginState? <Outlet/> : <Navigate to="/login" replace />


  )
}

export default ProtectedRoutes