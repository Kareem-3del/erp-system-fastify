import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { IModuleBase, IRoute, IService } from '../../interfaces';
import salesService from './sales.service';

export class SalesModule implements IModuleBase {
  fastify: FastifyInstance;
  prefix = '/sales';

  constructor(fastify: FastifyInstance) {
    this.fastify = fastify;
    this.routes = [
      {
        tags: ['sales'],
        route: {
          method: 'GET',
          url: '/:saleId',
          schema: {},
          handler: async (req: FastifyRequest, reply: FastifyReply) => {
            reply.send(await req.server.sales.get(req.params?.['saleId']));
          },
        },
      },
      {
        tags: ['sales'],
        route: {
          method: 'POST',
          url: '/',
          schema: {},
          handler: async (req: FastifyRequest, reply: FastifyReply) => {
            reply.send(
              await req.server.sales.create('productId', 'customerId', 100),
            );
          },
        },
      },
    ];
  }

  services: IService[] = [{ name: 'sales', handler: salesService }];
  routes: IRoute[];
}
