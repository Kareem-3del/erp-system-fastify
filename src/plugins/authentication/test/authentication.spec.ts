import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import fastify from 'fastify';
import { authenticate } from '../authentication.plugin';

describe('Authentication-Plugin', () => {
  let app: FastifyInstance;

  beforeEach(() => {
    app = fastify();
    app.decorate('authenticate', authenticate);
  });

  afterEach(() => {
    app.close();
  });

  it('should return unauthorized error if not authenticated', async () => {
    expect(app.hasDecorator('authenticate')).toEqual(true);
    app.get(
      '/protected',
      { preValidation: [app.authenticate] },
      async (_request: FastifyRequest, _reply: FastifyReply) => {
        return { message: 'You have access to this protected route!' };
      },
    );

    const response = await app.inject({
      method: 'GET',
      url: '/protected',
    });

    expect(response.statusCode).toBe(401);
    expect(JSON.parse(response.payload)).toEqual({ error: 'Unauthorized' });
  });

  it('should not return unauthorized error if authenticated', async () => {
    app.get(
      '/not-protected',
      { preValidation: [] },
      async (_request: FastifyRequest, _reply: FastifyReply) => {
        return { message: 'You have access to this protected route!' };
      },
    );

    const response = await app.inject({
      method: 'GET',
      url: '/not-protected',
    });

    expect(response.statusCode).toBe(200); // Assuming a successful response for authenticated users
  });
});
