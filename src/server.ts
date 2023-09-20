import fastify, {
    FastifyError,
    FastifyHttpOptions,
    FastifyInstance,
    FastifyReply,
    FastifyRequest,
    RawServerDefault
} from 'fastify';

import db from './plugins/db/db.plugin';
import fastifyCors, {FastifyCorsOptions} from "@fastify/cors";
import fastifySwagger from "@fastify/swagger";
import configHelper from "./utils/helpers/config.helper";
import fastifySwaggerUi from "@fastify/swagger-ui";
import {swaggerOptions, swaggerUiOptions} from "./swagger";
import {ErrorHandler} from "./utils/error-handler";
import users from "./modules/users";
import {authenticate, AuthenticationPlugin} from "./plugins/authentication";
import usersService from "./modules/users/service";
import errors from "./errors";

const envToLogger = {
    development: {
        transport: {
            target: 'pino-pretty',
            options: {
                translateTime: 'HH:MM:ss',
                ignore: 'pid,hostname',
            },
        },
    },
    production: true,
    test: false,
}


function createServer(options?: FastifyHttpOptions<RawServerDefault, any>): FastifyInstance {

    const server: FastifyInstance = fastify({
        ...options,
        logger: envToLogger[configHelper.get("NODE_ENV")] ?? true // defaults to true if no entry matches in the map
    });


    server.register(fastifySwagger, swaggerOptions);
    server.register(fastifySwaggerUi, swaggerUiOptions)
    server.register(fastifyCors, {
        origin: '*',
        methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    } as FastifyCorsOptions)

    server.register(db);

    server.decorate('authenticate', authenticate)

    server.register(users)

    server.setErrorHandler(function (error: FastifyError, _request: FastifyRequest, reply: FastifyReply): void {
        const message = error.message
        if (errors[message]) {
            reply.statusCode = errors[message].statusCode
            reply.send(errors[message])
        }
        reply.send({
            code: message,
            message: errors[message] || message || 'Internal Server Error',
            statusCode: reply.statusCode
        })

    })
    return server;
}


export default createServer;
