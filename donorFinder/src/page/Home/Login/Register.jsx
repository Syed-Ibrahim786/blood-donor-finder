import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import axios from 'axios'
import { useEffect } from 'react'
import LocationGetter from '../../../services/LocationGetter'
import { cityGetter } from '../../../services/LocationGetter'
import {State ,City} from 'country-state-city'
import RegisterRequest from '../../../services/RegisterRequest'
import { Navigate } from 'react-router-dom'

function Register() {

const active = 'font-semibold bg-[#c2c2c2] px-5 rounded-2xl text-red-500 transition:all text-white duration-300 ease-in-out cursor-pointer '

const inActive = 'font-semi-bold transition:all text-black duration-300 ease-in-out border-1 px-5 rounded-xl' 

const bloodType = ["A+" , "A-" , "B+" , "B-" , "AB+" , "AB-", "O+" , "O-"]

const reg = {
  "name":"",
  "email":"",
  "blood":"",
  "city":"",
  "password":"",
  "donor":false,
  "phone":""

}
const [state , setState] = useState("")
const [city , setCity] = useState()
const [stateHolder , setStateHolder] = useState()



const handleSubmit = (e) => {


  e.preventDefault()


  const regDetails = ({...reg , ["name"]:e.target.name.value , ["email"]:e.target.email.value ,  ["blood"]:e.target.blood.value ,  ["city"]:`${e.target.state.value},${e.target.city.value}`,["password"]:e.target.password.value, ["donor"]:e.target.donor.checked , ["phone"]:Number(e.target.phone.value)})


    RegisterRequest(regDetails)
    .then(res=>{
      if(res.status===200){

      }
    }
    )
    .catch(err => {
      console.log(err)
    })

  

}

const testFn = (e) => {
  setState(e.target.value)
}

const loadState = () => {
  setStateHolder(LocationGetter())
}





useEffect(()=>{

setCity(cityGetter(state))
  

},[state])





  return (
    <div>

         <div className='h-screen max-w-7xl flex justify-center mx-auto text-black'>
      <div className='p-5 border-1 mt-30 w-fit h-fit rounded-2xl shadow-md transition-all duration-600 transform ease-in-out text-white box'>
        <div className='flex justify-center gap-10'>
      <NavLink to="/login" className={({isActive})=> isActive? active : inActive}>Login</NavLink>
      <NavLink to="/register" className={({isActive})=> isActive? active : inActive}>Register</NavLink>

    </div>
      <div className="login-card text-center text-black ">
      <form onSubmit={(e) => {handleSubmit(e)}}>
          <div className='inline-flex flex-col gap-3 text-center p-5'>

          <input name='name' placeholder='Enter your username' className='outline-0 border-b-1 p-2 transition:all hover:border-b-2 duration-100 ease-in-out'/>

          <input name='email' placeholder='Enter your email' className='outline-0 border-b-1 p-2 transition:all hover:border-b-2 duration-100 ease-in-out'/>

          <input name='phone' placeholder='Enter your Phone No' className='outline-0 border-b-1 p-2 transition:all hover:border-b-2 duration-100 ease-in-out'/>

          <select name='blood'  className='outline-0 border-b-1 p-2 transition:all hover:border-b-2 duration-100 ease-in-out' placeholder="select state">

          <option value=""  hidden> -- Select Blood type --</option>
            {
  
                bloodType.map((item , index)=>(
                  <option key={index}>{item}</option>
                ))

            }
          </select>

          <select name='state' onClick={()=>{loadState()}} onChange={(e)=>{testFn(e)}} className='outline-0 border-b-1 p-2 transition:all hover:border-b-2 duration-100 ease-in-out' placeholder="select state">

          <option value="" hidden> -- Select a state --</option>
            {
              stateHolder && (
                stateHolder.map((item)=>(
                <option code={item.isoCode} key={item.isoCode}>{item.name}</option>
              ))
              )
            }
          </select>

          <select name='city' className='outline-0 border-b-1 p-2 transition:all hover:border-b-2 duration-100 ease-in-out' placeholder="select state">

          <option value=""  hidden> -- Select city --</option>
            {
              city&&(
                city.map((item , index)=>(
                  <option key={index}>{item.name}</option>
                ))
              )
            }
          </select>

          <input type='password' name='password' placeholder='Enter your password' className='outline-0 border-b-1 p-2 transition:all hover:border-b-2 duration-100 ease-in-out'/>
          

              <input name='donor' type='checkbox' id='donorCheckBox'></input>
            <label htmlFor="donorCheckBox"> I'm willing to be a donor </label>


        </div>
                <div>
          <button className='text-white font-semibold bg-red-500 rounded-2xl p-2 px-5 transition:all hover:bg-red-600 duration-200 ease-in-out'> Register </button>
        </div>
      </form>

        <div className='pt-5 '>
          <p>already have an account? <NavLink className="underline" to="/login">Login</NavLink></p>
        </div>
      </div>
      </div>
    </div>

    </div>
  )
}

export default Register