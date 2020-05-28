import { Module } from '@nestjs/common';
import { IssuesService } from './issues.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Issues } from './issues.entity';

@Module({
  providers: [IssuesService],
  exports: [IssuesService, TypeOrmModule],
  imports: [
    TypeOrmModule.forFeature([Issues])
  ]
})
export class IssuesModule {}
