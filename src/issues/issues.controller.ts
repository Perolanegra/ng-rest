
import { Controller, Post, Body, Get, Request } from '@nestjs/common';
import { IssuesService } from './issues.service';

@Controller()
export class IssuesController {
  constructor(private issService: IssuesService) { }

  @Get('issues/list')
  async getIssues() {
    return this.issService.getAll();
  }

  @Post('issues/store')
  async addIssue(@Request() req, @Body('payload') payload: any) {
    payload.token = req.headers.authorization;
    return this.issService.store(payload);
  }


}