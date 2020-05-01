import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/user/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from 'src/auth.controller';

@Module({
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
  imports: [
    UsersModule, 
    PassportModule,
    PassportModule.register({ defaultStrategy: 'jwt', session: true }),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '340s' }, // mudar pra 1s pra testar o httpInterceptor
    }),
  ],
  exports: [AuthService],
})
export class AuthModule {}
