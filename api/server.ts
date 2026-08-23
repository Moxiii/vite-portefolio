import dotenv from 'dotenv'
dotenv.config()
import app from './app.ts'
import { connectDB } from './config/database.ts'

const PORT = process.env.port || 3100

await connectDB()

app.listen(PORT)
