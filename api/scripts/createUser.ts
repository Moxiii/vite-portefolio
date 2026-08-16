import 'dotenv/config'
import bcrypt from 'bcryptjs'
import mongoose from 'mongoose'
import User from '../models/User'

const username = process.env.USER_USERNAME
const plainPassword = process.env.USER_PASSWORD
const mongoUri = process.env.MONGO_URI

if (!username || !plainPassword || !mongoUri) {
  throw new Error('Missing USER_USERNAME, USER_PASSWORD or MONGO_URI')
}

await mongoose.connect(mongoUri)

const existingUser = await User.findOne({ username })

if (existingUser) {
  console.log(`User "${username}" already exists.`)
  await mongoose.disconnect()
  process.exit(0)
}

const password = await bcrypt.hash(plainPassword, 12)

await User.create({
  username,
  password,
})

console.log(`User "${username}" created.`)

await mongoose.disconnect()
