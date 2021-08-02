import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'reflect-metadata';
import * as helmet from 'helmet';
import * as rateLimit from 'express-rate-limit';
import { HttpExceptionFilter } from './core/exception/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.HTTP_PORT;

  app.use(helmet());

  const options = {
    origin: 'http://ng-forum-webview.herokuapp.com/',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: true,
    optionsSuccessStatus: 200,
    credentials: true,
  };

  app.enableCors(options);

  app.use(
    rateLimit({
      windowMs: 1 * 60 * 1000, // 1 minutes
      max: 5, // limit each IP to 5 requests per windowMs
    }),
  );
  // app.enableCors({ origin: process.env.URL_FRONT });
  app.useGlobalFilters(new HttpExceptionFilter());

  await app
    .listen(port, () => {
      port
        ? console.log(`Serving at port ${port}`)
        : console.log('Necessário criar arquivo .env e apontar porta 3001');
    })
    .catch(err => {
      console.log('erro =>', err);
    });
}
bootstrap();
