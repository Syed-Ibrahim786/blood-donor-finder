import React from 'react'
import NavBar from '../component/NavBar/NavBar'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
  return (
    <div className='container max-w-7xl mx-auto'>
        <NavBar/>
        <Outlet/>
    </div>
  )
}

export default MainLayout
