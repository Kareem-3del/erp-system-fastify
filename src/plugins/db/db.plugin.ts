import 'reflect-metadata';
import fp from 'fastify-plugin';
import {createConnection, getConnectionOptions, Repository} from 'typeorm';
import {FastifyInstance} from "fastify";
import {User} from "../../modules/users/user.entity";

export default fp(async (server: FastifyInstance): Promise<FastifyInstance> => {
    try {
        const connectionOptions = await getConnectionOptions();
        Object.assign(connectionOptions, {
            options: {encrypt: true},
            entities: [User]
        });

        const connection = await createConnection(connectionOptions);
        server.log.info('Database connected');
        server.decorate('db', {
            users: connection.getRepository(User)
        });
        return server;
    } catch (error) {
        server.log.error(error);
        throw error;
    }
});