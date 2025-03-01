import express from 'express'
import {
    getAllBooks,
    createBook,
    deleteBook,
    getBooksBySemester,
    getAccount,
    updateBook,

} from '../controllers/product.js'
import { protectRoute, adminRoute } from '../middleware/middleware.js'

const router = express.Router()

router.get('/', protectRoute, adminRoute, getAllBooks)
router.post('/', protectRoute, createBook)
router.delete('/:id', protectRoute, deleteBook)
router.get('/:department/:semester', getBooksBySemester)
router.get("/:id", getAccount)
router.put("/:id",updateBook)

export default router