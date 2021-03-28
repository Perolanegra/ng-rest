import { Module } from '@nestjs/common';
import { IssueService } from './issue.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Issue } from './issue.entity';
import { IssueController } from './issue.controller';
import { AuthModule } from 'src/auth/auth.module';
import { TagsService } from 'src/tags/tags.service';
import { Tags } from 'src/tags/tags.entity';
import { NgRepository } from 'src/core/ng-respository.service';
import { TokenService } from 'src/token/token.service';
import { PostService } from 'src/post/post.service';
import { Token } from 'src/token/token.entity';
import { IssuePollService } from 'src/issue-poll/issue-poll.service';
import { IssuePollResponseService } from 'src/issue-poll-response/issue-poll-response.service';
import { IssueTextContentService } from 'src/issue-text-content/issue-text-content.service';
import { IssueViewsService } from 'src/issue-views/issue-views.service';

@Module({
  providers: [
    IssueService,
    TagsService,
    NgRepository,
    TokenService,
    PostService,
    IssuePollService,
    IssuePollResponseService,
    IssueTextContentService,
    IssueViewsService
  ],
  exports: [IssueService, TypeOrmModule],
  controllers: [IssueController],
  imports: [
    TypeOrmModule.forFeature([Issue, Tags, Token]),
    AuthModule,
  ]
})
export class IssueModule { }