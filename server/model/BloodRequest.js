
import mongoose from 'mongoose'
import DonorAndBenficiary from './userModel.js' 

const bloodRequestSchema = new mongoose.Schema({ 
  requester: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'DonorAndBenficiary', 
    required: true
  },
  recipients: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'DonorAndBenficiary',
    required: true
  }],
  bloodGroup:{
    type:String,
    required:true
  },
  status: {
    type: String,
    enum: ['pending', 'fulfilled', 'cancelled'],
    default: 'pending'
  },
  acceptedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'DonorAndBenficiary'
   },
  hospitalName: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  city:{
    type:String,
    required:true
  },
  phone:{
    type:Number,
    required:true,
    match:/^[0-9]{10}$/
  }
},{timestamps : true});

bloodRequestSchema.index({ requester: 1 });                // Fast lookups by requester
bloodRequestSchema.index({ recipients: 1 });               // For filtering by recipient
bloodRequestSchema.index({ status: 1 });                   // For filtering by status
bloodRequestSchema.index({ createdAt: -1 });               // For sorting by date (desc)
bloodRequestSchema.index({ bloodGroup: 1 });               // For blood group-based filtering
bloodRequestSchema.index({ acceptedBy: 1 }); 

const BloodRequest = mongoose.model('BloodRequest', bloodRequestSchema); // ✅ Capitalize model name by convention

export default BloodRequest;
