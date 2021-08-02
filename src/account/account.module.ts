import { AccountService } from './account.service';
import { Module } from '@nestjs/common';
import { NgRepository } from 'src/core/ng-respository.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from './account.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Account]),
  ],
  controllers: [],
  providers: [
      AccountService,
      NgRepository
    ],
  exports: [
    AccountService,
    TypeOrmModule
  ]
})
export class AccountModule {}
