import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostService } from './post.service';
import { Post } from './post.entity';
import { NgRepository } from 'src/core/ng-respository.service';
import { PostController } from './post.controller';
import { IssueTextContentService } from 'src/issue-text-content/issue-text-content.service';

@Module({
  providers: [PostService, NgRepository, IssueTextContentService],
  exports: [PostService, TypeOrmModule],
  controllers: [PostController],
  imports: [TypeOrmModule.forFeature([Post])],
})
export class PostModule {}
