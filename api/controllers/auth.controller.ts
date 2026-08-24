import type { Request, Response } from 'express'
import { authenticateUser } from '../services/auth.service.ts'
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
      secure: true,
      sameSite: 'none',
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
export async function logout(req: Request, res: Response) {
  res.clearCookie('auth_token', {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
  })
  return res.status(200).json({ message: 'Logout successful' })
}

export async function me(req: Request, res: Response) {
  return res.status(200).json({
    user: req.user,
  })
}
