import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhotoService } from './photos.service';
import { Photos } from './photos.entity';

@Module({
  providers: [PhotoService],
  exports: [PhotoService, TypeOrmModule],
  imports: [
    TypeOrmModule.forFeature([Photos])
  ]
})
export class PhotosModule {}
