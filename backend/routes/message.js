import express from 'express'
import { protectRoute } from '../middleware/middleware.js'
import { getMessages, sendMessage, getUsersForSidebar } from '../controllers/message.js'
const router = express.Router()

router.get('/users/:id', protectRoute, getUsersForSidebar)
router.get('/:id', protectRoute, getMessages)
router.post('/send/:id', protectRoute, sendMessage)


export default router