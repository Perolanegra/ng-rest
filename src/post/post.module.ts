import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostService } from './post.service';
import { Post } from './post.entity';

@Module({
  providers: [PostService],
  exports: [PostService, TypeOrmModule],
  imports: [
    TypeOrmModule.forFeature([Post])
  ]
})
export class PostModule {}
