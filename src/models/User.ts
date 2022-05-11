import { model, Schema } from 'mongoose'

export interface IUser {
  _id: number | string
  email: string
  password: string
  createdAt: Date
  updatedAt: Date
}

const userSchema = new Schema<IUser>({
  email: { type: String, required: true },
  password: { type: String, required: true },
  createdAt: { type: Date },
  updatedAt: { type: Date },
})

const User = model<IUser>('User', userSchema)

export default User
