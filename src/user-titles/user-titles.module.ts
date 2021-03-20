import { UserTitlesService } from './user-titles.service';
import { Module } from '@nestjs/common';
import { NgRepository } from 'src/core/ng-respository.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserTitles } from './user-titles.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserTitles])],
  controllers: [],
  providers: [UserTitlesService, NgRepository],
  exports: [UserTitlesService],
})
export class UserTitlesModule {}
