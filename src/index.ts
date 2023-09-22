import FastifyServer from './server';
import AuthenticationPlugin from './plugins/authentication';
import DatabasePlugin from './plugins/database';
import { UserModule } from './modules/users/user.module';
import TrackingPlugin from './plugins/tracking/tracking.plugin';
import CookiesPlugin from '@fastify/cookie';
import { SalesModule } from './modules/sales/sales.module';
import SendMailPlugin from './plugins/send-mail/send-mail.plugin';
import SendSaleMailPlugin from './plugins/send-sale-mail/send-sale-mail.plugin';

// Can inject plugins and modules here
const server: FastifyServer = new FastifyServer(
  [
    DatabasePlugin,
    CookiesPlugin,
    AuthenticationPlugin,
    TrackingPlugin,
    SendMailPlugin,
    SendSaleMailPlugin,
  ],
  [UserModule, SalesModule],
  {},
);
server.listen();
