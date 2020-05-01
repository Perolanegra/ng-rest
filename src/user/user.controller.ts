
import { Controller, Request, Post, UseGuards, Get } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';


@Controller()
export class UserController {

  constructor() {}

  @UseGuards(JwtAuthGuard)
  @Get('userByToken')
  getUser(@Request() req) {
    return req.user;
  }

}