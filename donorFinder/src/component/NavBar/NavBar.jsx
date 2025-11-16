import React, { useContext } from "react";
import "../NavBar/NavBar.css";
import { Link, NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useState, useRef } from "react";
import AppContext from "../../context/AppContext";
import logo from "../../assets/BloodNet.svg";



const NavBar = () => {
  

  const [isOpen, setOpen] = useState(true);

  
  const location = useLocation();

  

  const active = "font-semibold text-white border-b-2 pb-1 text-red-500 ";

  const inActive = "font-semi-bold ";

  return (
    <div className="text-white p-5  shadow-2xl bg-transparent">
      
      <nav className="max-w-7xl flex  mx-auto justify-between ">
        <div className="my-auto">
          <NavLink
            to="/dashboard/donor"
            className=" transition-all hover:scale-105"
          >
            <img className="w-30 md:w-50 " src={logo} />
          </NavLink>
        </div>
        
          
          {
            <Link
              to="/find-donors"
              className="bg-red-600  hover:bg-red-700 text-[white] font-normal text-sm py-1 px-1 rounded-lg shadow"
            >
              Find Donors
            </Link>
          }
        
      </nav>
    </div>
  );
};

export default NavBar;
