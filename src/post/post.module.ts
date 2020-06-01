import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostService } from './post.service';
import { Post } from './post.entity';
import { NgRepository } from 'src/core/ng-respository.service';

@Module({
  providers: [PostService, NgRepository],
  exports: [PostService, TypeOrmModule],
  imports: [
    TypeOrmModule.forFeature([Post])
  ]
})
export class PostModule {}
