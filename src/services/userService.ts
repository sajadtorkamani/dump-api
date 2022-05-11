import app from '../app'
import User from '../models/User'
import { RegisterRequest } from '../types/requests'

class UserService {
  async createUser(request: RegisterRequest) {
    const { email, password } = request

    const user = new User({
      email,
      password,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    await user.save()

    console.log({ user })

    return user
  }
}

const userService = new UserService()

export default userService
