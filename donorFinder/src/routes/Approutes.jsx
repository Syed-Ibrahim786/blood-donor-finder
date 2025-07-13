import React, { useContext } from "react";
import { Router, Route, Routes, Navigate } from "react-router-dom";
import NavBar from "../component/NavBar/NavBar";
import MainLayout from "../layout/mainLayout";
import Home from "../page/Home/Home";
import Login from "../page/Home/Login/Login";
import Register from "../page/Home/Login/Register";
import { AnimatePresence, motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import Search from "../page/Search";
import AdminPanel from "../page/AdminPanel";
import ProtectedRoutes from "./ProtectedRoutes";
import AppContext from "../context/AppContext";
import App from "../App";
import AdminLogin from "../page/Home/Login/AdminLogin";
import AdminRoutes from "./AdminRoutes";
import Dashboard from "../page/Home/Dashboard";
import DonorDashboard from "../page/DonorDashboard";
import RequesterDashboard from "../page/RequesterDashboard";

function Approutes() {
  // UseLocal has the current location .. it is important for framer motion and other animation librariues to work while routing back to back from pages to pages

  const location = useLocation();

  const {LoginState} = useContext(AppContext)

  return (
    <>
      {/* AnimationPresence is a framer motion thing wrap this component around other  roters that you want to animate ..... mode= wait is for telling the roter to wait until the animation is finished */}

      {/* only pass location and pathname when you wants to animater b/w router */}

      <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
          <Route element={<ProtectedRoutes/>}>
            <Route path="/" element={<MainLayout />} />
            <Route index element={<Home />} />
            <Route path="/dashboard/" element={<Dashboard />}> 
            
              <Route path="donor" element={<DonorDashboard/>}/>
              <Route path="user" element={<RequesterDashboard/>}/>  
              {/* //changed from requester */}

            </Route>

            <Route />
          </Route>

          <Route
            path="/login"
            element={
              !LoginState? (
                <motion.div
                initial={{ opacity: 0, y: 30}}
                animate={{ opacity: 1, y: 0}}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {" "}
                <Login />
              </motion.div>
              ) : <Navigate to="/dashboard/donor" ></Navigate>
            }
          />

          <Route
            path="/register"
            element={
              !LoginState ? (
                <motion.div
                initial={{ opacity: 0, y: 30}}
                animate={{ opacity: 1, y: 0, x: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {" "}
                <Register />
              </motion.div>
              ) : <Navigate to="/dashboard/donor"></Navigate>
            }
          />

          <Route element={<AdminPanel/>}></Route>
          <Route path="/admin" element={<AdminLogin/>}></Route>

        </Routes>

        </AnimatePresence>
    </>
  );
}

export default Approutes;
