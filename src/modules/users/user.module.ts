import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import {
  loginSchema,
  meSchema,
  registerSchema,
  getProfileSchema,
  searchSchema,
} from './schemas/schemas';
import usersService from './user.service';
import { IModuleBase, IRoute, IService } from '../../interfaces';
export class UserModule implements IModuleBase {
  fastify: FastifyInstance;
  prefix = '/users';
  constructor(fastify: FastifyInstance) {
    this.fastify = fastify;
    this.routes = [
      {
        tags: ['auth'],
        route: {
          method: 'POST',
          url: '/login',
          schema: loginSchema,
          handler: async (req: FastifyRequest, reply: FastifyReply) => {
            const { username, password } = req.body as {
              username: string;
              password: string;
            };
            reply.send(await req.server.users.login(username, password));
          },
        },
      },
      {
        tags: ['auth'],
        route: {
          method: 'POST',
          url: '/register',
          schema: registerSchema,
          handler: async (req: FastifyRequest, reply: FastifyReply) => {
            reply.send(
              await req.server.users.getProfile(req.params?.['userId']),
            );
          },
        },
      },
      {
        tags: ['auth'],
        route: {
          method: 'GET',
          url: '/me',
          schema: meSchema,
          preValidation: [this.fastify.authenticate],
          handler: async (req: FastifyRequest, reply: FastifyReply) => {
            reply.send(
              await req.server.users.getProfile(req.params?.['userId']),
            );
          },
        },
      },
      {
        tags: ['auth'],
        route: {
          method: 'GET',
          url: '/search',
          schema: searchSchema,
          handler: async (req: FastifyRequest, reply: FastifyReply) => {
            reply.send(
              await req.server.users.getProfile(req.params?.['userId']),
            );
          },
        },
      },
      {
        tags: ['auth'],
        route: {
          method: 'GET',
          url: '/:userId',
          schema: getProfileSchema,
          handler: async (req: FastifyRequest, reply: FastifyReply) => {
            reply.send(
              await req.server.users.getProfile(req.params?.['userId']),
            );
          },
        },
      },
    ];
  }
  services: IService[] = [{ name: 'users', handler: usersService }];
  routes: IRoute[];
}
