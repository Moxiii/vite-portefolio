import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/User.ts'
import { JWT_SECRET } from '../config/auth.ts'

export async function authenticateUser(username: string, password: string) {
  const user = await User.findOne({ username }).select('+password')

  if (!user) {
    throw new Error('Invalid credentials')
  }

  const validPassword = await bcrypt.compare(password, user.password)

  if (!validPassword) {
    throw new Error('Invalid credentials')
  }

  const token = createToken(user)

  return token
}
export function createToken(user: User) {
  return jwt.sign(
    { sub: user._id.toString(), username: user.username },
    JWT_SECRET,
    { expiresIn: '1h' }
  )
}
