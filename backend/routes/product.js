import express from 'express'
import {
    getAllBooks,
    createBook,
    deleteBook,
    getBooksBySemester
} from '../controllers/product.js'
import { protectRoute, adminRoute } from '../middleware/middleware.js'

const router = express.Router()

router.get('/',protectRoute, adminRoute, getAllBooks)
router.post('/',protectRoute, createBook )
router.delete('/:id', deleteBook)
 
export default router