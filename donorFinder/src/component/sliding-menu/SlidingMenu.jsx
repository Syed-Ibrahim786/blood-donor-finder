import React from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";

function SlidingMenu() {
  const [menu, setMenu] = useState(false);

  const handleToggle = () => {
    if (!menu) {
      setMenu(true);
    } else {
      setMenu(false);
    }
    console.log(menu);
  };

  const active = `translate-x-0`;
  const inActive = `translate-x-[-200px]`;

  return (
    <div
      className={`${
        menu ? active : inActive
      } text-center duration-300 ease-in-out   h-screen w-fit fixed flex`}
    >
      <div className="bg-white shadow-2xl flex">
        <div className="">
          <div className="">
            <div className="h-40 w-40 bg-[#a8a8a8]  rounded-full m-5"></div>
          <div className="pb-5 shadow-xl">Hello UserName</div>
          </div>

          <div className="flex flex-col justify-between items-start m-5 ">
            <div className="flex flex-col items-start gap-3">
              <NavLink className="font-semibold">All Donor</NavLink>
              <NavLink className="font-semibold">All Requester</NavLink>
            </div>
            {/* <div>
              <button className="">Sign Out</button>
            </div> */}
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
