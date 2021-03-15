import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './user/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailerModule, HandlebarsAdapter } from '@nestjs-modules/mailer';
import { IssueModule } from './issue/issue.module';
import { PostModule } from './post/post.module';
import { TagsModule } from './tags/tags.module';
import { ConfigModule } from '@nestjs/config';
import { IssuePollModule } from './issue-poll/issue-poll.module';
import { IssuePollResponseModule } from './issue-poll-response/issue-poll-response.module';
import { IssueTextContentModule } from './issue-text-content/issue-text-content.module';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
@Module({
  imports: [
    AuthModule,
    UsersModule,
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 7
    }),
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
        from: `"No Reply" <${process.env.SMTP_MAILER_SOURCE}>`,
      },
      template: {
        dir: `${process.cwd()}/${process.env.SMTP_TEMPLATE_DIR}/`,
        adapter: new HandlebarsAdapter(),
        options: {
          strict: process.env.SMTP_STRICT_OPT === 'true',
        },
      },
    }),
    IssueModule,
    PostModule,
    IssuePollModule,
    IssuePollResponseModule,
    IssueTextContentModule,
    TagsModule,
  ],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    }
  ],
})
export class AppModule { }