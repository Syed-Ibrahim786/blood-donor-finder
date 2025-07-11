import express from 'express'
import { protect, verifyRole } from '../middleware/authMiddleware.js'
const router = express.Router()
import { 
    registerUser,
    loginUser,
    getDonor,
    makeDonor,
    userDashboardController,
    donorDashboardController,
    adminDashboardController,
    verifyRefreshToken,
    logout } from '../controller/authController.js'


router.post('/register',registerUser)

router.post('/login', loginUser)

router.post('/refresh-token', verifyRefreshToken)

router.post('/logout', logout)

router.get('/search', protect, getDonor)

router.get('/admin/dashboard', protect,verifyRole("admin"), adminDashboardController)

router.get('/user/dashboard',protect,verifyRole("user"), userDashboardController)

router.get('/donor/dashboard',protect,verifyRole("donor"), donorDashboardController)

router.put('/donor/register', protect, makeDonor)



export default router