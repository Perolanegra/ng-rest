import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/user/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from 'src/auth.controller';
import { NgMailerService } from 'src/core/mailer/ng-mailer.service';
import { TokenModule } from 'src/token/token.module';
import { AppService } from 'src/app.service';

@Module({
  providers: [AuthService, AppService, LocalStrategy, JwtStrategy, NgMailerService],
  controllers: [AuthController],
  imports: [
    UsersModule, 
    PassportModule,
    TokenModule,
    PassportModule.register({ 
      defaultStrategy: 'jwt', 
      property: 'user',
      session: false
    }),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '2d' }, // mudar pra 1s pra testar o httpInterceptor
    }),
  ],
  exports: [AuthService, PassportModule, LocalStrategy],
})
export class AuthModule {}
