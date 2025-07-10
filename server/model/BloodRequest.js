// import mongoose from 'mongoose'
// import DonorAndBenficiary from './userModel.js'

// const bloodRequestSchema = mongoose.Schema({
//     requester:{
//         type:mongoose.Schema.Types.ObjectId,
//         ref:'DonorAndBenficiary',
//         required:true
//     },
//     recipients:[{
//       type: mongoose.Schema.Types.ObjectId,
//       ref:'DonorAndBenficiary',
//       required:true
//     }],
//     status:{
//         type:String,
//         enum:["pending","fulfilled","cancelled"],
//         default:"pending"
//     },
//     acceptedBy:{
//       type: mongoose.Schema.Types.ObjectId,
//       ref:'DonorAndBenficiary',
//       default:null
//     },
//     createdAt:{
//         type:Date,
//         default:Date.now
//     },
//     hospitalName:{
//         type:String,
//         required:true
//     }
// })

// const BloodRequest = mongoose.model('BloodRequest', bloodRequestSchema)
// export default BloodRequest

import mongoose from 'mongoose'
import DonorAndBenficiary from './userModel.js' // ✅ Add .js extension if using ES modules

const bloodRequestSchema = new mongoose.Schema({ // ✅ Use `new mongoose.Schema()`
  requester: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'DonorAndBenficiary', // ✅ Use the model name as string
    required: true
  },
  recipients: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'DonorAndBenficiary',
    required: true
  }],
  status: {
    type: String,
    enum: ['pending', 'fulfilled', 'cancelled'],
    default: 'pending'
  },
  acceptedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'DonorAndBenficiary',
    default: null // ✅ Should not be required, since it's null initially
  },
  hospitalName: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const BloodRequest = mongoose.model('BloodRequest', bloodRequestSchema); // ✅ Capitalize model name by convention

export default BloodRequest;
