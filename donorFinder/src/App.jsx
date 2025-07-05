import React from 'react'
import NavBar from './component/NavBar/NavBar'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import MainLayout from './layout/mainLayout'
import Home from './page/Home/Home'
const App = () => {
  return (
    <>
    
    <BrowserRouter>
    
    <Routes>
      <Route path='/' element={<MainLayout/>}>
      <Route index element={<Home/>}/>
      </Route>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
