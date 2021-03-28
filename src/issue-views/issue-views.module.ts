import { IssueViewsService } from './issue-views.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IssueViews } from './issue-views.entity';
import { NgRepository } from 'src/core/ng-respository.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([IssueViews]),
  ],
  controllers: [],
  providers: [IssueViewsService, NgRepository],
  exports: [
    IssueViewsService
  ]
})
export class IssueViewsModule {}
