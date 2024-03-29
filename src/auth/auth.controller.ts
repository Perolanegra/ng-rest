
import { Controller, Request, Post, UseGuards, Get, Body } from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { AppService } from '../app.service';
import { UserSignUpDTO } from 'src/user/dto/user-sign-up.dto';

@Controller()
export class AuthController {
  constructor(private authService: AuthService, private appService: AppService) { 
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Get('index')
  async index() {
    return this.appService.itsOn();
  }

  @Post('auth/forgot-pass')
  async forgotPass(@Body('payload') payload: string) {
    return this.authService.sendCredentialsEmail(payload);
  }

  @Post('auth/reset-pass')
  async resetPass(@Request() req, @Body('payload') payload: { password: string }) {
    return this.authService.setResetPassword(payload.password, req);
  }

  @Post('auth/sign-up')
  async signUp(@Body('payload') payload: UserSignUpDTO) {
    return this.authService.signUp(payload);
  }

}