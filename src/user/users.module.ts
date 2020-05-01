import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';

@Module({
  providers: [UsersService],
  exports: [UsersService, TypeOrmModule],
  controllers: [UserController],
  imports: [
    TypeOrmModule.forFeature([User])
  ]
})
export class UsersModule {}
