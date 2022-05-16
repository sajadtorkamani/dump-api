import mongoose from 'mongoose'
import mailerService from './services/mailerService'

async function bootstrap() {
  ensureEnvVarsAreSet()
  await mongoose.connect(process.env.MONGO_URI as string)
  mailerService.createQueueWorker()
}

function ensureEnvVarsAreSet() {
  const requiredKeys = [
    'ADMIN_EMAIL',
    'DOMAIN',
    'FRONTEND_URL',
    'MONGO_URI',
    'REDIS_HOST',
    'REDIS_PORT',
    'SECRET_KEY',
    'SMTP_USERNAME',
    'SMTP_PASSWORD',
  ]

  const missingKeys = requiredKeys.filter((key) => {
    const envVar = process.env[key]
    return typeof envVar === 'undefined' || envVar.trim() === ''
  })

  if (missingKeys.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingKeys.join(', ')}`
    )
  }
}


export default bootstrap