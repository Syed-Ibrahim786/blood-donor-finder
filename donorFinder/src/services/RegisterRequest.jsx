import React from 'react'
import axios from 'axios'

function RegisterRequest(reqCreds) {


    if(reqCreds){

        const creds = {"name":reqCreds.name , "email":reqCreds.email , "bloodGroup":reqCreds.blood , "isDonor":reqCreds.donor ,"city":reqCreds.city , "password":reqCreds.password , "phone":reqCreds.phone}

       return axios.post("https://bloodnet-du9t.onrender.com/register" , creds)


    }


    
    



  return (
    <></>
  )
}

export default RegisterRequest