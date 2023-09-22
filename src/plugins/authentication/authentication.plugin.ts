import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import fp from 'fastify-plugin';

export async function authenticate(
  _request: FastifyRequest,
  reply: FastifyReply,
) {
  const isAuthenticated = false;

  // logic to check if user is authenticated

  if (!isAuthenticated) {
    reply.code(401).send({ error: 'Unauthorized' });
  }
}

export default fp(async (server: FastifyInstance): Promise<FastifyInstance> => {
  return server.decorate('authenticate', authenticate);
});
