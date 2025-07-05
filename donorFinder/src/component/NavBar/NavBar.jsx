import React from 'react'
import '../NavBar/NavBar.css'
const NavBar = () => {
  return (
   
      <nav>
        <h1 className='logo' >🩸FindBlood </h1>
        <ul className='links'>
            <li><a href="">Be Donor</a></li>
            <li><a href="">Search Donor</a></li>
            <li><a href="">login/register</a></li>
            <li><a href="" class="material-symbols-outlined">
                routine
                </a>
            </li>
        </ul>
      </nav>
    
  )
}

export default NavBar
