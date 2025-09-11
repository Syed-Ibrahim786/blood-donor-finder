import React, { lazy, Suspense, useContext } from "react";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import NavBar from "../component/NavBar/NavBar"; // ❌ do not lazy load
import MainLayout from "../layout/MainLayout";   // ❌ do not lazy load
import Login from "../page/Home/Login/Login";    // ❌ do not lazy load
import Register from "../page/Home/Login/Register"; // ❌ do not lazy load
import { AnimatePresence, motion } from "framer-motion";

import ProtectedRoutes from "./ProtectedRoutes";
import AppContext from "../context/AppContext";
import AdminRoutes from "./AdminRoutes";

// ✅ Lazy-loaded pages
const Home = lazy(() => import("../page/Home/Home"));
const Search = lazy(() => import("../page/Search"));
const AdminPanel = lazy(() => import("../page/AdminPanel"));
const Dashboard = lazy(() => import("../page/Home/Dashboard"));
const DonorDashboard = lazy(() => import("../page/DonorDashboard"));
const RequesterDashboard = lazy(() => import("../page/RequesterDashboard"));
const BecomeDonorButton = lazy(() => import("@/page/BecomeDonor"));
const EditProfile = lazy(() => import("@/page/EditProfile"));
const Feedback = lazy(() => import("@/page/FeedbackRating"));
const AdminLogin = lazy(() => import("../page/Home/Login/AdminLogin"));

function Approutes() {
  const location = useLocation();
  const { role, LoginState } = useContext(AppContext);

  return (
    <AnimatePresence mode="wait">
      {/* Wrap everything with Suspense to show fallback while loading */}
      <Suspense fallback={<div className="text-center p-5">Loading...</div>}>
        <Routes location={location} key={location.pathname}>
          <Route element={<ProtectedRoutes />}>
            <Route path="/" element={<MainLayout />} />
            <Route index element={<Home />} />
            <Route path="/dashboard/" element={<Dashboard />}>
              <Route path="donor" element={<DonorDashboard />} />
              <Route path="user" element={<RequesterDashboard />} />
              <Route path="becomedonor" element={<BecomeDonorButton />} />
              <Route path="edit" element={<EditProfile />} />
              <Route path="feedback" element={<Feedback />} />
            </Route>

            <Route path="/find-donors" element={<Search />} />
          </Route>

          {/* Login Page (not lazy loaded) */}
          <Route
            path="/login"
            element={
              !LoginState ? (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Login />
                </motion.div>
              ) : (
                <Navigate to={`/dashboard/${role}`} />
              )
            }
          />

          {/* Register Page (not lazy loaded) */}
          <Route
            path="/register"
            element={
              !LoginState ? (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Register />
                </motion.div>
              ) : (
                <Navigate to="/dashboard/donor" />
              )
            }
          />

          {/* Admin Routes */}
          <Route path="/dashboard/admin" element={<AdminPanel />} />
          <Route path="/admin" element={<AdminLogin />} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
}

export default Approutes;
