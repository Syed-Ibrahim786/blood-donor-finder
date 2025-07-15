import React from 'react'
import DonorDashboard from '../DonorDashboard'
import RequesterDashboard from '../RequesterDashboard'
import { Navigate, Outlet } from 'react-router-dom'
import { NavLink, Routes } from 'react-router-dom'
import { Route } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import SlidingMenu from '../../component/sliding-menu/SlidingMenu'

function Dashboard() {

const location = useLocation()
    console.log(location.pathname)

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-100 via-white to-rose-50 p-4">

      <SlidingMenu/>
      <div className='text-center max-w-7xl mx-auto'>

        <div className='flex justify-center gap-6 py-10 '>
            <NavLink to="donor" className="bg-[#c2c2c2] basis-1/2 md:basis-1/4 py-4 rounded-2xl">Donor</NavLink>
            <NavLink to="user" className="bg-[#c2c2c2] basis-1/2 md:basis-1/4 py-4 rounded-2xl">Requester</NavLink>
        </div>
        <div>

            <Outlet/>
        </div>
    </div>
    </div>
  )
}

export default Dashboard