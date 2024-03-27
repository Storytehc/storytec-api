import { HttpException, HttpStatus } from '@nestjs/common';
import { HTTPError } from 'src/typing/interfaces';

export class NotFound extends HttpException {
  constructor(errorObject?: HTTPError) {
    const { response = 'Resource was not found' } = errorObject;
    super(response, HttpStatus.NOT_FOUND);
  }
}
