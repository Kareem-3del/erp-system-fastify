import 'reflect-metadata';
import fp from 'fastify-plugin';
import { DataSource, DataSourceOptions } from 'typeorm';
import { FastifyInstance } from 'fastify';
import { User } from '../../modules/users/entities/user.entity';
import options from '../../../ormconfig.json';
import { Sale } from '../../modules/sales/sale.entity';

export default fp(async (server: FastifyInstance): Promise<FastifyInstance> => {
  try {
    const AppDataSource = new DataSource({
      ...(options as DataSourceOptions),
      entities: [User],
    });

    const connection = await AppDataSource.initialize();
    server.log.info('Database connected');
    server.decorate('db', {
      users: connection.getRepository(User),
      sales: connection.getRepository(Sale),
    });
    server.addHook('onClose', async () => {
      server.log.debug('Closing database connection');
      await connection.destroy();
    });
    return server;
  } catch (error) {
    server.log.error(error);
    throw error;
  }
});
