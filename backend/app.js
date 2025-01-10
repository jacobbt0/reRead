import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import path from 'path'
import authRoutes from './routes/auth.js'
import productRoutes from './routes/product.js'
import messageRoutes from './routes/message.js'
import cors from 'cors'


dotenv.config()
import { connectDB } from './lib/db.js'
import { app, server } from './lib/socket.js'
const PORT = process.env.PORT || 8888

app.use(
  cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,  // Allow sending cookies
  })
)
app.use(express.json({ limit: "10mb" }))
app.use(cookieParser())

const __dirname = path.resolve()

app.use('/api/auth', authRoutes)
app.use('/api/books', productRoutes)
app.use('/api/message', messageRoutes)

server.listen(PORT, () => {
  console.log('listening on port', PORT)
  connectDB()
})