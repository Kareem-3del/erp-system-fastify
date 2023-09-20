import {FastifyReply, FastifyRequest} from "fastify";

export type IAuthenticationPlugin = (request: FastifyRequest, reply: FastifyReply) => Promise<void>;