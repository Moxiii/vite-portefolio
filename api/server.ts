import dotenv from 'dotenv'
dotenv.config()
import app from './app'
import { connectDB } from './config/database'

const PORT = process.env.port || 3100

await connectDB()

app.listen(PORT)
