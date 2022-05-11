import app from './app'
import { connectToDatabase } from './utilities'

const PORT = process.env.PORT || 8000

async function main() {
  const connection = await connectToDatabase()
  const [rows] = await connection.query('SELECT * FROM users')
  console.log({ rows })

  app.listen(PORT, () => {
    console.log(`App listening on http://localhost:${PORT}`)
  })
}

main()
