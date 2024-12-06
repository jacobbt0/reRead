import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import path from 'path'
import authRoutes from './routes/auth.js'
import productRoutes from './routes/product.js'

const app = express()

dotenv.config()
import { connectDB } from './lib/db.js'
const PORT = process.env.PORT || 8888

app.use(express.json({ limit: "10mb" }))
app.use(cookieParser())

app.use('/api/auth',authRoutes)
app.use('/api/books',productRoutes)

app.listen(PORT,() => {
    console.log('listening on port',PORT)
    connectDB()
})