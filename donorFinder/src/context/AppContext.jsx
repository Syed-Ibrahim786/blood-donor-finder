import React, { useContext, useState , useEffect} from 'react'
import { Children } from 'react'
import { createContext } from 'react'

import { useParams } from 'react-router-dom'


const AppContext = createContext()

export const ContextWrapper = ({children}) => {


    const [isAdmin , setIsAdmin] = useState(false);


    const [LoginState , setLoginState ] = useState(false)  
    const token = localStorage.getItem("AuthToken");
      useEffect(() => {
    const token = localStorage.getItem("AuthToken");
    if (token) {
      setLoginState(true);
    }
  }, []);


    // return (
    //     <AppContext.Provider value={{ LoginState , setLoginState , isAdmin , setIsAdmin}}>

    // console.log(LoginState  )
    // console.log(token);
    
    return (
        <AppContext.Provider value={{ LoginState , setLoginState }}>

            {children}
        </AppContext.Provider>
    )
}

export default AppContext

