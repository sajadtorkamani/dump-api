const debug = require('debug')('app:main')
import bootstrap from './bootstrap'
import app from './app'

async function main() {
  await bootstrap()
  
  app.listen(process.env.PORT, () => {
    debug(`App listening on http://localhost:${process.env.PORT}`)
  })
}

main()
