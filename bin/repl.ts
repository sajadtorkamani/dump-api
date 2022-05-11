import mongoose from 'mongoose'
import User from '../src/models/User'

declare global {
  var models: any
}

async function main() {
  await mongoose.connect('mongodb://localhost:27017/dump')

  globalThis.models = {
    User: User,
  }
}

main()
