import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './user/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailerModule, HandlebarsAdapter } from '@nestjs-modules/mailer';
import { IssuesModule } from './issues/issues.module';
import { PostModule } from './post/post.module';
import { TagsModule } from './tags/tags.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: process.env.TYPEORM_CONNECTION as any,
      host: process.env.TYPEORM_HOST,
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_DATABASE,
      entities: [`${__dirname}${process.env.TYPEORM_ENTITIES}`],
      acquireTimeout: 60 * 60 * 1000,
      connectTimeout: 60 * 60 * 1000,
      synchronize: process.env.TYPEORM_SYNCHRONIZE == 'true',
      // autoLoadEntities: true,
    }),
    MailerModule.forRoot({
      transport: {
        service: process.env.SMTP_SERVICE_HOST,
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT, 10) || 465,
        ssl: process.env.SMTP_SSL === 'true',
        secure: process.env.SMTP_SECURE === 'true',// true in case 465, false for other ports
        ignoreTLS: process.env.SMTP_SECURE !== 'false',
        auth: {
          user: process.env.SMTP_AUTH_USER,
          pass: process.env.SMTP_AUTH_PASS,
        },
      },
      defaults: {
        from: process.env.SMTP_MAILER_SOURCE,
      },
      template: {
        dir: `${process.cwd()}/${process.env.SMTP_TEMPLATE_DIR}/`,
        adapter: new HandlebarsAdapter(),
        options: {
          strict: process.env.SMTP_STRICT_OPT === 'true',
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