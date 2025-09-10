import React, { useContext } from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";
import AppContext from "../../context/AppContext";
import { makeDonor } from "../NavBar/NavBar";

function SlidingMenu() {
  const [menu, setMenu] = useState(false);
  const { name, setLoginState } = useContext(AppContext);

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
        <div className="flex flex-col gap-5 border-2 w-full ">
          <div className="h-25 w-25 bg-[#a8a8a8] border-2 rounded-full mt-5"></div>
          <div className="pb-5 shadow-xl ">{name}</div>
       </div>

        <div className="flex flex-col h-full justify-between items-start m-5 ">
          <div className="flex flex-col items-start gap-3">
            <NavLink to="/dashboard/user" className="font-semibold">Home</NavLink>

            <NavLink to="edit" className="font-semibold">
              Edit Profile
            </NavLink>
            <NavLink
              to="becomedonor"
              onClick={() => makeDonor()}
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
