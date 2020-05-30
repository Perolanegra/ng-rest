
import { Controller, Request, Post, UseGuards, Get, Param, Body } from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { AppService } from '../app.service';

@Controller()
export class AuthController {
  constructor(private authService: AuthService, private appService: AppService) { 
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Get('/')
  async index() {
    return this.appService.itsOn();
  }

  @Post('auth/forgot-pass')
  async forgotPass(@Body('payload') payload: string) {
    return this.authService.sendCredentialsEmail(payload);
  }

  @Post('auth/reset-pass') // tirar o acess_token
  async resetPass(@Body('payload') payload: { access_token: string, password: string }) {
    return this.authService.setResetPassword(payload);
  }

  @Post('auth/sign-up')
  async signUp(@Body('payload') payload: { name:string, username: string, pass: string, email: string }) {
    return this.authService.signUp(payload);
  }

}