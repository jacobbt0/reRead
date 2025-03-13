import express from 'express'
import {
    signup,
    login,
    logout,
    refreshToken,
    getProfile,
    loginWithGoogle,
    sendOTP,
    verifyOTP,
    getUser,
    getAllUsers,
    banUser,


} from '../controllers/auth.js'
import { adminRoute, protectRoute } from '../middleware/middleware.js'
const router = express.Router()

router.post('/send-otp', sendOTP)
router.post('/verify-otp', verifyOTP)
router.get('/user/:id', getUser)
router.post('/signup', signup)
router.post('/login', login)
router.post('/login/google', loginWithGoogle) 
router.post('/logout', logout)
router.post('/refresh-token', refreshToken)
router.get('/profile', protectRoute, getProfile)
router.get('/get-all-users', protectRoute, adminRoute, getAllUsers)
router.put('/ban/:id', protectRoute, adminRoute, banUser)


export default router