import { model, Schema } from 'mongoose'

export interface IUser {
  email: string
  password: string
  createdAt: number,
  updatedAt: number,
  hasConfirmedEmail: boolean
}

const userSchema = new Schema<IUser>({
  email: { type: String, required: true },
  password: { type: String, required: true },
  createdAt: { type: Number, default: Date.now },
  updatedAt: { type: Number, default: Date.now },
  hasConfirmedEmail: { type: Boolean, default: false },
})

const User = model<IUser>('User', userSchema)

export default User
