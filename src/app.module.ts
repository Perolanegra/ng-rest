import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './user/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailerModule, HandlebarsAdapter } from '@nestjs-modules/mailer';
import { IssuesModule } from './issues/issues.module';
import { PostModule } from './post/post.module';
import { TagsModule } from './tags/tags.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.HOST,
      username: process.env.USERNAME,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      acquireTimeout: 60 * 60 * 1000,
      connectTimeout: 60 * 60 * 1000,
      synchronize: true,
      // autoLoadEntities: true,
    }),
    MailerModule.forRoot({
      transport: {
        service: 'gmail',
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT, 10) || 465,
        ssl: true,
        secure: true, //process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
        ignoreTLS: process.env.SMTP_SECURE !== 'false',
        auth: {
          user: process.env.SMTP_AUTH_USER,
          pass: process.env.SMTP_AUTH_PASS,
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
    PostModule,
    TagsModule
  ],
  providers: [AppService],
})
export class AppModule {}