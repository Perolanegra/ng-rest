import { Module } from '@nestjs/common';
import { IssuesService } from './issues.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Issues } from './issues.entity';
import { IssuesController } from './issues.controller';
import { AuthModule } from 'src/auth/auth.module';
import { CoreService } from 'src/core/core.service';
import { TagsService } from 'src/tags/tags.service';
import { Tags } from 'src/tags/tags.entity';

@Module({
  providers: [IssuesService, CoreService, TagsService],
  exports: [IssuesService, TypeOrmModule],
  controllers: [IssuesController],
  imports: [
    TypeOrmModule.forFeature([Issues, Tags]),
    AuthModule,
  ]
})
export class IssuesModule {}