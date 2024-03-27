import { HttpException, HttpStatus } from '@nestjs/common';
import { HTTPError } from 'src/typing/interfaces';

export class Unauthorized extends HttpException {
  constructor(errorObject?: HTTPError) {
    const { response = 'You made an unauthorized request' } = errorObject;
    super(response, HttpStatus.UNAUTHORIZED);
  }
}
