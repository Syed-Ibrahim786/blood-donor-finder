import React, { useContext } from 'react'
import AppContext from '../context/AppContext'
import { Navigate } from 'react-router-dom'

function AdminRoutes() {

    const {isAdmin} = useContext(AppContext)

  return (
    
        isAdmin?(<Outlets></Outlets>):<Navigate to="/admin/login" replace/>
    
)
}

export default AdminRoutes