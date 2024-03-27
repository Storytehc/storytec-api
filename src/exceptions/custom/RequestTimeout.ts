import { HttpException, HttpStatus } from '@nestjs/common';
import { HTTPError } from 'src/typing/interfaces';

export class RequestTimeout extends HttpException {
  constructor(errorObject?: HTTPError) {
    const { response = 'Request timed out' } = errorObject;
    super(response, HttpStatus.REQUEST_TIMEOUT);
  }
}
