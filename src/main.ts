const debug = require('debug')('app:main')
import app from './app'
import mongoose from 'mongoose'

const PORT = process.env.PORT || 8000

async function main() {
  await mongoose.connect('mongodb://localhost:27017/dump')

  app.listen(PORT, () => {
    debug(`App listening on http://localhost:${PORT}`)
  })
}

main()
