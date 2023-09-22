import { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';

declare module 'fastify' {
  interface FastifyInstance {
    sendSaleMail: (saleId: string, email: string) => Promise<void>;
  }
}
const plugin = async (fastify: FastifyInstance): Promise<void> => {
  fastify.decorate('sendSaleMail', async (saleId: string, email: string) => {
    const sale = await fastify.sales.get(saleId);
    if (!sale) {
      throw new Error('Sale not found');
    }
    const saleUrl = `${process.env.FRONTEND_URL}/sales/${saleId}`;
    return fastify.sendMail(email, 'Sale created', `Sale created: ${saleUrl}`);
  });
};

export default fp(plugin);
