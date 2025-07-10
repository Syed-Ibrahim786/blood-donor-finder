import express from 'express'
import { protect } from '../middleware/authMiddleware.js'
const router = express.Router()
import { registerUser, loginUser, getDonor, makeDonor, userDashboardController } from '../controller/authController.js'


router.post('/register',registerUser)

router.post('/login', loginUser)

router.get('/search', protect, getDonor)

router.get('/admin/dashboard', protect)

router.get('/user/dashboard',protect, userDashboardController)

router.put('/donor/register', protect, makeDonor)



export default router