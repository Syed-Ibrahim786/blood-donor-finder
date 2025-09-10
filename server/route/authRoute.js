import express from 'express'
import { protect, verifyLoggin, verifyRole } from '../middleware/authMiddleware.js'
const router = express.Router()
import { 
    registerUser,
    loginUser,
    makeDonor,
    userDashboardController,
    donorDashboardController,
    adminDashboardController,
    verifyRefreshToken,
    logout,
    updateUser, 
    getDonors,
    alertDonorController} from '../controller/authController.js'


router.post('/register',registerUser)

router.post('/login', loginUser)

router.get('/verify', verifyLoggin)

router.post('/refresh-token', verifyRefreshToken)

router.post('/logout', logout)

router.get('/search', protect, getDonors)

router.get('/admin/dashboard', protect,verifyRole(["admin"]), adminDashboardController)

router.get('/user/dashboard',protect,verifyRole(["user", "donor"]), userDashboardController)

router.get('/donor/dashboard',protect,verifyRole(["donor"]), donorDashboardController)

router.put('/update',protect, updateUser)

router.put('/donor/register', protect, makeDonor)

router.post('/alertDonor', protect, alertDonorController)



export default router