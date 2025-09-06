import React, { useContext } from "react";
import "../NavBar/NavBar.css";
import { Link, NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Divide as Hamburger } from "hamburger-react";
import { useState, useRef } from "react";
import AppContext from "../../context/AppContext";

export async function makeDonor(successPopup, successpopupMessage, setIsDonor) {
  
  const res = await fetch("http://localhost:8000/donor/register", {
    method: "PUT",
    headers: {
      authorization: `Bearer ${localStorage.getItem("AuthToken")}`,
    },
  });
  console.log(res);
  if (res.status === 204) {
    successPopup.current.className =
      "w-full h-[100vh] flex justify-center fixed top-0 left-0 bg-black opacity-[0.7] z-20";
    successpopupMessage.current.className =
      "w-100 h-50  bg-white text-lg py-20 text-center opacity-[1.0] border-2 rounded-2xl  transition-all duration-600 transform ease-in-out  box";
    setTimeout(() => {
      successPopup.current.className = "hidden";
      successpopupMessage.current.className = "";

      setIsDonor(true);
    }, 2000);
  }
  return;
}

const NavBar = () => {
  const { LoginState, name, setLoginState } = useContext(AppContext);

  const [isOpen, setOpen] = useState(true);

  const successPopup = useRef();
  const successpopupMessage = useRef();
  const location = useLocation();

  const { setIsDonor } = useContext(AppContext);

  const active = "font-semibold text-white border-b-2 pb-1 text-red-500 ";

  const inActive = "font-semi-bold ";

  return (
    <div className="text-white p-5  shadow-2xl bg-transparent">
      <div ref={successPopup} className="hidden">
        <h2 ref={successpopupMessage} className="">
          REGISTERED SUCCESSFULLY!
        </h2>
      </div>
      <nav className="max-w-7xl flex  mx-auto justify-between ">
        <div className="my-auto">
          <NavLink
            to="/dashboard/donor"
            className=" transition-all hover:scale-105"
          >
            <img className="w-30 md:w-50 " src="/src/assets/BloodNet.svg" />
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
