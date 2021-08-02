import { TitlesService } from './titles.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Titles } from './titles.entity';
import { NgRepository } from 'src/core/ng-respository.service';

@Module({
  imports: [TypeOrmModule.forFeature([Titles])],
  controllers: [],
  providers: [TitlesService, NgRepository],
  exports: [TitlesService],
})
export class TitlesModule {}
