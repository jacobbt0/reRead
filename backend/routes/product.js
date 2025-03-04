import express from 'express'
import {
    getAllBooks,
    createBook,
    deleteBook,
    getBooksBySemester,
    getAccount,
    updateBook,
    searchBook,
    getBooksByTitle,

} from '../controllers/product.js'
import { protectRoute, adminRoute } from '../middleware/middleware.js'

const router = express.Router()
 
router.get("/search/:query", searchBook)
router.get("/get-books/:title", getBooksByTitle)
router.get('/', protectRoute, adminRoute, getAllBooks)
router.post('/', protectRoute, createBook)
router.delete('/:id', protectRoute, deleteBook)
router.get("/get-account/:id", getAccount)
router.get('/:department/:semester', getBooksBySemester)
router.put("/:id", updateBook)


export default router