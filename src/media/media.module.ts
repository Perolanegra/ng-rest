import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Media } from './media.entity';
import { MediaService } from './media.service';
import { NgRepository } from 'src/core/ng-respository.service';

@Module({
  providers: [MediaService, NgRepository],
  exports: [MediaService, TypeOrmModule],
  imports: [
    TypeOrmModule.forFeature([Media])
  ]
})
export class MediaModule {}
