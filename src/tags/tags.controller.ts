
import { Controller, Post, Body, Request, Get } from '@nestjs/common';
import { TagsService } from './tags.service';
import { CoreService } from 'src/core/core.service';

@Controller()
export class TagsController {
  constructor(private tagService: TagsService, private core: CoreService) { }


  @Get('tags/list')
  async getIssues(@Request() req) {
    this.core.authorize(req, 'Acesso Expirado.', 'Realize o login novamente.');
    return this.tagService.getAll(req);
  }


}