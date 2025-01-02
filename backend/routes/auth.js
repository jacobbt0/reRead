import express from 'express'
import { signup, login, logout, refreshToken, getProfile, loginWithGoogle} from '../controllers/auth.js'

const router = express.Router()

router.post('/signup',signup)
router.post('/login',login)
router.post('/login/google',loginWithGoogle)
router.post('/logout',logout)
router.post('/refresh-token',refreshToken)
router.get('/profile',getProfile)

export default router