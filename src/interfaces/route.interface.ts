import { RouteOptions } from 'fastify';

export interface IRoute {
  tags: string[];
  route: RouteOptions;
}
