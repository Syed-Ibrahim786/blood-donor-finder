import DonorAndBeneficiary from '../model/userModel.js'
import BloodRequest from '../model/BloodRequest.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'


export async function registerUser(req, res){
    const { name, email, password, phone, city, bloodGroup, isDonor} = req.body; 
    //have to validate 
    console.log( name, email, password, phone, city, bloodGroup, isDonor);
    
    const user = await DonorAndBeneficiary.findOne({email:email})
    console.log(user);
    
    if(user != null){
        return res.status(401).json({message:"user email already exist try with other email id"})
    }
    //verify email
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
    
    res.status(201).json({message:"registration in db successfull "})
}

function createAccessToken(user){
    const payload = {name:user.name, city:user.city, bloodGroup:user.bloodGroup,id:user._id,role:user.role}
    const token = jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:'15m'})
    return token
}

export async function loginUser(req, res){
    const {email, password} = req.body
    console.log(email)
    const user = await DonorAndBeneficiary.findOne({email:email}).select('+password')
    console.log(user)
    if(!user){
        return res.status(404).json({message:"user doesn't exist"})
    }
    
    if(!(await bcrypt.compare(password, user.password))){
        return res.status(403).json({message:"invalid Password"})
    }

    const token = createAccessToken(user)
   
    const refreshToken = jwt.sign({ id: user._id },process.env.JWT_REFRESH_SECRET,{expiresIn:'20m'}) 
    user.refreshToken.push(refreshToken)
    await user.save()  
    res.status(200).json({message:"login in db successfull and token generated", token:token,refreshToken:refreshToken, role:user.role, name:user.name})
}

export async function getDonors(req, res){
    const {city, bloodGroup} = req.query
    const donorsAfterSearch = await DonorAndBeneficiary.find({city:city, bloodGroup:bloodGroup, isDonor:true}).select('-_id -__v -isDonor')
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
        BloodRequest.find({requester:req.user.id,status:"fulfilled"}).populate("acceptedBy","name")
    ])
    res.status(200).json({
      pending: pendingRequest,
      fulfilled: fulfilledRequest
    })
    }catch(e){
        console.error(e)
        res.status(500).json({message:"server error in loading user dashboard"})
    }
    
}

export async function donorDashboardController(req, res) {
    try{
        const [allRequest, acceptedRequest, donorInfo] = await Promise.all([
        BloodRequest.find({ recipients:req.user.id, status:"pending" })
        .select('-recipients')
        .populate("requester","name phone")
        .sort({createdAt: -1}),
        BloodRequest.find({ acceptedBy:req.user.id })
        .select('-recipients')
        .populate("requester","name phone")
        .sort({createdAt: -1}),
        DonorAndBeneficiary.find({ _id:req.user.id }).select('+city +phone +bloodGroup')
    ])
    console.log(req.user.id)

    res.status(200).json({
        allRequest:allRequest,
        acceptedRequest:acceptedRequest,
        donorInfo:donorInfo,
        totalRequest:allRequest.length,
        totalDonation:acceptedRequest.length
    })
    }catch(e){
        console.error(e)
        res.status(500).json({message:"server error in loading donor dashboard"})
    }
}

export async function adminDashboardController(req, res){
    const now = new Date();
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay()); // Sunday (or Monday, based on locale)
    startOfWeek.setHours(0, 0, 0, 0); 
    const endOfWeek = new Date(now);
endOfWeek.setDate(startOfWeek.getDate() + 7); // Next Sunday
endOfWeek.setHours(23, 59, 59, 999); // End of day
// console.log("startOfWeek:", startOfWeek);
// console.log("endOfWeek:", endOfWeek);

    try{
        const [totalDonors, DonorsRegisteredThisWeek, bloodGroupDistribution, topCities ] =  await Promise.all([
        DonorAndBeneficiary.countDocuments({isDonor:true}),
        DonorAndBeneficiary.find({
      isDonor: true,
      createdAt: { $gte: startOfWeek, $lte: endOfWeek }
    }),
    DonorAndBeneficiary.aggregate([
        {
            $group:{
                _id:'$bloodGroup',
                count:{ $sum: 1 }
            },
        },
        {
            $sort:{ count: -1}
        }
    ]),
    DonorAndBeneficiary.aggregate([
        {
            $match:{isDonor:true}
        },
        {
            $group:{
                _id:'$city',
                count:{$sum:1}
            }
        },
        {
            $sort:{count: -1}
        }
    ])

    ])
    res.status(200).json({totalDonors:totalDonors, DonorsRegisteredThisWeek:DonorsRegisteredThisWeek, bloodGroupDistribution:bloodGroupDistribution, topCities:topCities})
    }catch(e){
        console.error(e)
        res.status(500).json({message:"server error in loading admin dashboard"})
    }

    
}

export async function verifyRefreshToken(req, res){
    const {refreshToken} = req.body
    if(!refreshToken) return res.status(401).json({message:"Refresh token required from verify token"})
    try{
        const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET)
        console.log(payload)
        const user = await DonorAndBeneficiary.findById(payload.id)
        console.log(user)
        if(!user || !user.refreshToken.includes(refreshToken)){
            return res.status(403).json({message:"invalid refresh token"})
        }
        const newAccessToken = createAccessToken(user)
        res.status(200).json({accessToken:newAccessToken})
    }catch(e){
        res.status(403).json({message:"refresh token expired or invalid"})
    }
}

export async function logout(req, res){
    const {refreshToken} = req.body
    if(!refreshToken) return res.status(401).json({message:"refresh token missing for logout"})
    try{
        const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET)
        const user = await DonorAndBeneficiary.findById(payload.id)
        user.refreshToken = user.refreshToken.filter(t => t !== refreshToken)
        await user.save()
        res.status(204).json({message:"logout successful"})
    }catch(e){
        res.status(403).json({message:"token expired"})
    }
}

export async function updateUser(req, res){
    const {userId, city,bloodGroup, phone} = req.body
    const user = DonorAndBeneficiary.find({_id:userId})
    user.city = city
    user.bloodGroup = bloodGroup
    user.phone = phone
    await user.save()
    res.status(201).json({message:"update successful"})
}