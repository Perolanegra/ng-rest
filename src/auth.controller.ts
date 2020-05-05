
import { Controller, Request, Post, UseGuards, Get, Param, Body } from '@nestjs/common';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) { 
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('auth/forgot-pass')
  async forgotPass(@Body('payload') payload: string) {
    return this.authService.sendCredentialsEmail(payload);
  }

  @Post('auth/reset-pass')
  async resetPass(@Body('payload') payload: { access_token: string, password: string }) {
    return this.authService.setResetPassword(payload);
  }

}