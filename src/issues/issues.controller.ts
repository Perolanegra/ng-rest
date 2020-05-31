
import { Controller, Post, Body, Request, Get } from '@nestjs/common';
import { IssuesService } from './issues.service';
import { CoreService } from 'src/core/core.service';

@Controller()
export class IssuesController {
  constructor(private issService: IssuesService, private core: CoreService) { }


  @Get('issues/list')
  async getIssues(@Request() req) {
    return this.issService.getAll(req);
  }

  @Post('issues/store')
  async addIssue(@Request() req, @Body('payload') payload: any) {
    // this.core.authorize(req, 'Sessão Expirada.', 'Realize o login novamente para poder criar o Issue.');
    return this.issService.store(payload);
  }


}