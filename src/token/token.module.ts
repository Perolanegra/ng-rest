import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokenService } from './token.service';
import { Token } from './token.entity';

@Module({
  providers: [TokenService],
  exports: [TokenService, TypeOrmModule],
  imports: [
    TypeOrmModule.forFeature([Token])
  ]
})
export class TokenModule {}
