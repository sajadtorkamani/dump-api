const debug = require('debug')('app:main')
import app from './app'
import mongoService from './services/mongoService'
import redisService from './services/redisService'

async function main() {
  await mongoService.createConnection()
  await redisService.createConnection()

  app.listen(process.env.PORT, () => {
    debug(`App listening on http://localhost:${process.env.PORT}`)
  })
}

main()
