import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        select:false
    },
    password:{
        type:String,
        require:true,
        select:false
    },
    phone:{
        type:String
    },
    city:{
        type:String
    },
    bloodGroup:{
        type:String
    },
    isDonor:{
        type:Boolean,
        default:false
    }
})

const DonorAndBenficiary = mongoose.model('DonorAndBenficiary',userSchema)
export default DonorAndBenficiary