import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NgRepository } from 'src/core/ng-respository.service';
import { IssuePollService } from './issue-poll.service';
import { IssuePoll } from './issue-poll.entity';

@Module({
  providers: [IssuePollService, NgRepository],
  exports: [IssuePollService, TypeOrmModule],
  imports: [
    TypeOrmModule.forFeature([IssuePoll])
  ]
})
export class IssuePollModule {}
