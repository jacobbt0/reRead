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

} from '../controllers/auth.js'
import { protectRoute } from '../middleware/middleware.js'
const router = express.Router()

router.post('/send-otp',sendOTP)
router.post('/verify-otp',verifyOTP)
router.post('/signup', signup)
router.post('/login', login)
router.post('/login/google', loginWithGoogle)
router.post('/logout', logout)
router.post('/refresh-token' ,refreshToken)
router.get('/profile', protectRoute, getProfile)


export default router