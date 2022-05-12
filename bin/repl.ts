import mongoose from 'mongoose'
import User from '../src/models/User'

declare global {
  var models: any
}

async function main() {
  await mongoose.connect(process.env.MONGO_URI as string)

  globalThis.models = {
    User: User,
  }
}

main()
