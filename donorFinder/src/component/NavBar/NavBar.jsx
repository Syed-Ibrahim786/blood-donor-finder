import React, { useContext } from 'react'
import '../NavBar/NavBar.css'
import { NavLink } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { Divide as Hamburger } from 'hamburger-react'
import { useState } from 'react'
import AppContext from '../../context/AppContext'


const NavBar = () => {

  const {LoginState , setLoginState} = useContext(AppContext);


  const [isOpen, setOpen] = useState(true)

  // const [isOpen, setOpen] = useState(false)

  const location = useLocation()

  const active = 'font-semibold text-white border-b-2 pb-1 text-red-500 '

  const inActive = 'font-semi-bold '

  const signout = () => {
    setLoginState(false)
    localStorage.clear()
  }


  return (
   
      <div className='text-white p-5 shadow-2xl bg-white'>
        <nav className='max-w-7xl flex  mx-auto justify-between '>
       <div className='my-auto'>
         <NavLink to="/" className=' transition-all hover:scale-105' ><img className='w-30 md:w-50 ' src='/src/assets/BloodNet.svg' /></NavLink>
       </div>  
        {
          LoginState && (<ul className= {`flex items-center transition-all duration-300 ease-in-out`}>
           <li className='text-black'>Hello User</li>
         <NavLink to="/" className=' transition-all hover:scale-105' ><img className='w-50' src='/src/assets/BloodNet.svg' /></NavLink>
       </div>  
        {
          LoginState && (<ul className= {` ${isOpen ?"flex":"hidden translate-y-0"}
             transition-all duration-300 flex flex-col absolute right-0 top-21.5 h-screen p-5
              w-screen md:w-fit md:flex md:flex-row gap-6 md:static md:h-0  items-center
               bg-gradient-to-l from-red-400 to-red-500 md:bg-none z-10`}>
            <li><NavLink onClick={()=> {setOpen(false)}} className={({isActive}) => isActive?active:inActive} to="">Be Donor</NavLink></li>
            <li><NavLink onClick={()=> {setOpen(false)}} className={({isActive}) => isActive?active:inActive} to="/search">Search Donor</NavLink></li>

            <li><NavLink onClick={()=>{signout()}} className="bg-white text-red-500 px-5 py-3 rounded-xl">Sign Out</NavLink></li>
            
        </ul>)
        }
        {/* <div className='burger-btn blobk'>
          <Hamburger toggled={isOpen} toggle={setOpen} />
        </div> */}
      </nav>
      </div>
    
  )
}

export default NavBar
