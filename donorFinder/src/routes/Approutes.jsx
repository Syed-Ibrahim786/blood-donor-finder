import React from 'react'
import { Router ,Route, Routes } from 'react-router-dom'
import NavBar from '../component/NavBar/NavBar'
import MainLayout from '../layout/mainLayout'
import Home from '../page/Home/Home'
import Login from '../page/Home/Login/Login'
import Register from '../page/Home/Login/Register'
import { AnimatePresence , motion } from 'framer-motion'
import { useLocation } from 'react-router-dom'


function Approutes() {

    const location = useLocation()

  return (
    <>

        <AnimatePresence mode='wait'>

            <Routes location={location} key={location.pathname}>

            <Route path='/' element={<MainLayout/>}/>
            <Route index element={<Home/>}/>


            <Route path='/login' element={  <motion.div
            
            initial={{opacity:0, y:30}}
            animate={{opacity:1,y: 0}}
            exit={{opacity:0}}
            transition={{duration:0.3}}
            
            > <Login/></motion.div>}/>


            <Route path='/register' element={  <motion.div
            
            initial={{opacity:0, y:30 }}
            animate={{opacity:1,y:0}}
            exit={{opacity:0}}
            transition={{duration:0.3}}
            
            > <Register/></motion.div>}/>

        </Routes>

        </AnimatePresence>
    </>
  )
}

export default Approutes