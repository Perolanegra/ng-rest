import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './user/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';

@Module({
  imports: [
    AuthModule, 
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'ng',
      password: '1061043$',
      database: 'ng_ba',
      entities: [User],
      synchronize: true,
      autoLoadEntities: true,
    }),
  ],
  providers: [AppService],
})
export class AppModule {}
