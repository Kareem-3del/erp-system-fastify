import { User } from '../entities/user.entity';
import { FastifySchema } from 'fastify';

export const UserSchema = {
  type: 'object',
  properties: {
    _id: { type: 'string' },
    username: { type: 'string' },
    email: { type: 'string' },
  },
};
export const registerSchema: FastifySchema = {
  body: {
    type: 'object',
    required: ['username', 'password'],
    properties: {
      username: { type: 'string' },
      password: { type: 'string' },
      email: { type: 'string' },
    },
    additionalProperties: false,
  },
  response: {
    200: {
      type: 'object',
      properties: {
        user: UserSchema,
      },
    },
    412: {
      type: 'object',
      properties: {
        code: { type: 'string' },
        message: { type: 'string' },
      },
    },
    500: {
      type: 'object',
      properties: {
        code: { type: 'string' },
        message: { type: 'string' },
      },
    },
  },
};

export const loginSchema: FastifySchema = {
  body: {
    type: 'object',
    required: ['username', 'password'],
    properties: {
      username: { type: 'string' },
      password: { type: 'string' },
    },
    additionalProperties: false,
  },
  response: {
    200: UserSchema,
  },
};

export const meSchema: FastifySchema = {
  response: {
    200: {
      type: 'object',
      properties: {
        _id: { type: 'string' },
        username: { type: 'string' },
        email: { type: 'string' },
      },
    },
    401: {
      type: 'object',
      properties: {
        code: { type: 'string' },
        message: { type: 'string' },
      },
    },
  },
};

export const userSchema: FastifySchema = {
  params: {
    type: 'object',
    required: ['userId'],
    properties: {
      userId: { type: 'string' },
    },
    additionalProperties: false,
  },
  response: {
    200: User,
    401: {
      type: 'object',
      properties: {
        code: { type: 'string' },
        message: { type: 'string' },
      },
    },
  },
};

export const searchSchema: FastifySchema = {
  querystring: {
    type: 'object',
    required: ['search'],
    properties: {
      search: { type: 'string' },
    },
    additionalProperties: false,
  },
  response: {
    200: {
      type: 'array',
      items: UserSchema,
    },
    401: {
      type: 'object',
      properties: {
        code: { type: 'string' },
        message: { type: 'string' },
      },
    },
  },
};

export const getProfileSchema: FastifySchema = {
  params: {
    type: 'object',
    required: ['userId'],
    properties: {
      userId: { type: 'string' },
    },
    additionalProperties: false,
  },
  response: {
    200: UserSchema,
    401: {
      type: 'object',
      properties: {
        code: { type: 'string' },
        message: { type: 'string' },
      },
    },
  },
};
