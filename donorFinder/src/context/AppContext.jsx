import React, { useContext, useState , useEffect} from 'react'
import { Children } from 'react'
import { createContext } from 'react'
import { useParams } from 'react-router-dom'


const AppContext = createContext()

export const ContextWrapper = ({children}) => {

    const [isAdmin , setIsAdmin] = useState(false);
    const[role,setRole] = useState("user")
    const[name, setName] = useState("")
    const [LoginState , setLoginState ] = useState(false)  
    
    const token = localStorage.getItem("AuthToken");

  //     useEffect(() => {
  //   const token = localStorage.getItem("AuthToken");
  //   if (token) {
  //     setLoginState(true);
  //   }
  // }, []);

//fixed
    

    return (
        <AppContext.Provider value={{  LoginState , setLoginState , isAdmin , setIsAdmin, role, setRole, setName, name}}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContext

