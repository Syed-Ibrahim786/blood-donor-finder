import DonorAndBeneficiary from '../model/userModel.js'
import BloodRequest from '../model/BloodRequest.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

export async function registerUser(req, res){
    const { name, email, password, phone, city, bloodGroup, isDonor} = req.body;
    //have to validate 
    const hashedPassword = bcrypt.hashSync(password,10)
    await DonorAndBeneficiary.create({
        name:name,
        email:email,
        password:hashedPassword,
        phone:phone,
        city:city,
        bloodGroup:bloodGroup,
        isDonor:isDonor 
    })
    
    res.status(200).json({message:"registration in db successfull "})
}

export async function loginUser(req, res){
    const {name, password} = req.body
    const user = await DonorAndBeneficiary.findOne({name:name}).select('+password')
    console.log(user)
    if(!user){
        return res.status(404).json({message:"user doesn't exist"})
    }
    
    if(!(await bcrypt.compare(password, user.password))){
        return res.status(403).json({message:"invalid Password"})
    }

    const payload = {name:user.name, city:user.city, bloodGroup:user.bloodGroup,id:user._id,role:user.role}
    const token = jwt.sign(payload,process.env.JWT_SECRET)
    res.status(200).json({message:"login in db successfull and token generated", token:token, role:user.role})
    
}

export async function getDonor(req, res){
    const {city, bloodGroup} = req.query
    const donorsAfterSearch = await DonorAndBeneficiary.find({city:city, bloodGroup:bloodGroup}).select('-_id -__v -isDonor')
    console.log(donorsAfterSearch)
    console.log(req.user)
    try{
        if(donorsAfterSearch.length === 0){
            return res.status(404).json({message:"🥺 No Donors available!"})
        }
        return res.status(200).send(donorsAfterSearch)
    }catch(e){
        console.error(e)
        res.status(500).json({message:"internal server error"})
    }
}

export async function makeDonor(req, res){
    try{
    const user = await DonorAndBeneficiary.findOne({name:req.user.name})
    console.log(user)    
    user.isDonor = true
        await user.save()
        res.json({message:"congratulations!! you are now a donor!"})
    }catch{
        res.status(500).json({message:"internal server error"})
    }
}

export async function userDashboardController(req, res){
    try{
        const [pendingRequest, fulfilledRequest] = await Promise.all([
        BloodRequest.find({requester:req.user.id,status:"pending"}),
        BloodRequest.find({requester:req.user.id,status:"fulfilled"})
    ])
    res.status(200).json({
      pending: pendingRequest,
      fulfilled: fulfilledRequest
    })
    }catch(e){
        console.error(e)
        res.status(500).json({message:"server error"})
    }
    
}

