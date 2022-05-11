import { ConnectionOptions, Queue, Worker } from 'bullmq'
import { SentMessageInfo } from 'nodemailer'
import mailerService, { SendEmailOptions } from './mailerService'

const debug = require('debug')('app:redisService')

const connection: ConnectionOptions = {
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
}

class RedisService {
  public emailQueue: Queue

  constructor() {
    this.emailQueue = new Queue('Emails', { connection })
    // debug(`Created queue:`)
  }

  async createConnection() {
    this.createEmailWorker()
  }

  createEmailWorker() {
    const worker = new Worker<SendEmailOptions, SentMessageInfo>(
      this.emailQueue.name,
      (job) => mailerService.deliverEmail(job.data),
      { connection }
    )

    worker.on('completed', (job) => {
      debug(`JOB COMPLETED (${this.emailQueue.name}): ${job.name} (${job.id})`)
    })

    worker.on('error', (err) => {
      debug(`JOB ERROR (${this.emailQueue.name}):  ${err.message}
      \t ${err.stack}`)
    })

    worker.on('failed', (job, err) => {
      debug(`JOB FAILED (${this.emailQueue.name}): ${job.name} (${job.id}): ${err.message}
    \t ${err.stack}`)
    })
  }
}

const redisService = new RedisService()

export default redisService
