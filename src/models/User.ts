import { model, Schema } from 'mongoose'
import * as bcrypt from 'bcrypt'
import { uuid } from '../utilities'

export interface IUser {
  email: string
  password: string
  createdAt: number
  updatedAt: number
  confirmEmailToken: string | null
  hasConfirmedEmail: boolean
}

const UserSchema = new Schema<IUser>({
  email: { type: String, required: true },
  password: { type: String, required: true },
  createdAt: { type: Number, default: Date.now },
  updatedAt: { type: Number, default: Date.now },
  hasConfirmedEmail: { type: Boolean, default: false },
  confirmEmailToken: { type: String, default: () => uuid() },
})

UserSchema.pre('save', async function hashPassword() {
  this.password = await bcrypt.hash(this.password, 10)
})

UserSchema.methods.toJSON = function () {
  const json = this.toObject()
  delete json.password
  delete json.confirmEmailToken

  return json
}

const User = model<IUser>('User', UserSchema)

export default User
