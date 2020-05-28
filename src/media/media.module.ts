import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Media } from './media.entity';
import { MediaService } from './media.service';

@Module({
  providers: [MediaService],
  exports: [MediaService, TypeOrmModule],
  imports: [
    TypeOrmModule.forFeature([Media])
  ]
})
export class MediaModule {}
