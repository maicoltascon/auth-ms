import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

interface SendEmailOptions {
  to: string;
  subject: string;
  template: string;
  context?: Record<string, any>;
  from?: string;
}

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendEmail(options: SendEmailOptions): Promise<void> {
    return await this.mailerService.sendMail({
      to: options.to,
      subject: options.subject,
      template: options.template, // nombre de la plantilla .hbs sin extensión
      context: options.context || {},
      from: options.from,
      headers: {
        'X-Priority': '3',
        Importance: 'normal',
        'Priority': 'normal',
        'X-Mailer': 'NestJS Mailer Module',
      },
      // opcional, usa el default si no se pasa
    });
  }
}
