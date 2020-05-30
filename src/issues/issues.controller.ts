
import { Controller, Post, Body, Request } from '@nestjs/common';
import { IssuesService } from './issues.service';

@Controller()
export class IssuesController {
  constructor(private issService: IssuesService) { 
  }


  @Post('issues/store')
  async resetPass(@Request() req, @Body('payload') payload: any) {
    return this.issService.store(req, payload);
  }


}