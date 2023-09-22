import { FastifyError, FastifyReply, FastifyRequest } from 'fastify';
export const errorHandler = async (
  error: FastifyError,
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  reply.status(500);
  request.log.error(error);
  if (reply.statusCode === 200) {
    reply.code(500);
  }
  const httpError = {
    name: error.name,
    statusCode: error['statusCode'] || 500,
    message: error.message,
  };

  reply.code(httpError.statusCode);
  reply.send(httpError);
};
