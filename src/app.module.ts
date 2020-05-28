import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './user/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailerModule, HandlebarsAdapter } from '@nestjs-modules/mailer';
import { IssuesModule } from './issues/issues.module';
import { MediaModule } from './media/media.module';
import { PhotosModule } from './photos/photos.module';
import { AnswersModule } from './answers/answers.module';
import { TagsModule } from './tags/tags.module';


@Module({
  imports: [
    AuthModule,
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.HOST || 'localhost',
      port: 3306,
      username: process.env.USERNAME || 'ng',
      password: process.env.PASSWORD || '1061043$',
      database: process.env.DATABASE || 'ng_ba',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      acquireTimeout: 60 * 60 * 1000,
      connectTimeout: 60 * 60 * 1000,
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
    IssuesModule,
    MediaModule,
    PhotosModule,
    AnswersModule,
    TagsModule
  ],
  providers: [AppService],
})
export class AppModule { }