import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import "reflect-metadata";
import * as helmet from 'helmet';
import { HttpExceptionFilter } from './core/exception/http-exception.filter';
// const cors = require('cors');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT;

  app.use(helmet());
  app.enableCors({ origin: process.env.URL_FRONT })
  // var corsOptions = {
  //   origin: 'https://www.ng-forum.com',
  //   optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  // }
  // app.use(cors(corsOptions))
  // 
  app.useGlobalFilters(new HttpExceptionFilter());
  // app.use(
  //   rateLimit({
  //     windowMs: 1 * 60 * 1000, // 1 minutes
  //     max: 5, // limit each IP to 5 requests per windowMs
  //   }),
  // );

  await app.listen(port, () => {
    port ? console.log(`Serving at port ${port}`)
      : console.log('Necessário criar arquivo .env e apontar porta 3001');
  }).catch(err => {
    console.log('erro =>', err);
  });
}
bootstrap();
