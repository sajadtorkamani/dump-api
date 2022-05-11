import { ConnectionOptions, Queue, Worker } from 'bullmq'
import { SentMessageInfo } from 'nodemailer'
import mailerService, { SendEmailOptions } from './mailerService'

const debug = require('debug')('app:redisService')

const connection: ConnectionOptions = {
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
}

class QueueService {
  public emailQueue: Queue

  constructor() {
    this.emailQueue = new Queue('Emails', { connection })
  }

  async createWorkers() {
    this.createEmailDeliveryWorker()
  }

  createEmailDeliveryWorker() {
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

const queueService = new QueueService()

export default queueService
