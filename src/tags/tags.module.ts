import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tags } from './tags.entity';
import { TagsService } from './tags.service';

@Module({
  providers: [TagsService],
  exports: [TagsService, TypeOrmModule],
  imports: [
    TypeOrmModule.forFeature([Tags])
  ]
})
export class TagsModule {}
