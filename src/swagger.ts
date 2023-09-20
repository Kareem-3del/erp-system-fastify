import {SwaggerOptions} from "@fastify/swagger";
import {FastifySwaggerUiOptions} from "@fastify/swagger-ui";
import configHelper from "./utils/helpers/config.helper";

export const swaggerOptions: SwaggerOptions = {
    swagger: {
        info: {
            title: 'ERP API documentation',
            description: 'ERP API documentation',
            version: '0.1.0'
        },
        externalDocs: {
            url: 'https://swagger.io',
            description: 'Find more info here'
        },
        host: `localhost:${configHelper.get('PORT')}`,
        schemes: ['http'],
        consumes: ['application/json'],
        produces: ['application/json'],
        tags: [
            {name: 'users', description: 'Users related end-points'},
        ],
        definitions: {
            User: {
                type: 'object',
                required: ['id', 'email'],
                properties: {
                    _id: {type: 'string', format: 'uuid'},
                    username: {type: 'string'},
                    email: {type: 'string', format: 'email'},
                    created_at: {type: 'string', format: 'date-time'},
                    updated_at: {type: 'string', format: 'date-time'},
                }
            }
        },
    },
}



export const swaggerUiOptions : FastifySwaggerUiOptions = {
    routePrefix: '/docs',
    uiConfig: {
        docExpansion: 'full',
        deepLinking: false,
    },
    staticCSP: false,
    transformStaticCSP: (header) => header,
    transformSpecification: (swaggerObject, _request, _reply) => {
        return swaggerObject
    },
    transformSpecificationClone: true
}
