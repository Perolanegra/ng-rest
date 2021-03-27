import { Controller, Post, Body, Get, Request, Param, Req } from '@nestjs/common';
import { IssueService } from './issue.service';

@Controller('issues')
export class IssueController {
  constructor(private issService: IssueService) { }

  @Get('/list-general')
  async getGeneral() {
    return this.issService.getGeneral();
  }

  @Get('/list')
  async getAll(@Req() req: any) {
    return this.issService.getAll(req.query.pagination);
  }

  @Post('/store')
  async addIssue(@Request() req, @Body('payload') payload: any) {
    payload.token = req.headers.authorization.slice(7);
    return this.issService.store(payload);
  }

  @Get('/detail/:id')
  async getDetailById(@Param('id') id: string) {
    const parsedId = Number(id);
    return this.issService.getDetailsById({ id: parsedId });
  }

  @Get('/detail/poll/:id')
  async getPollDetailById(@Param('id') id: string) {
    const parsedId = Number(id);
    return this.issService.getPollDetailById({ id: parsedId });
  }

  // @Delete('issues/delete')
  // async delete() {
  //   this.issService.deleteAll();
  // }


}