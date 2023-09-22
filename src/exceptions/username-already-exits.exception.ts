import { HttpError } from './http-error';

export class EmailAlreadyExitsException extends HttpError {
  constructor() {
    super('username already exits', 400, 'USERNAME_ALREADY_EXITS');
  }
}
