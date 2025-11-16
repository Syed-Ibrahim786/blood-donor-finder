// console.log("bismillah")
import http, { createServer } from 'http'
// import {Server} from 'socket.io'
import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import authRoute from './route/authRoute.js'
import cors from "cors"
import jwt from 'jsonwebtoken'

import DonorAndBenficiary from './model/userModel.js'

dotenv.config() 


const port = process.env.PORT
const app = express()
const httpObject = createServer(app)

// const io = new Server(httpObject,{
//     cors:{
//         origin:"*"
//     } 
// })
app.use(express.json())
app.use(cors());
app.use('/',authRoute)

// io.use((socket, next) => {
//     const authToken = socket.handshake.auth.token
//     try{
//     const user = jwt.verify(authToken, process.env.JWT_SECRET)
//     socket.user = user
//     console.log("user added to socket")
//      next()
//     }catch(err){
//         if (err.name === "TokenExpiredError") {
//       return next(new Error("Token expired, please login again"));
//     }
//     return next(new Error("Authentication error"));
  
        
//     }
// })

// io.on("connection", (socket) => {
//     console.log("frontend connected!!")
//     socket.on("register", async() => {
//         try{
//             await DonorAndBenficiary.findByIdAndUpdate(socket.user.id, {
//                 socketId:socket.id
//             })
//             console.log("socketId added to db")
//         }catch(e){
//             console.log("error in adding socket to db", e)
//         }   
//     })

//     socket.onAny((event,...args) => {
//         console.log("recieved", event, args)
//     })

//     socket.on("alert donors", ({
//         selectedDonors,
//         bloodGroup,
//         hospitalName,
//         city,
//         phone}) => {
//         console.log("alert sent via socket",selectedDonors,socket.user.id)
//     })

//     socket.on("disconnect", async() => {
//         console.log(socket.user.name,"disconnected from server")
//         await DonorAndBenficiary.findByIdAndUpdate(socket.user.id, {
//             socketId:null
//         })
//     })

// })










mongoose.connect(process.env.MONGODB_URL)
.then(() => {console.log("MongoDB connected!!!")})
.then(()=>{
    // httpObject.listen(port, () => {console.log("socket server alive")})
    app.listen(port,() => {console.log(`server running on port ${port}`)})
}) 