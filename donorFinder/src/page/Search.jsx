import LocationGetter, {cityGetter} from '@/services/LocationGetter'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Search() {
  const[allState, setAllState] = useState([])
  const[selectedState, setSelectedState] = useState('')
  const[city, setCity] = useState([])
  const[selectedCity, setSelectedCity] = useState('')
  const[bloodGroup, setBloodGroup] = useState('')
  const[donors, setDonors] = useState([])

  const navigate = useNavigate()

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]
  const dropdownStyle = 'bg-white rounded p-2 w-[200px] max-w-full truncate '
  
  const loadState = () =>{
    setAllState(LocationGetter())
  }

  useEffect(()=>{
    setCity(cityGetter(selectedState))
    console.log(allState)
  },[selectedState])

 async function handleSubmit(){
  const token = localStorage.getItem("AuthToken");
  if(!token){
    navigate('/login')
  }
  try{
    const res = await fetch(`http://localhost:8000/search?city=${selectedState + ',' + selectedCity}&bloodGroup=${bloodGroup}`,
    {
      headers:{
        authorization:`Bearer ${token}`
      }
    }
  );
  const data = await res.json();
  setDonors(data)
  }catch(e){
    console.log(e)
  }
  

 }
 console.log(donors)
  return (
    <div className=''>
    <div className=' bg-fuchsia-700 p-5 flex justify-between flex-col lg:flex-row'>
      <h2 className='  text-white text-2xl'>You can now Search Alert Donors</h2>
      {/* <input className='input rounded-2xl bg-white px-5 border-blue-400 border-2 cursor-pointer hover:border-blue-600 w-[200px] h-[50px]' type='text' placeholder='thandalam,chennai'/> */}
    <div className=' flex-col md:flex-row flex gap-2 mt-5 items-center'>
      <select className={dropdownStyle} onClick={loadState} onChange={(e)=>{setSelectedState(e.target.value)}}>
        <option className=' truncate' value="" hidden>select state</option>
        {  allState && (allState?.map((eachState,index) => (
          <option className=' max-w-[100px] truncate' code={eachState.isoCode} key={index}>{eachState.name}</option>
        )))
        }
      </select>

      <select className={dropdownStyle} onChange={(e)=>{setSelectedCity(e.target.value)}}>
        <option value="" hidden>select city</option>
        { city && (
          city.map((eachCity, index) => {
            return(
              <option key={index}>{eachCity.name}</option>
            )
          }))
        }
      </select>

      <select className={dropdownStyle} onChange={(e) =>{setBloodGroup(e.target.value)}}>
        <option value="">select blood Group</option>
        { bloodGroups && (
          bloodGroups.map((blood, index) => (
            <option key={index}>{blood}</option>
          ))
        ) }
      </select>

      <button onClick={handleSubmit} className=' bg-blue-700 md:w-25 w-[200px] p-2 text-white  rounded cursor-pointer active:bg-blue-800'>search</button>
    </div>
    
    </div>
    { !donors?<div className=' w-full h-100 flex justify-center items-center text-gray-200 text-5xl font-bold '>Find Donors</div>:(
      <div className=" mt-10 md:p-10">
          <table className=" w-full  border border-gray-300 shadow-md text-sm">
            <thead>
              <tr className="bg-fuchsia-950 text-white text-[10px] md:text-sm">
                <th className="p-2 text-left">Blood</th>
                <th className="p-2 text-left">Name</th>
                <th className="p-2 text-left">phone</th>
                <th className="p-2 text-left">city</th>
              </tr>
            </thead>
            <tbody>
              {donors.map((donor, index) => {
                
                return (
                  <tr key={index} className="border-t text-[10px] md:text-sm">
                    <td className="p-2">{donor.bloodGroup}</td>
                    <td className="p-2">{donor.name}</td>
                    <td className="p-2">{donor.phone}</td>
                    <td className="p-2">{donor.city}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
    ) }

  </div>
  )
}

export default Search