import { Request, Response } from 'express'
import { authenticateUser } from '../services/auth.service'
export async function login(req: Request, res: Response) {
  try {
    const { username, password } = req.body
    if (!username || !password) {
      return res.status(400).json({
        message: 'Username and password required',
      })
    }
    const token = await authenticateUser(username, password)
    res.cookie('auth_token', token, {
      httpOnly: true,
      sameSite: 'lax',
    })
    return res.status(200).json({
      message: 'Login successful',
    })
  } catch (error) {
    return res.status(401).json({
      message: 'Invalid credentials',
    })
  }
}
