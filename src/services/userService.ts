import { HydratedDocument } from 'mongoose'
import app from '../app'
import User, { IUser } from '../models/User'
import { RegisterRequest } from '../types/requests'
import mailerService from './mailerService'

class UserService {
  async createUser(request: RegisterRequest): Promise<HydratedDocument<IUser>> {
    const { email, password } = request
    const user = new User({ email, password })

    return await user.save()
  }

  async isEmailAvailable(email: string): Promise<boolean> {
    const user = await User.findOne({ email })
    return user === null
  }

  async sendConfirmEmailInstructions(user: HydratedDocument<IUser>) {
    const confirmEmailUrl = `${process.env.DOMAIN}/accounts/confirm-email/${user.confirmEmailToken}`

    await mailerService.deliverLater({
      to: user.email,
      subject: 'Welcome',
      template: 'welcome.html',
      templateVariables: { email: user.email, confirmEmailUrl },
    })
  }
}

const userService = new UserService()

export default userService
