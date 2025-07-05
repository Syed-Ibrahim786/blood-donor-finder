import React from 'react'
import './Home.css'

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
    <div className='donor-card-container'>
      { donors.map((donor,index) => { return(

        <div key={index} className='donor-card'>
        <p className='donor-name'>{donor.name}</p>
        <div className='extra-info'>
            <p className='city'>{`city : ${donor.city}`}</p>
            <p className='blood-group'>{`blood group : ${donor.bloodgroup}`}</p>
        </div>
      </div>

      )}) }
      
    </div>
  )
}

export default Home
