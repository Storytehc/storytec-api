import { HttpException, HttpStatus } from '@nestjs/common';
import { HTTPError } from 'src/typing/interfaces';

export class BadRequest extends HttpException {
  constructor(errorObject?: HTTPError) {
    const { response = 'You made a bad request' } = errorObject;
    super(response, HttpStatus.BAD_REQUEST);
  }
}
