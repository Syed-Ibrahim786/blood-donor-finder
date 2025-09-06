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
    <div className="min-h-full ">

      <SlidingMenu/>
      <div className='text-center max-w-7xl mx-auto'>

        <div className='flex justify-center gap-6 py-10 px-4'>
            <NavLink to="donor" className=" bg-[#c2c2c2] basis-1/2 md:basis-1/4 py-2 rounded-2xl uppercase">Donor dashboard</NavLink>
            <NavLink to="user" className="bg-[#c2c2c2] basis-1/2 md:basis-1/4 py-2  rounded-2xl uppercase">Requester dashboard</NavLink>
        </div>
        <div>

            <Outlet/>
        </div>
    </div>
    </div>
  )
}

export default Dashboard