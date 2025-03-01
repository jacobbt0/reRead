import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import authRoutes from './routes/auth.js'
import productRoutes from './routes/product.js'
import messageRoutes from './routes/message.js'
import reportRoutes from './routes/report.js'
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

 
app.use('/api/auth', authRoutes)
app.use('/api/books', productRoutes)
app.use('/api/messages', messageRoutes)
app.use('/api/report', reportRoutes)


server.listen(PORT, () => {
  console.log('listening on port', PORT)
  connectDB()
})