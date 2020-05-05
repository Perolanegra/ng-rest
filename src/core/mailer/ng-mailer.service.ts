import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class NgMailerService {
    constructor(private readonly mailerService: MailerService) { }

    public async sendPasswordEmail(payload: { email: string, url: string }): Promise<any> {
        return this.mailerService.sendMail(
            {
                to: payload.email,
                from: 'ngba@devbaiano.com',
                subject: 'Recuperação credenciais ng-forum',
                template: 'index',
                context: { url: payload.url }  // id_user
            }
        );
    }
}