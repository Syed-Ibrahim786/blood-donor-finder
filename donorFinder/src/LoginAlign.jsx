import React from 'react'

const LoginAlign = () => {
  return (
    <div className='flex justify-center items-center  h-screen '>
<div className='flex text-white  '>
   <main className='bg-purple-600  w-[100%] rounded-lg  p-10   '>
    <h2 className='text-3xl  text-center mb-2 '>Welcome to Aline!</h2> 
    <p className=' text-center text-[12px]'>Please login to continue</p>
    <form>
        <input type="text" placeholder='Username or Email' className='border-b-1 mt-10 py-2 w-full'/>
        <input type="text" placeholder='Password' className='border-b-1 mt-5  py-2 w-full' />

    </form>

    <section className='flex justify-between mt-5'>
        <p className='text-[10px] sm:text-sm' title='click to create an account'>Create new account</p>
        <p className='text-[10px] text-right sm:text-sm ' title='click if you forgot password'>Forgot password?</p>
    </section>
    <button className='text-purple-600 bg-white text-xl font-medium w-30 h-10 rounded-lg ml-auto mr-auto block mt-10 '>Login</button>
    
   </main>
   <section className='relative '><button className='bg-purple-600 absolute translate-x-[-80%] sm:translate-x-[-35%] translate-y-[-50%] rotate-[-90deg] sm:rotate-[90deg] top-[50%] left-[50%] w-25 p-4  rounded-lg'>Sign Up</button></section>
   </div>
    </div>
    
  )
}

export default LoginAlign
