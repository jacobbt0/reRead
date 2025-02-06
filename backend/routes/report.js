import express from 'express'
const router = express.Router()
import {
    getAllReports,
    sendReport,
} from '../controllers/report.js'

import { protectRoute } from '../middleware/middleware.js'
router.post('/send-report/:id', protectRoute, sendReport)
router.get('/get-report', getAllReports)


export default router