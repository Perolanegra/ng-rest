import { Module } from '@nestjs/common';
import { IssuesService } from './issues.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Issues } from './issues.entity';
import { IssuesController } from './issues.controller';
import { AuthModule } from 'src/auth/auth.module';
import { CoreService } from 'src/core/core.service';

@Module({
  providers: [IssuesService, CoreService],
  exports: [IssuesService, TypeOrmModule],
  controllers: [IssuesController],
  imports: [
    TypeOrmModule.forFeature([Issues]),
    AuthModule
  ]
})
export class IssuesModule {}