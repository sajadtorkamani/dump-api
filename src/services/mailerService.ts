import * as path from 'path'
import fs from 'fs/promises'
import * as nodemailer from 'nodemailer'
import SMTPTransport, { SentMessageInfo } from 'nodemailer/lib/smtp-transport'
import { ConnectionOptions, Queue, Worker } from 'bullmq'

const debug = require('debug')('app:mailerService')

const connection: ConnectionOptions = {
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
}
export interface SendEmailOptions {
  to: string
  subject: string
  template: string
  templateVariables?: TemplateVariables
}

type TemplateVariables = {
  [variableName: string]: string
}

type Transporter = nodemailer.Transporter<SMTPTransport.SentMessageInfo>

class MailerService {
  private transporter: Transporter
  private queue: Queue

  constructor() {
    this.transporter = this.createTransporter()
    this.queue = new Queue('mails')
  }

  createTransporter(): Transporter {
    return nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD,
      },
    } as SMTPTransport.Options)
  }

  // Schedule email as a queue job.
  async deliverLater(sendOptions: SendEmailOptions) {
    const emailTemplate = sendOptions.template.split('.')[0]
    const jobName = `${emailTemplate} email`

    await this.queue.add(jobName, sendOptions)
  }

  async deliverNow(
    options: SendEmailOptions
  ): Promise<nodemailer.SentMessageInfo> {
    const { to, subject, template, templateVariables } = options
    const html = await this.compileTemplate(template, templateVariables)

    return await this.transporter.sendMail({
      from: process.env.ADMIN_EMAIL,
      to,
      html,
      subject,
    })
  }

  async compileTemplate(
    template: string,
    templateVariables: TemplateVariables = {}
  ): Promise<string> {
    const templatePath = path.join(process.cwd(), 'src', 'emails', template)

    let html = await fs.readFile(templatePath, 'utf8')

    // Substitute variable placeholders in template
    Object.entries(templateVariables).map(([variableName, variableValue]) => {
      html = html.replace(
        new RegExp(`{{ ${variableName} }}`, 'g'),
        variableValue
      )
    })

    return html
  }

  createQueueWorker() {
    const worker = new Worker<SendEmailOptions, SentMessageInfo>(
      this.queue.name,
      (job) => this.deliverNow(job.data),
      { connection }
    )

    worker.on('completed', (job) => {
      debug(`JOB COMPLETED: ${job.name} #${job.id} (Queue: ${this.queue.name})`)
    })

    worker.on('error', (err) => {
      debug(`JOB ERROR: ${err.message} (Queue: ${this.queue.name})
      \t ${err.stack}`)
    })

    worker.on('failed', (job, err) => {
      debug(`JOB FAILED: ${job.name} #${job.id} (Queue: ${this.queue.name}): 
      ${err.message} \t ${err.stack}`)
    })
  }
}

const mailerService = new MailerService()

export default mailerService
