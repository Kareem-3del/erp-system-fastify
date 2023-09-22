import { HttpError } from './http-error';

export class WrongCredentialsException extends HttpError {
  constructor() {
    super('Wrong credentials provided', 400, 'WRONG_CREDENTIALS');
  }
}
