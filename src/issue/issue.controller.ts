
import { Controller, Post, Body, Get, Request, Delete } from '@nestjs/common';
import { IssueService } from './issue.service';

@Controller()
export class IssueController {
  constructor(private issService: IssueService) { }

  @Get('issues/list-general')
  async getGeneral() {
    return this.issService.getGeneral();
  }

  @Get('issues/list')
  async getAll() {
    return this.issService.getAll();
  }

  @Post('issues/store')
  async addIssue(@Request() req, @Body('payload') payload: any) {
    payload.token = req.headers.authorization.slice(7);
    return this.issService.store(payload);
  }

  // @Delete('issues/delete')
  // async delete() {
  //   this.issService.deleteAll();
  // }


}