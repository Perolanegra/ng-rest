
import { Controller, Post, Body, Request, Get, Param, Req, } from '@nestjs/common';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
  constructor(private postService: PostService) { }

  @Post('/add')
  async addIssue(@Body('payload') payload: any) {
    return this.postService.add(payload);
  }

  @Post('/store/stars')
  async updateStars(@Request() req, @Body('payload') payload: any) {
    return this.postService.updateStars(payload);
  }

  
 

}