import { HydratedDocument } from 'mongoose'
import * as bcrypt from 'bcrypt'
import app from '../app'
import User, { IUser } from '../models/User'
import { LoginRequest, RegisterRequest } from '../types/requests'
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

  async confirmUserEmail(confirmEmailToken: string): Promise<boolean> {
    const user = await User.findOne({ confirmEmailToken })
    if (!user) {
      return false
    }

    user.hasConfirmedEmail = true
    user.confirmEmailToken = null
    user.save()

    return true
  }

  async verifyCredentials(
    email: string,
    password: string
  ): Promise<HydratedDocument<IUser> | null> {
    const user = await User.findOne({ email })
    if (!user) {
      return null
    }

    const isValidCredentials = await bcrypt.compare(password, user.password)
    return isValidCredentials ? user : null
  }
}

const userService = new UserService()

export default userService
