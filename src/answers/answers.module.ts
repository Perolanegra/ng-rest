import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnswersService } from './answers.service';
import { Answers } from './answers.entity';

@Module({
  providers: [AnswersService],
  exports: [AnswersService, TypeOrmModule],
  imports: [
    TypeOrmModule.forFeature([Answers])
  ]
})
export class AnswersModule {}
