const debug = require('debug')('app:main')
import app from './app'
import mailerService from './services/mailerService'
import mongoService from './services/mongoService'

async function main() {
  await mongoService.createConnection()

  mailerService.createQueueWorker()

  app.listen(process.env.PORT, () => {
    debug(`App listening on http://localhost:${process.env.PORT}`)
  })
}

main()
