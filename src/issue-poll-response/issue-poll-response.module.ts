import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NgRepository } from 'src/core/ng-respository.service';
import { IssuePollResponseService } from './issue-poll-response.service';
import { IssuePollResponse } from './issue-poll-response.entity';

@Module({
  providers: [IssuePollResponseService, NgRepository],
  exports: [IssuePollResponseService, TypeOrmModule],
  imports: [
    TypeOrmModule.forFeature([IssuePollResponse])
  ]
})
export class IssuePollResponseModule {}
