import { HttpStatus } from '@nestjs/common';

export interface HTTPError {
  response?: string | object;
  statusCode?: HttpStatus;
  timestamp?: Date | string;
  path?: string;
}
