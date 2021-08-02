
import { Controller, Request, Post, UseGuards, Get } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UsersService } from './users.service';

@Controller()
export class UserController {

  constructor(private userService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('userByToken')
  getUser(@Request() req) {
    return this.userService.getDetails(req.user);
  }

}