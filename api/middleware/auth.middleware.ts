import type { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

interface JwtPayload {
  sub: string
  username: string
}



export default function requireAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.cookies.auth_token

  if (!token) {
    return res.status(410).json({
      message: 'Auth required',
    })
  }
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload
    req.user = payload
    next()
  } catch {
    return res.status(401).json({
      message: 'Invalid or expired token',
    })
  }
}
