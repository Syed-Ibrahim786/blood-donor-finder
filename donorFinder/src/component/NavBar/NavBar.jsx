import React from 'react'
import '../NavBar/NavBar.css'
import { NavLink } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { Divide as Hamburger } from 'hamburger-react'
import { useState } from 'react'


const NavBar = () => {

  const [isOpen, setOpen] = useState(false)

  const location = useLocation()

  const active = 'font-semibold text-white border-b-2 pb-1 text-red-500 '

  const inActive = 'font-semi-bold '


  return (
   
      <div className='text-white p-5 bg-gradient-to-r from-red-500 to-red-400'>
        <nav className='max-w-7xl flex mx-auto justify-between '>
       <div className='my-auto'>
         <NavLink to="/" className=' transition-all hover:scale-105' >🩸FindBlood</NavLink>
       </div>  
        {
            <ul className= {` ${isOpen ?"flex":"hidden translate-y-0"} transition-all duration-300 flex flex-col absolute right-0 top-21.5 h-screen p-5 w-screen md:w-fit md:flex md:flex-row gap-6 md:static md:h-0  items-center bg-gradient-to-l from-red-400 to-red-500 md:bg-none z-10`}>
            <li><NavLink onClick={()=> {setOpen(false)}} className={({isActive}) => isActive?active:inActive} to="">Be Donor</NavLink></li>
            <li><NavLink onClick={()=> {setOpen(false)}} className={({isActive}) => isActive?active:inActive} to="/search">Search Donor</NavLink></li>
            <li><NavLink onClick={()=> {setOpen(false)}} className={
              location.pathname === '/login' || location.pathname === '/register'
            ?active:inActive} to="/login" >login/register</NavLink></li>
            {/* <li><a href="" class="material-symbols-outlined">
                routine
                </a>
            </li> */}
        </ul>

        }
        <div className='burger-btn blobk'>
          <Hamburger toggled={isOpen} toggle={setOpen} />
        </div>
      </nav>
      </div>
    
  )
}

export default NavBar
