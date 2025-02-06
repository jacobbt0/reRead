import express from 'express'
import {
    getAllBooks,
    createBook,
    deleteBook,
    getBooksBySemester,
    getAccount,
  
} from '../controllers/product.js'
import { protectRoute, adminRoute } from '../middleware/middleware.js'

const router = express.Router()

router.get('/',protectRoute,  getAllBooks)
router.post('/',protectRoute, createBook )
router.delete('/:id',protectRoute, deleteBook)
router.get('/:department/:semester', getBooksBySemester)
router.get("/:id",protectRoute, getAccount)
 
export default router