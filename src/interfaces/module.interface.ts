import { IRoute } from './route.interface';
import { IService } from './service.interface';
import { FastifyInstance } from 'fastify';

export interface IModuleBase {
  constructor: Function;
  version?: string;
  prefix?: string;
  decorates?: Function[];
  fastify: FastifyInstance;
  routes: IRoute[];
  services: IService[];
}

export type IModule<TOptions = Object> = {
  new (
    fastify: FastifyInstance,
    options: TOptions,
    next: () => void,
  ): IModuleBase;
};
