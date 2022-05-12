const debug = require('debug')('app:main')
import mongoose from 'mongoose'
import app from './app'
import mailerService from './services/mailerService'
import { ensureEnvVarsAreSet } from './utilities'

async function main() {
  ensureEnvVarsAreSet()

  await mongoose.connect(process.env.MONGO_URI as string)

  mailerService.createQueueWorker()
  
  app.listen(process.env.PORT, () => {
    debug(`App listening on http://localhost:${process.env.PORT}`)
  })
}

main()
