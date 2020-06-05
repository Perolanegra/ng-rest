import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tags } from './tags.entity';
import { TagsService } from './tags.service';
import { TagsController } from './tags.controller';
import { CoreService } from 'src/core/core.service';
import { AuthModule } from 'src/auth/auth.module';
import { NgRepository } from 'src/core/ng-respository.service';

@Module({
  providers: [TagsService, CoreService, NgRepository],
  exports: [TagsService, TypeOrmModule],
  controllers: [TagsController],
  imports: [
    TypeOrmModule.forFeature([Tags]),
    AuthModule
  ]
})
export class TagsModule {}
