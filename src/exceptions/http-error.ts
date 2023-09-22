export class HttpError extends Error {
  status: number;
  constructor(message: string, status: number, name?: string) {
    super();
    Error.captureStackTrace(this, this.constructor);
    this.name = name || 'INTERNAL_SERVER_ERROR';
    this.message = message;
    this.status = status || 500;
  }
}
