import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { NgRepository } from 'src/core/ng-respository.service';
import { ChatService } from './chat.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatController } from './chat.controller';
import { Chat } from './chat.entity';

@Module({
  providers: [
    ChatService,
    NgRepository,
  ],
  exports: [ChatService, TypeOrmModule],
  controllers: [ChatController],
  imports: [
    TypeOrmModule.forFeature([Chat]),
    AuthModule,
  ]
})
export class ChatModule { }