import { Module } from '@nestjs/common';
import { IssuesService } from './issues.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Issues } from './issues.entity';
import { IssuesController } from './issues.controller';
import { AuthModule } from 'src/auth/auth.module';
import { TagsService } from 'src/tags/tags.service';
import { Tags } from 'src/tags/tags.entity';
import { NgRepository } from 'src/core/ng-respository.service';
import { TokenService } from 'src/token/token.service';
import { PostService } from 'src/post/post.service';
import { Token } from 'src/token/token.entity';

@Module({
  providers: [IssuesService, TagsService, NgRepository, TokenService, PostService],
  exports: [IssuesService, TypeOrmModule],
  controllers: [IssuesController],
  imports: [
    TypeOrmModule.forFeature([Issues, Tags, Token]),
    AuthModule,
  ]
})
export class IssuesModule {}