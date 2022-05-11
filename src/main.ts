const debug = require('debug')('app:main')
import app from './app'
import { connectToDatabase } from './utilities'

const PORT = process.env.PORT || 8000

async function main() {
  await connectToDatabase()
  debug('Connected to database')

  app.listen(PORT, () => {
    debug(`App listening on http://localhost:${PORT}`)
  })
}

main()
