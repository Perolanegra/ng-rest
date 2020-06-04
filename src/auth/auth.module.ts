import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/user/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from 'src/auth/auth.controller';
import { NgMailerService } from 'src/core/mailer/ng-mailer.service';
import { TokenModule } from 'src/token/token.module';
import { AppService } from 'src/app.service';
import { CoreService } from 'src/core/core.service';
import { AuthMiddleware } from 'src/core/auth-middleware';

@Module({
  providers: [AuthService, AppService, LocalStrategy, JwtStrategy, NgMailerService, CoreService],
  controllers: [AuthController],
  imports: [
    UsersModule,
    PassportModule,
    TokenModule,
    PassportModule.register({
      defaultStrategy: 'jwt',
      property: 'user',
      session: false,
    }),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '2d' }, // mudar pra 1s pra testar o httpInterceptor
    }),
  ],
  exports: [AuthService, PassportModule, LocalStrategy, JwtModule],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        { path: 'auth/sign-up', method: RequestMethod.POST },
        { path: 'auth/forgot-pass', method: RequestMethod.POST },
        { path: 'index', method: RequestMethod.GET },
      )
      .forRoutes({ path: 'issues/store', method: RequestMethod.ALL });
  }
}



