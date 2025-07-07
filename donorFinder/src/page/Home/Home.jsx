import React from 'react'
import './Home.css'
import { NavLink } from 'react-router-dom'

const Home = () => {
  const donors = [
    {name:"Syed Ibrahim",city:"chennai",bloodgroup:"O+"},
    {name:"Syed Ibrahim",city:"chennai",bloodgroup:"O+"},
    {name:"Syed Ibrahim",city:"chennai",bloodgroup:"O+"},
    {name:"Syed Ibrahim",city:"chennai",bloodgroup:"O+"},
    {name:"Syed Ibrahim",city:"chennai",bloodgroup:"O+"},
    {name:"Syed Ibrahim",city:"chennai",bloodgroup:"O+"},
    {name:"Syed Ibrahim",city:"chennai",bloodgroup:"O+"},
    {name:"Syed Ibrahim",city:"chennai",bloodgroup:"O+"},
    {name:"Syed Ibrahim",city:"chennai",bloodgroup:"O+"},
    {name:"Syed Ibrahim",city:"chennai",bloodgroup:"O+"},
    {name:"Syed Ibrahim",city:"chennai",bloodgroup:"O+"},
    {name:"Syed Ibrahim",city:"chennai",bloodgroup:"O+"},
    {name:"Syed Ibrahim",city:"chennai",bloodgroup:"O+"}
  ]
  return (
    // <div className='donor-card-container'>
    //   { donors.map((donor,index) => { return(

    //     <div key={index} className='donor-card'>
    //     <p className='donor-name'>{donor.name}</p>
    //     <div className='extra-info'>
    //         <p className='city'>{`city : ${donor.city}`}</p>
    //         <p className='blood-group'>{`blood group : ${donor.bloodgroup}`}</p>
    //     </div>
    //   </div>

    //   )}) }
      
    // </div>

    <div>
      <div>
        <div className='max-w-7xl mx-auto text-center h-screen ' >
         <div className='my-30 md:flex '>
           <div className='my-auto'>
            <h1 className='text-5xl font-bold'>Your one click can save a life </h1>
           <div >
            <NavLink className='mt-10 text-white font-bold bg-red-500 inline-block px-5 py-2 rounded-2xl' to="/search"> Donate Now </NavLink>
            </div>
           </div>
           <div>
            <img src='src//assets/blood-bag-donated-cute-cartoon-600nw-2293990295.webp'/>
           </div>
         </div>
          <ul className='flex flex-col gap-5 md:flex-row'>
            <li className='bg-red-500 w-50 h-40 rounded-2xl mx-auto flex align-middle'>
              <div className='text-white mx-auto my-auto text-center'>
                <h1 className="text-3xl font-bold">20+</h1>
                <h1 className="text-3xl font-bold">Donors</h1>
              </div>
            </li>
            <li className='bg-red-500  w-50 h-40 mx-auto rounded-2xl flex align-middle'>
              <div className='text-white mx-auto my-auto text-center'>
                <h1 className="text-3xl font-bold">20+</h1>
                <h1 className="text-3xl font-bold">Donors</h1>
              </div>
            </li>
            <li className='bg-red-500  w-50 h-40 mx-auto rounded-2xl flex align-middle'>
              <div className='text-white mx-auto my-auto text-center'>
                <h1 className="text-3xl font-bold">20+</h1>
                <h1 className="text-3xl font-bold">Donors</h1>
              </div>
            </li>
          </ul>
        </div>
          
      </div>
    </div>

  )
}

export default Home
