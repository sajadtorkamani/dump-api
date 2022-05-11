const debug = require('debug')('app:main')
import app from './app'
import mongoService from './services/mongoService'
import queueService from './services/queueService'

async function main() {
  await mongoService.createConnection()
  await queueService.createWorkers()

  app.listen(process.env.PORT, () => {
    debug(`App listening on http://localhost:${process.env.PORT}`)
  })
}

main()
