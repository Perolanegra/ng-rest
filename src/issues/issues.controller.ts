
import { Controller, Post, Body, Get, Request, Delete } from '@nestjs/common';
import { IssuesService } from './issues.service';

@Controller()
export class IssuesController {
  constructor(private issService: IssuesService) { }

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