import React, { useContext, useState , useEffect} from 'react'
import { Children } from 'react'
import { createContext } from 'react'
import { useParams } from 'react-router-dom'



const AppContext = createContext()

export const ContextWrapper = ({children}) => {

      const[selectedDonor , setSelectedDonor] = useState([])
    const [isAdmin , setIsAdmin] = useState(false);
    const[role,setRole] = useState("user")
     const [isDonor, setIsDonor] = useState(false);
    const[name, setName] = useState("")
    const [LoginState , setLoginState ] = useState(false)  
    const [userId , setUserId] = useState("")
    const [alertToggle , setAlertToggle] = useState(false)
      const[bloodGroup, setBloodGroup] = useState("")
    
    const token = localStorage.getItem("AuthToken");

    const closeAlert = () =>{
        setAlertToggle(false)
    }
    const openAlert = () =>{
        setAlertToggle(true)
    }


  //     useEffect(() => {
  //   const token = localStorage.getItem("AuthToken");
  //   if (token) {
  //     setLoginState(true);
  //   }
  // }, []);

//fixed



    

    return (
        <AppContext.Provider value={{ bloodGroup, setBloodGroup ,isDonor, setIsDonor, userId ,openAlert , closeAlert, setUserId , selectedDonor , setSelectedDonor , LoginState , setLoginState , alertToggle , setAlertToggle, isAdmin , setIsAdmin, role, setRole, setName, name}}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContext

