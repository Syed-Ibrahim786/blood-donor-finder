import React from 'react'
import axios from "axios"

function LoginReq(data) {

    if(data){
    console.log(data)
    const cred = {"email":data.email , "password":data.password}
       return axios.post("http://localhost:8000/login" , cred)
    }

  return (
    <></>
  )
}

export default LoginReq