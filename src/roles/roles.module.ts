import { RolesService } from './roles.service';
import { Module } from '@nestjs/common';
import { NgRepository } from 'src/core/ng-respository.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Roles } from './roles.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Roles])],
  controllers: [],
  providers: [RolesService, NgRepository],
  exports: [RolesService],
})
export class RolesModule {}
