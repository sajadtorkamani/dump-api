import * as path from 'path'
import fs from 'fs/promises'
import * as nodemailer from 'nodemailer'
import SMTPTransport from 'nodemailer/lib/smtp-transport'
import redisService from './redisService'

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

  constructor() {
    this.transporter = this.createTransporter()
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
  async sendEmail(options: SendEmailOptions) {
    const jobName = options.template.split('.')[0]
    await redisService.emailQueue.add(jobName, options)
  }

  async deliverEmail(
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
    variables: TemplateVariables = {}
  ): Promise<string> {
    const templatePath = path.join(process.cwd(), 'src', 'emails', template)

    let html = await fs.readFile(templatePath, 'utf8')

    // Substitute variable placeholders in template
    Object.entries(variables).map(([variableName, variableValue]) => {
      html = html.replace(
        new RegExp(`{{ ${variableName} }}`, 'g'),
        variableValue
      )
    })

    return html
  }
}

const mailerService = new MailerService()

export default mailerService
