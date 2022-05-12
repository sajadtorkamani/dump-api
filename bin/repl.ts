import bootstrap from '../src/bootstrap'
import User from '../src/models/User'

declare global {
  var models: any
}

async function main() {
  await bootstrap()

  globalThis.models = {
    User: User,
  }
}

main()
