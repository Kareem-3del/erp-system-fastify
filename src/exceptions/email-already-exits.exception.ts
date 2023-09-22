import { HttpError } from './http-error';

export class EmailAlreadyExitsException extends HttpError {
  constructor() {
    super('Email already exits', 400, 'EMAIL_ALREADY_EXITS');
  }
}
