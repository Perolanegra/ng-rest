import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { PostService } from 'src/post/post.service';
import { NgRepository } from 'src/core/ng-respository.service';
import { IssueTextContentService } from 'src/issue-text-content/issue-text-content.service';
import { AccountService } from 'src/account/account.service';

@Module({
  providers: [
    UsersService,
    NgRepository,
    IssueTextContentService,
    PostService,
    AccountService
  ],
  exports: [UsersService, TypeOrmModule],
  controllers: [UserController],
  imports: [
    TypeOrmModule.forFeature([User]),
  ]
})
export class UsersModule {}
