import fastify, {
  FastifyHttpOptions,
  FastifyInstance,
  FastifyPluginAsync,
  FastifyPluginCallback,
  RawServerDefault,
} from 'fastify';

import fastifyCors from '@fastify/cors';
import fastifySwagger from '@fastify/swagger';
import configHelper from './utils/helpers/config.helper';
import fastifySwaggerUi from '@fastify/swagger-ui';
import { errorHandler } from './exceptions';
import {
  CorsConfig,
  LoggerConfig,
  SwaggerConfig,
  SwaggerUiConfig,
} from './config';
import { IRoute } from './interfaces';
import { IModule } from './interfaces';

class FastifyServer {
  public fastify: FastifyInstance;

  constructor(
    plugins: Array<FastifyPluginAsync | FastifyPluginCallback> = [],
    modules: IModule[] = [],
    options?: FastifyHttpOptions<RawServerDefault, any>,
  ) {
    this.fastify = fastify({
      ...options,
      logger: LoggerConfig,
    });

    // Configure Swagger and Swagger UI
    this.fastify.register(fastifySwagger, SwaggerConfig);
    this.fastify.register(fastifySwaggerUi, SwaggerUiConfig);

    // Configure CORS
    this.fastify.register(fastifyCors, CorsConfig);

    // Initialize Plugins & Routes
    this.init(plugins, modules);

    // Configure Error Handler
    this.fastify.setErrorHandler(errorHandler);
  }

  /**
   * Initialize plugins and modules
   * @param plugins
   * @param modules
   * @private
   */
  private init(
    plugins: Array<FastifyPluginCallback | FastifyPluginAsync>,
    modules: IModule[],
  ) {
    plugins?.forEach((plugin) => this.fastify.register(plugin));

    modules.forEach((Module: IModule) => {
      // Register module
      this.fastify.register(
        (instance: FastifyInstance, opts: any, next: () => void) => {
          try {
            const module = new Module(this.fastify, opts, next);
            instance.log.info(`${module.constructor.name} module initialized`);
            if (module.services) {
              module.services.forEach((service) => {
                instance.decorate(service.name, service.handler(instance));
                instance.log.info(
                  `Service ${service.name} registered 'fastify.${service.name}' decorator`,
                );
              });
            }
            if (module.routes)
              module.routes.forEach((route: IRoute) => {
                instance.log.info(
                  `Route ${route.route.method} ${route.route.url} registered`,
                );
                instance.route({
                  ...route.route,
                  schema: { tags: route.tags, ...route.route.schema },
                  url: `${module?.prefix || ''}${route.route.url}`,
                });
              });
            next();
          } catch (e) {
            instance.log.error(e);
            throw e;
          }
        },
      );
    });
  }

  public listen() {
    this.fastify.listen({ port: configHelper.get('port') || 3000 }, (err) => {
      if (err) {
        this.fastify.log.error(err);
        process.exit(1);
      }
    });
  }
}

export default FastifyServer;
