import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './user/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailerModule, HandlebarsAdapter } from '@nestjs-modules/mailer';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.HOST || 'localhost',
      port: Number(process.env.PORT) || 3306,
      username: process.env.USERNAME || 'ng',
      password: process.env.PASSWORD || '1061043$',
      database: process.env.DATABASE || 'ng_ba',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      // autoLoadEntities: true,
    }),
    MailerModule.forRoot({
      transport: {
        service: 'gmail',
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: parseInt(process.env.SMTP_PORT, 10) || 465,
        ssl: true,
        secure: true,//process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
        ignoreTLS: process.env.SMTP_SECURE !== 'false',
        auth: {
          user: process.env.SMTP_AUTH_USER || 'pedratto3@gmail.com',
          pass: process.env.SMTP_AUTH_PASS || 'ixcjtcqeavaoelmh',
        },
      },
      defaults: {
        from: '"No Reply" <ngba@devbaiano.com.br>',
      },
      template: {
        dir: `${process.cwd()}/templates/`,
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
  providers: [AppService],
})
export class AppModule { }