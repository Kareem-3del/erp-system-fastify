import { Database } from '../src/plugins/db/db.interface';
import { IAuthenticationPlugin } from '../src/plugins/authentication';
import { User } from '../src/modules/users/entities/user.entity';
import { IUsersService } from '../src/modules/users/service';

declare module 'fastify' {
  interface FastifyInstance {
    db: Database;
    userService: IUsersService;
    authenticate: IAuthenticationPlugin;
  }

  interface FastifyRequest {
    user?: User;
  }
}
