import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException
} from '@nestjs/common';
import { Request, Response } from 'express';
import { HTTPError } from 'src/typing/interfaces';

@Catch(HttpException)
export class HTTPExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    const responseObject: HTTPError = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      request_type: request.method
    };

    response.status(status).json(responseObject);
  }
}
