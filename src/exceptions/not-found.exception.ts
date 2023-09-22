import { HttpError } from './http-error';

export class NotFoundException extends HttpError {
  constructor(message: string) {
    super(message, 404, 'NOT_FOUND');
  }
}
