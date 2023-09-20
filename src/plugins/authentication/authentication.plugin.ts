import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';

export async function authenticate(_request: FastifyRequest, reply: FastifyReply) {
    const isAuthenticated = false

    // logic to check if user is authenticated

    if (!isAuthenticated) {
        reply.code(401).send({ error: 'Unauthorized' });
    }
}

export async function AuthenticationPlugin (fastify: FastifyInstance):Promise<FastifyInstance> {
    return fastify.decorate('authenticate', authenticate);
}