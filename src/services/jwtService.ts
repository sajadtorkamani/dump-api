import * as jwt from 'jsonwebtoken'
import { HydratedDocument } from 'mongoose'
import { IUser } from '../models/User'

class JwtService {
  async generateToken(user: HydratedDocument<IUser>): Promise<string> {
    return jwt.sign(
      {
        _id: user._id,
        email: user.email,
      },
      process.env.SECRET_KEY
    )
  }
}

const jwtService = new JwtService()

export default jwtService
