import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const style = { posTop: '5vh', posBottom: null, posLeft: null, posRight: null };

    response
      .status(status)
      .json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        message: exception.message,
        title: exception.name,
        type: 'error',
        style: style,
        path: request.url,
      });
  }
}