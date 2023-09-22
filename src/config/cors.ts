import { FastifyCorsOptions } from '@fastify/cors';

export const CorsConfig: FastifyCorsOptions = {
  origin: '*',
  methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};
