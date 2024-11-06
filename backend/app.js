import express from 'express'
import dotenv from 'dotenv'
import path from 'path'

const app = express()

dotenv.config()
import { connectDB } from './lib/db.js'
const PORT = process.env.PORT || 8888


app.listen(PORT,() => {
    console.log('listening on port',PORT)
    connectDB()
})