// errorHandler.js (or errorHandler.ts for TypeScript)

import {FastifyError, FastifyReply, FastifyRequest} from "fastify";
export const ErrorHandler = (error: FastifyError, request: FastifyRequest, reply: FastifyReply) => {
    request.log.error(error);

    if (reply.statusCode === 200) {
        reply.code(500);
    }

    // Serialize the error in a consistent format
    const serializedError = serializeError(error);

    reply.send({
        error: serializedError.name || 'Internal Server Error',
        message: serializedError.message || 'Something went wrong.'
    });
}

export function serializeError(error: Error) {
    return {
        name: error.name,
        statusCode: error['statusCode'] || 500,
        message: error.message,
    };
}