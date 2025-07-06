import React from 'react'
import NavBar from './component/NavBar/NavBar'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import MainLayout from './layout/mainLayout'
import Home from './page/Home/Home'
import Login from './page/Home/Login/Login'
import Approutes from './routes/Approutes'


const App = () => {
  return (
    <>
      <NavBar/>
      <Approutes/>

    </>
  )
}

export default App
