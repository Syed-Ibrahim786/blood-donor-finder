import React, { useContext, useState } from 'react'
import './Login.css'
import { NavLink } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import LoginReq from '../../../services/LoginReq'
import LoginRegisterPopup from '../../../component/LoginRegisterPopup'
import { useEffect } from 'react'
import AppContext from '../../../context/AppContext'
import { useNavigate } from 'react-router-dom'


const active = 'font-semibold bg-[#c2c2c2] px-5 rounded-2xl text-red-500 transition:all text-white duration-300 ease-in-out cursor-pointer '

const inActive = 'font-semi-bold transition:all text-black duration-300 ease-in-out border-1 px-5 rounded-xl' 





const Login = () => {

  const navigate = useNavigate()

  const {setLoginState} = useContext(AppContext)

  const [message , setMessage] = useState()


  const storeToken = (token) => {
    localStorage.setItem("AuthToken",token)
    
  }


  const handleSubmit = (data) => {

  
   LoginReq(data)
   .then(res => {
      console.log(res.data.message)
      setMessage(res.data.message)
      if(res.status === 200){
        storeToken(res.data.token)
        setLoginState(true)

        navigate('/search' ,{replace:true})

      }
   }
  )
  .catch(err=>{
    console.log(err.response.data.message);
    setMessage(err.response.data.message)
    
  })
    
}


const [credentials , setCredentials] = useState()

const initiateCreds = (e) => {
e.preventDefault()

  let passInp = e.target.password.value;
  let emailInp = e.target.email.value;

const cred = {
  "name":emailInp,
  "password":passInp
}

setCredentials(cred)
handleSubmit(cred)


}

useEffect(() => {
  if (message) {
    const timer = setTimeout(() => {
      setMessage("");
    }, 4000);

    return () => clearTimeout(timer); // ✅ cleanup
  }
}, [message]);



  return (

    <>
    <AnimatePresence>
    {message && <LoginRegisterPopup message={message}/>}
    </AnimatePresence>

    <div className=' max-w-7xl h-screen flex  justify-center mx-auto'>
      <div className='p-5 border-1 mt-50 w-fit h-fit rounded-2xl shadow-md text-white box'>
        <div className='flex justify-center gap-10'>
      <NavLink to="/login" className={({isActive})=> isActive? active : inActive}>Login</NavLink>
      <NavLink to="/register" className={({isActive})=> isActive? active : inActive}>Register</NavLink>

    </div>
      <div className="login-card text-center">
        <form onSubmit={(e)=>{initiateCreds(e)}}>
        <div className='inline-flex flex-col gap-3 text-center p-5'>
          {/* <input name='name' placeholder='Enter your username' className='outline-0 border-b-1 text-black p-2 transition:all hover:border-b-2 duration-100 ease-in-out'/> */}
          <input name='email' placeholder='Enter your email' className='outline-0 border-b-1 text-black p-2 transition:all hover:border-b-2 duration-100 ease-in-out'/>
          <input name='password' placeholder='Enter your password' className='outline-0 border-b-1 text-black p-2 transition:all hover:border-b-2 duration-100 ease-in-out'/>
        </div>
        <div>
          <button className='text-white font-semibold bg-red-500 rounded-2xl p-2 px-5 transition:all hover:bg-red-600 duration-200 ease-in-out'> Login </button>
        </div>
        </form>
        <div className='pt-5 text-black'>
          <p>New user ? <NavLink className="underline" to="/register">Create an account</NavLink></p>
        </div>
      </div>
      </div>
    </div>

    </>
  )
}

export default Login
