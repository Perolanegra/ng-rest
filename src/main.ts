import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import "reflect-metadata";
import * as helmet from 'helmet';
import * as rateLimit from 'express-rate-limit';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: false });
  const port = process.env.PORT || 3000;

  app.use(helmet());

  app.use(
    rateLimit({
      windowMs: 1 * 60 * 1000, // 1 minutes
      max: 5, // limit each IP to 5 requests per windowMs
    }),
  );

  await app.listen(port);
}
bootstrap();
