import express from 'express'
import { protectRoute } from '../middleware/middleware.js'
import { getMessages, sendMessage, getUsersForSidebar, deleteMessage } from '../controllers/message.js'
const router = express.Router()

router.get('/users/:id', protectRoute, getUsersForSidebar)
router.get('/:id', protectRoute, getMessages)
router.post('/send/:id', protectRoute, sendMessage)
router.delete("/del/:id", protectRoute, deleteMessage)


export default router