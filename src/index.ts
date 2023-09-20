import createServer from './server';
import configHelper from "./utils/helpers/config.helper";
import {FastifyInstance} from "fastify";

const server: FastifyInstance = createServer();
server.listen({port: configHelper.get("port") || 3000}, (err) => {
    if (err) {
        server.log.error(err)
        process.exit(1)
    }
})

module.exports = server;
