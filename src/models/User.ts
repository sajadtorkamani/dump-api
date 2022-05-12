import { model, Schema } from 'mongoose'
import * as bcrypt from 'bcrypt'

export interface IUser {
  email: string
  password: string
  createdAt: number
  updatedAt: number
  hasConfirmedEmail: boolean
}

const userSchema = new Schema<IUser>({
  email: { type: String, required: true },
  password: { type: String, required: true },
  createdAt: { type: Number, default: Date.now },
  updatedAt: { type: Number, default: Date.now },
  hasConfirmedEmail: { type: Boolean, default: false },
})

userSchema.pre('save', async function hashPassword() {
  this.password = await bcrypt.hash(this.password, 10)
})

const User = model<IUser>('User', userSchema)

export default User
