import { Database } from '../plugins/database';
import { IAuthenticationPlugin } from '../plugins/authentication';
import { User } from '../modules/users/entities/user.entity';
import { IUserService } from '../modules/users/user.service';
import { ObjectID } from 'typeorm';
import { ISalesService } from '../modules/sales/sales.service';

declare module 'fastify' {
  interface FastifyInstance {
    db: Database;
    users: IUserService;
    authenticate: IAuthenticationPlugin;
    sales: ISalesService;
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
