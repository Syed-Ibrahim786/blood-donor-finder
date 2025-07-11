import React from 'react'
import { NavLink } from 'react-router-dom'

function Register() {

const active = 'font-semibold bg-[#c2c2c2] px-5 rounded-2xl text-red-500 transition:all text-white duration-300 ease-in-out cursor-pointer '

const inActive = 'font-semi-bold transition:all text-black duration-300 ease-in-out border-1 px-5 rounded-xl' 


  return (
    <div>

         <div className='h-screen max-w-7xl flex justify-center mx-auto text-black'>
      <div className='p-5 border-1 mt-50 w-fit h-fit rounded-2xl shadow-md text-white box'>
        <div className='flex justify-center gap-10'>
      <NavLink to="/login" className={({isActive})=> isActive? active : inActive}>Login</NavLink>
      <NavLink to="/register" className={({isActive})=> isActive? active : inActive}>Register</NavLink>

    </div>
      <div className="login-card text-center text-black ">
        <div className='inline-flex flex-col gap-3 text-center p-5'>
          <input name='name' placeholder='Enter your username' className='outline-0 border-b-1 p-2 transition:all hover:border-b-2 duration-100 ease-in-out'/>
          <input name='email' placeholder='Enter your email' className='outline-0 border-b-1 p-2 transition:all hover:border-b-2 duration-100 ease-in-out'/>
          <input name='name' placeholder='Enter your Blood type' className='outline-0 border-b-1 p-2 transition:all hover:border-b-2 duration-100 ease-in-out'/>
          <input name='password' placeholder='Enter your password' className='outline-0 border-b-1 p-2 transition:all hover:border-b-2 duration-100 ease-in-out'/>
        </div>
        <div>
          <button className='text-white font-semibold bg-red-500 rounded-2xl p-2 px-5 transition:all hover:bg-red-600 duration-200 ease-in-out'> Register </button>
        </div>
        <div className='pt-5 '>
          <p>already have an account? <NavLink className="underline" to="/login">Login</NavLink></p>
        </div>
      </div>
      </div>
    </div>

    </div>
  )
}

export default Register