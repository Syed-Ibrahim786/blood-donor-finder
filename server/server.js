// console.log("bismillah")
import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import authRoute from './route/authRoute.js'
import cors from "cors"

dotenv.config()


const port = process.env.PORT
const app = express()
app.use(express.json())
app.use(cors());
app.use('/',authRoute)












mongoose.connect(process.env.MONGODB_URL)
.then(() => {console.log("MongoDB connected!!!")})
.then(()=>{
    app.listen(port,() => {console.log(`server running on port ${port}`)})
})