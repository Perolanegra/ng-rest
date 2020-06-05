import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import "reflect-metadata";
import * as helmet from 'helmet';
import * as rateLimit from 'express-rate-limit';
// const cors = require('cors');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3000;
  app.use(helmet());
  app.enableCors({ origin: 'https://www.ng-forum.com/' })
  // var corsOptions = {
  //   origin: 'https://www.ng-forum.com',
  //   optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  // }
  // app.use(cors(corsOptions))
  // 
  app.use(
    rateLimit({
      windowMs: 1 * 60 * 1000, // 1 minutes
      max: 5, // limit each IP to 5 requests per windowMs
    }),
  );

  await app.listen(port);
}
bootstrap();
