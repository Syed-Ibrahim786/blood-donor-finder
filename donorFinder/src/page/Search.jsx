
import LocationGetter, { cityGetter } from "@/services/LocationGetter";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppContext from "@/context/AppContext";
import SendAlert from "@/components/SendAlert";
import SlidingMenu from "@/component/sliding-menu/SlidingMenu";
import { AnimatePresence, motion } from "framer-motion";

import cancel from "../assets/cancel.png";
// import { socket } from './DonorDashboard'
import io from 'socket.io-client'


export default function Search() {
  const {
    selectedDonor,
    bloodGroup,
    setBloodGroup,
    setSelectedDonor,
    alertToggle,
    closeAlert,
    openAlert,
    setAlertToggle,
  } = useContext(AppContext);

  const [allState, setAllState] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [city, setCity] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  // const[bloodGroup, setBloodGroup] = useState('')
  const [donors, setDonors] = useState([]);
  const [selectedDonors, setSelectedDonors] = useState([])
  const [alertStatus,setAlertStatus] = useState("progress");

  const navigate = useNavigate();

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  const dropdownStyle = "bg-white rounded p-2 w-[200px] max-w-full truncate ";
  const inputStyle = 'border-1 border-black block w-full h-10 my-2 px-4';
  const loadState = () => {
    setAllState(LocationGetter());
  };


  
const token = localStorage.getItem("AuthToken");
    if(!token){
      navigate('/login')
    }

  const socket = io("https://bloodnet-du9t.onrender.com",
    {
      auth:{
        token
      }
    }
  )




  useEffect(() => {
    setCity(cityGetter(selectedState));
    console.log(allState);
  }, [selectedState]);

  async function handleSubmit() {
    const token = localStorage.getItem("AuthToken");
    if (!token) {
      navigate("/login");
    }
    try {
      const res = await fetch(
        `https://bloodnet-du9t.onrender.com/search?city=${
          selectedState + "," + selectedCity
        }&bloodGroup=${encodeURIComponent(bloodGroup)}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      setDonors(data);
    } catch (e) {
      console.log(e);
    }
  }

  const selectUser = (donor) => {
    const phone = donor.phone;

    setSelectedDonor((prev) => {
      if (prev.includes(phone)) {
        return prev.filter((p) => p !== phone);
      } else {
        return [...prev, phone];
      }
    });
  };

  console.log(selectedDonor);

  console.log(donors);


  useEffect(() => {
    
    console.log("token exist")

    
//  if (!token) return;///////////////  should call /refresh-token right?///////
   
     socket.on('connect', () => {
            console.log('Connected with socket ID:', socket.id); // Access the socket ID
        });
         console.log("connect socket works")
        
    socket.emit("register", {token, id:socket.id})
     console.log("register works")
  },[])
  useEffect(()=>{
    setCity(cityGetter(selectedState))
    console.log(allState)
  },[selectedState])


 console.log(selectedDonors)


 function selectDonors(e){
  const userId = e.target.parentNode.getAttribute("userid")
  console.log(userId)

  if(e.target.parentNode.classList.contains("border-2")){

    e.target.parentNode.className = "border-t text-[10px] md:text-sm" 
    
    const currentSelectedDonors = selectedDonors.filter((eachDonor) => eachDonor !== userId)
    setSelectedDonors(currentSelectedDonors)

  }else{

    e.target.parentNode.className = "text-[10px] md:text-sm border-2 border-red-400 rounded-3xl"
    
    setSelectedDonors([...selectedDonors, e.target.parentNode.getAttribute("userid")])
  }
 }

async function alertDonor(){
  const hospitalName = document.querySelector("#hospitalInput").value
  console.log(hospitalName) 
  const phone = document.querySelector("#phoneInput").value
  const city = document.querySelector("#cityInput").value
  const token = localStorage.getItem("AuthToken");
  if(!token){
    navigate('/login')
  }
  try{
    const res = await fetch("https://bloodnet-du9t.onrender.com/alertDonor",
    {
      method:"POST",
      headers: {
      "Content-Type": "application/json" ,
      authorization:`Bearer ${token}`
    },
      body:JSON.stringify({
        selectedDonors,
        bloodGroup,
        hospitalName,
        city,
        phone
      })
    }
  )
  if(res.status === 201){
    console.log("alert created")
    setAlertStatus("Succesfully alerted\npatient may recover soon!")
  }
  }catch(e){
    setAlertStatus(e.message);
    console.log("error in creating alert",e)
  }

  
  socket.emit("alert donors", {
        selectedDonors,
        bloodGroup,
        hospitalName,
        city,
        phone
      })
 }

  return (
    <>
      <SlidingMenu />
      <div className="max-w-7xl mx-auto">
        <div className="text-black rounded-xl items-center bg-white my-5 shadow-xl p-8 flex justify-between flex-col lg:flex-row">
          <h2 className=" text-[#6e6e6e] text-2xl">
            You can now Search Alert Donors
          </h2>
          {/* <input className='input rounded-2xl bg-white px-5 border-blue-400 border-2 cursor-pointer hover:border-blue-600 w-[200px] h-[50px]' type='text' placeholder='thandalam,chennai'/> */}
          <div className=" flex-col md:flex-row flex gap-2 items-center">
            <select
              className={dropdownStyle}
              onClick={loadState}
              onChange={(e) => {
                setSelectedState(e.target.value);
              }}
            >
              <option className=" truncate" value="" hidden>
                select state
              </option>
              {allState &&
                allState?.map((eachState, index) => (
                  <option
                    className=" max-w-[100px] truncate"
                    code={eachState.isoCode}
                    key={index}
                  >
                    {eachState.name}
                  </option>
                ))}
            </select>

            <select
              className={dropdownStyle}
              onChange={(e) => {
                setSelectedCity(e.target.value);
              }}
            >
              <option value="" hidden>
                select city
              </option>
              {city &&
                city.map((eachCity, index) => {
                  return <option key={index}>{eachCity.name}</option>;
                })}
            </select>


            <select
              className={dropdownStyle}
              onChange={(e) => {
                setBloodGroup(e.target.value);
              }}
            >
              <option value="">select blood Group</option>
              {bloodGroups &&
                bloodGroups.map((blood, index) => (
                  <option key={index}>{blood}</option>
                ))}
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
              {donors.length > 0 && donors.map((donor, index) => {
                
                return (
                  <tr key={index} userId={donor._id}   onClick={selectDonors} className="border-t text-[10px] md:text-sm ">
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
<button onClick={(e) => {
  if(selectedDonors.length == 0) return;
  e.target.nextElementSibling.className += "block"
}} className=' bg-orange-600 p-4 rounded-2xl text-black shadow-red-600 shadow-2xl absolute bottom-20 right-10' title='donor alerting button'>Alert</button>
<form onSubmit={(e) => {
  e.preventDefault()
  alertDonor()


}} title='extra information for donor to arrive' className='bg-white shadow-xl w-[90%] p-10 rounded-2xl absolute top-[20%] left-5.5 hidden'>
  <img className="h-6 float-right rounded-2xl border-2 border-gray-600" src={cancel} alt="cancel button click to goback and select donors" onClick={(e) => {


    e.target.parentNode.className = "bg-white shadow-xl w-[90%] p-10 rounded-2xl absolute top-[20%] left-5.5 hidden"
  }} />
  <label htmlFor="phoneInput">Enter Phone Number<p className='text-[10px]'>Donor will contact from this and confirm</p></label>
  <input required type="number" id='phoneInput' className={inputStyle}/>
  <label htmlFor="cityInput">Enter your City<p className='text-[10px]'>enter where you are requesting from</p></label>
  <input required type="text" id='cityInput' className={inputStyle}/>
  <label htmlFor="hospitalInput">Enter Hospital name<p className='text-[10px]'>where donor can donate</p></label>
  <input required type="text" id='hospitalInput' className={inputStyle}/>
  <button type='submit' className='bg-orange-500 p-2 rounded-2xl text-white block w-[110px]' title='alert confirmation'>Alert Donors</button>
  {alertStatus.length > 0 && alertStatus}
</form>
  </div>
  </>
  )
}

