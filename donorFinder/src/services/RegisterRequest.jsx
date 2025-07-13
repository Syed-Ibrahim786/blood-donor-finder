import React from 'react'
import axios from 'axios'

function RegisterRequest(reqCreds) {


    if(reqCreds){

        const creds = {"name":reqCreds.name , "email":reqCreds.email , "bloodGroup":reqCreds.blood , "isDonor":reqCreds.donor ,"city":reqCreds.city , "password":reqCreds.password , "phone":reqCreds.phone}

       return axios.post("http://localhost:8000/register" , creds)


    }


    
    



  return (
    <></>
  )
}

export default RegisterRequest