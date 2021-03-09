
import { Controller, Request, Get } from '@nestjs/common';
import { TagsService } from './tags.service';

@Controller()
export class TagsController {
  constructor(private tagService: TagsService) { }

  @Get('tags/list')
  async list(@Request() req) {
    return this.tagService.list();
  }

}