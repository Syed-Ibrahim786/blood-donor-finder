import React, { useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import LocationGetter from "../../../services/LocationGetter";
import { cityGetter } from "../../../services/LocationGetter";
import { State, City } from "country-state-city";
import RegisterRequest from "../../../services/RegisterRequest";
import { Navigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const active =
    "font-semibold bg-[#c2c2c2] px-5 rounded-2xl text-red-500 transition:all text-white duration-300 ease-in-out cursor-pointer ";

  const inActive =
    "font-semi-bold transition:all text-black duration-300 ease-in-out border-1 px-5 rounded-xl";

  const bloodType = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  const reg = {
    name: "",
    email: "",
    blood: "",
    city: "",
    password: "",
    donor: false,
    phone: "",
  };
  const [loadingMessage, setLoadingMessage] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState();
  const [stateHolder, setStateHolder] = useState();
  const successPopup = useRef();
  const successpopupMessage = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoadingMessage("signing in..."); //can come like popup

    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(e.target.newEmail.value)) {
      setLoadingMessage("INVALID EMAIL FORMAT");
      return;
    }
    // if(!/^[0-9]{10}$/.test(e.target.phone.value)){
    //   setLoadingMessage("")
    // }

    const regDetails = {
      ...reg,
      ["name"]: e.target.newName.value,
      ["email"]: e.target.newEmail.value,
      ["blood"]: e.target.blood.value,
      ["city"]: `${e.target.state.value},${e.target.city.value}`,
      ["password"]: e.target.newPassword.value,
      ["donor"]: e.target.donor.checked,
      ["phone"]: Number(e.target.phone.value),
    };

    RegisterRequest(regDetails)
      .then((res) => {
        if (res.status === 201) {
          console.log(res);
          setLoadingMessage("");
          successPopup.current.className =
            "w-full h-[100vh] flex justify-center  absolute bg-black opacity-[0.7] z-20";
          successpopupMessage.current.className =
            "w-100 h-50  bg-white text-lg py-20 text-center border-2 rounded-2xl  transition-all duration-600 transform ease-in-out  box";
          setTimeout(() => {
            successPopup.current.className = "hidden";
            successpopupMessage.current.className = "";

            navigate("/login");
          }, 2000);
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 401) {
          setLoadingMessage("Email already exist");
        }
      });
  };

  const testFn = (e) => {
    setState(e.target.value);
  };

  const loadState = () => {
    setStateHolder(LocationGetter());
  };

  useEffect(() => {
    setCity(cityGetter(state));
  }, [state]);

  return (
    <div>
      <div ref={successPopup} className="hidden">
        <h2 ref={successpopupMessage} className="">
          REGISTERED SUCCESSFULLY!
        </h2>
      </div>
      <div className="h-screen   max-w-7xl flex justify-center mx-auto text-black">
        <div className="p-5   border-1 mt-15  w-[90%] h-fit rounded-2xl shadow-md transition-all duration-600 transform ease-in-out  box">
          <div className="flex justify-center gap-10">
            <NavLink
              to="/login"
              className={({ isActive }) => (isActive ? active : inActive)}
            >
              Login
            </NavLink>
            <NavLink
              to="/register"
              className={({ isActive }) => (isActive ? active : inActive)}
            >
              Register
            </NavLink>
          </div>
          <div className="login-card text-center text-black ">
            <form
              autoComplete="off"
              onSubmit={(e) => {
                handleSubmit(e);
              }}
            >
              <div className="2xl:flex my-5 sm:flex-col">
                <div className="inline-flex flex-col gap-3 text-center p-5">
                  <input
                    required
                    autoFocus
                    name="newName"
                    type="text"
                    autoComplete="off"
                    placeholder="Enter your username"
                    className="outline-0 border-b-1 p-2 transition:all hover:border-b-2 duration-100 ease-in-out"
                  />

                  <input
                    required
                    title="enter like domainname@gmail.com"
                    name="newEmail"
                    autoComplete="off"
                    placeholder="Enter your email"
                    className="outline-0 border-b-1 p-2 transition:all hover:border-b-2 duration-100 ease-in-out"
                  />

                  <input
                    required
                    type="tel"
                    name="phone"
                    placeholder="Enter your Phone No"
                    className="outline-0 border-b-1 p-2 transition:all hover:border-b-2 duration-100 ease-in-out"
                  />
                </div>
                <div className="inline-flex flex-col gap-3 text-center ">
                  <select
                    required
                    name="blood"
                    className="  outline-0 border-b-1 p-2 transition:all hover:border-b-2 duration-100 ease-in-out"
                    placeholder="select state"
                  >
                    <option value="" hidden>
                      {" "}
                      -- Select Blood type --
                    </option>
                    {bloodType.map((item, index) => (
                      <option key={index}>{item}</option>
                    ))}
                  </select>

                  <select
                    required
                    name="state"
                    onClick={() => {
                      loadState();
                    }}
                    onChange={(e) => {
                      testFn(e);
                    }}
                    className="w-auto  outline-0 border-b-1 p-2 transition:all hover:border-b-2 duration-100 ease-in-out"
                    placeholder="select state"
                  >
                    <option className="w-full" value="" hidden>
                      {" "}
                      -- Select a state --
                    </option>
                    {stateHolder &&
                      stateHolder.map((item) => (
                        <option
                          className="w-full text-wrap"
                          code={item.isoCode}
                          key={item.isoCode}
                        >
                          {item.name}
                        </option>
                      ))}
                  </select>

                  <select
                    required
                    name="city"
                    className="outline-0 border-b-1 p-2 transition:all hover:border-b-2 duration-100 ease-in-out"
                    placeholder="select state"
                  >
                    <option value="" hidden>
                      {" "}
                      -- Select city --
                    </option>
                    {city &&
                      city.map((item, index) => (
                        <option key={index}>{item.name}</option>
                      ))}
                  </select>

                  <input
                    required
                    type="password"
                    name="newPassword"
                    autoComplete="new-password"
                    placeholder="Enter your password"
                    className="outline-0 border-b-1 p-2 transition:all hover:border-b-2 duration-100 ease-in-out"
                  />
                </div>
              </div>

              <div className=" my-5">
                <input name="donor" type="checkbox" id="donorCheckBox"></input>
                <label htmlFor="donorCheckBox">
                  {" "}
                  I'm willing to be a donor{" "}
                </label>
              </div>

              <div>
                <button className="text-white font-semibold bg-red-500 rounded-2xl p-2 px-5 transition:all hover:bg-red-300 duration-200 ease-in-out">
                  {" "}
                  Register{" "}
                </button>
                <p className=" font-light text-sm text-red-600">
                  {loadingMessage}
                </p>
              </div>
            </form>

            <div className="pt-5 ">
              <p>
                already have an account?{" "}
                <NavLink className="underline" to="/login">
                  Login
                </NavLink>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
