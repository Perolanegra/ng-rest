
import { Controller, Post, Body, Get } from '@nestjs/common';
import { IssuesService } from './issues.service';

@Controller()
export class IssuesController {
  constructor(private issService: IssuesService) { }

  @Get('issues/list')
  async getIssues() {
    return this.issService.getAll();
  }

  @Post('issues/store')
  async addIssue(@Body('payload') payload: any) {
    return this.issService.store(payload);
  }


}