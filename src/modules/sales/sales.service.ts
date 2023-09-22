import { FastifyInstance } from 'fastify';
import { Sale } from './sale.entity';
import { ObjectId } from 'typeorm';

export function salesService(fastify: FastifyInstance): ISalesService {
  function create(productId: string, customerId: string, price: number) {
    return fastify.db.sales.save({ productId, customerId, price });
  }

  function get(saleId: string) {
    return fastify.db.sales.findOneOrFail({
      where: { _id: new ObjectId(saleId) },
    });
  }

  async function update(
    saleId: string,
    productId: string,
    customerId: string,
    price: number,
  ) {
    return !!(
      await fastify.db.sales.update(
        { _id: new ObjectId(saleId) },
        { productId, customerId, price },
      )
    ).affected;
  }

  async function remove(saleId: string) {
    return !!(await fastify.db.users.delete({ _id: new ObjectId(saleId) }));
  }

  return {
    create,
    get,
    update,
    remove,
  };
}

export interface ISalesService {
  create(productId: string, customerId: string, price: number): Promise<Sale>;

  get(saleId: string): Promise<Sale>;

  update(
    saleId: string,
    productId: string,
    customerId: string,
    price: number,
  ): Promise<boolean>;

  remove(saleId: string): Promise<boolean>;
}

declare module 'fastify' {
  interface FastifyInstance {
    sales: ISalesService;
  }
}
export default salesService;
