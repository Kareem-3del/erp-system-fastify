/**
 * @deprecated This file is deprecated and will be removed in future versions.
 * @TODO: Remove this file in future versions.
 */

import { Database } from '../plugins/database';
import { IAuthenticationPlugin } from '../plugins/authentication';
import { User } from '../modules/users/entities/user.entity';
import { IUserService } from '../modules/users/user.service';

import { ObjectID } from 'typeorm';

declare module 'fastify' {
  interface FastifyInstance {
    db: Database;
    users: IUserService;
    authenticate: IAuthenticationPlugin;
  }

  interface FastifyRequest {
    user?: User;
    trackingId?: ObjectID | string;
    sessionId?: string;
    isBot?: boolean;
    service?: boolean;
    premium?: boolean;
    roles?: Roles[];
  }
}
