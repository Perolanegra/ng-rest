
import { Controller, Post, Body, Request, Get, Param, Req, } from '@nestjs/common';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
  constructor(private postService: PostService) { }

  @Post('/add')
  async addIssue(@Body('payload') payload: any) {
    return this.postService.add(payload);
  }

  // @Get('/teste')
  // async teste(@Req() req: any) {
  //   return this.postService.getCountByIdAuthor({ id_author: req.query.id_author });
  // }
 

}