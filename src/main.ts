import app from './app'

const PORT = process.env.PORT || 8000

async function main() {
  app.listen(PORT, () => {
    console.log(`App listening on http://localhost:${PORT}`)
  })
}

main()
