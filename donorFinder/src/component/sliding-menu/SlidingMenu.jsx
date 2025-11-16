import React, { useContext } from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";
import AppContext from "../../context/AppContext";
// import { makeDonor } from "../NavBar/NavBar";

function SlidingMenu() {
  const [menu, setMenu] = useState(false);
  const { setLoginState } = useContext(AppContext);
  const name = localStorage.getItem("name") !== null? localStorage.getItem("name"):"";
  const role = localStorage.getItem("role") !== null> 0? localStorage.getItem("role"):"";

  const handleToggle = () => {
    if (!menu) {
      setMenu(true);
    } else {
      setMenu(false);
    }
    console.log(menu);
  };

  const signout = () => {
    setLoginState(false);
    localStorage.clear();
  };

  const active = `translate-x-0`;
  const inActive = `translate-x-[-200px]`;

  return (
    <div
      className={`${
        menu ? active : inActive
      } text-center duration-300 ease-in-out h-full w-fit z-10 fixed top-0 flex`}
    >
      <div className="bg-white shadow-2xl  flex flex-col">
        <div className="flex flex-row justify-evenly gap-2 w-full h-40 ">
          <div className=" flex items-center">
            <div className="h-18 w-18 bg-blue-400  rounded-xl  text-6xl   text-white lowercase italic">{name.substring(0,1)}</div>
          </div>
          <div className=" flex flex-col justify-center"><b>{name}</b><p>{role}</p></div>
        </div>

        <div className="flex flex-col h-full justify-between items-start m-6">
          <div className="flex flex-col items-start gap-3">
            <NavLink to="/dashboard/user" className="font-semibold">Home</NavLink>

            <NavLink to="edit" className="font-semibold">
              Edit Profile
            </NavLink>
            <NavLink
              to="becomedonor"
              
              className="font-semibold"
            >
              Become Donor
            </NavLink>
          </div>
          <div className="flex flex-col items-start gap-3">
            <NavLink to="feedback" className="font-semibold">
              Feedback and rating
            </NavLink>
            <NavLink
              onClick={() => {
                signout();
              }}
              className="text-red-500  "
            >
              Sign Out
            </NavLink>
          </div>
        </div>
      </div>
      <div className="bg-transparent my-auto">
        <button
          onClick={handleToggle}
          className="bg-white rounded-tr-lg rounded-br-lg cursor-pointer shadow-xl p-3 "
        >
          <div
            className={`${
              menu ? "rotate-0" : "rotate-180"
            } duration-800 ease-in-out`}
          >
            <FontAwesomeIcon icon={faCaretRight} />
          </div>
        </button>
      </div>
    </div>
  );
}

export default SlidingMenu;
