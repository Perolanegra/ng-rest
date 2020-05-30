
import { Controller, Post, Body, Request, Get } from '@nestjs/common';
import { IssuesService } from './issues.service';

@Controller()
export class IssuesController {
  constructor(private issService: IssuesService) { }


  @Get('issues/list')
  async getIssues(@Request() req) {
    return this.issService.findAll(req);
  }

  @Post('issues/store')
  async addIssue(@Request() req, @Body('payload') payload: any) {
    return this.issService.store(req, payload);
  }


}