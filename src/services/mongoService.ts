import mongoose from 'mongoose'

class MongoService {
  async createConnection() {
    await mongoose.connect(process.env.MONGO_URI as string)
  }
}

const mongoService = new MongoService()

export default mongoService
