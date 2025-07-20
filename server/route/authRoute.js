import express from 'express'
import { protect, verifyRole } from '../middleware/authMiddleware.js'
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
    getDonors} from '../controller/authController.js'


router.post('/register',registerUser)

router.post('/login', loginUser)

router.post('/refresh-token', verifyRefreshToken)

router.post('/logout', logout)

router.get('/search', protect, getDonors)

router.get('/admin/dashboard', protect,verifyRole(["admin"]), adminDashboardController)

router.get('/user/dashboard',protect,verifyRole(["user"]), userDashboardController)

router.get('/donor/dashboard',protect,verifyRole(["donor","user"]), donorDashboardController)

router.put('/update', updateUser)

router.put('/donor/register', protect, makeDonor)



export default router