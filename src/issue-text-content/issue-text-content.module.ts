import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NgRepository } from 'src/core/ng-respository.service';
import { IssueTextContentService } from './issue-text-content.service';
import { IssueTextContent } from './issue-text-content.entity';

@Module({
  providers: [IssueTextContentService, NgRepository],
  exports: [IssueTextContentService, TypeOrmModule],
  imports: [
    TypeOrmModule.forFeature([IssueTextContent])
  ]
})
export class IssueTextContentModule {}
