import React from 'react'
import '../NavBar/NavBar.css'
import { NavLink } from 'react-router-dom'
import { useLocation } from 'react-router-dom'


const NavBar = () => {

  const location = useLocation()

  const active = 'font-semibold text-white border-b-2 pb-1 text-red-500 '

  const inActive = 'font-semi-bold '


  return (
   
      <div className='text-white p-5 bg-gradient-to-r from-red-500 to-red-400'>
        <nav className='max-w-7xl flex mx-auto justify-between '>
        <NavLink to="/" className=' transition-all hover:scale-105' >🩸FindBlood</NavLink>  
        <ul className='flex gap-6 items-center'>
            <li><NavLink className={({isActive}) => isActive?active:inActive} to="">Be Donor</NavLink></li>
            <li><NavLink className={({isActive}) => isActive?active:inActive} to="/search">Search Donor</NavLink></li>
            <li><NavLink className={
              location.pathname === '/login' || location.pathname === '/register'
            ?active:inActive} to="/login" >login/register</NavLink></li>
            <li><a href="" class="material-symbols-outlined">
                routine
                </a>
            </li>
        </ul>
      </nav>
      </div>
    
  )
}

export default NavBar
