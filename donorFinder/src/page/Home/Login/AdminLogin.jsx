import React from 'react'
import { useContext, useState } from 'react'
import './Login.css'
import { NavLink } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import LoginReq from '../../../services/LoginReq'
import LoginRegisterPopup from '../../../component/LoginRegisterPopup'
import { useEffect } from 'react'
import AppContext from '../../../context/AppContext'
import { useNavigate } from 'react-router-dom'

function AdminLogin() {
  return (
    <>


    <div className=' max-w-7xl h-screen flex  justify-center mx-auto'>
      <div className='p-5 border-1 mt-50 w-fit h-fit rounded-2xl shadow-md text-white box'>

      <div className="login-card text-center">
        <form >
        <div className='inline-flex flex-col gap-3 text-center p-5'>
          {/* <input name='name' placeholder='Enter your username' className='outline-0 border-b-1 text-black p-2 transition:all hover:border-b-2 duration-100 ease-in-out'/> */}
          <input name='email' placeholder='Enter your email' className='outline-0 border-b-1 text-black p-2 transition:all hover:border-b-2 duration-100 ease-in-out'/>
          <input name='password' placeholder='Enter your password' className='outline-0 border-b-1 text-black p-2 transition:all hover:border-b-2 duration-100 ease-in-out'/>
        </div>
        <div>
          <button className='text-white font-semibold bg-red-500 rounded-2xl p-2 px-5 transition:all hover:bg-red-600 duration-200 ease-in-out'> Login </button>
        </div>
        </form>

      </div>
      </div>
    </div>

    </>
  )
}

export default AdminLogin