import React from 'react'
import '../NavBar/NavBar.css'
import { Link } from 'react-router-dom'
const NavBar = () => {
  return (
   
      <nav>
        <h1 className='logo' >🩸FindBlood </h1>
        <ul className='links'>
            <li><Link to="">Be Donor</Link></li>
            <li><Link to="">Search Donor</Link></li>
            <li><Link to="/login">login/register</Link></li>
            <li><a href="" class="material-symbols-outlined">
                routine
                </a>
            </li>
        </ul>
      </nav>
    
  )
}

export default NavBar
