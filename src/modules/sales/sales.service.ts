import { FastifyInstance } from 'fastify';
import { Sale } from './sale.entity';
import { ObjectId } from 'typeorm';

export function salesService(fastify: FastifyInstance): ISalesService {
  function create(productId: string, customerId: string, price: number) {
    return fastify.db.sales.save({ productId, customerId, price });
  }

  function get(saleId: string) {
    return fastify.db.sales.findOneOrFail({ _id: saleId });
  }

  function update(
    saleId: string,
    productId: string,
    customerId: string,
    price: number,
  ) {
    return fastify.db.sales.update(
      { _id: saleId },
      { productId, customerId, price },
    );
  }

  async function remove(saleId: string) {
    return !!(await fastify.db.users.deleteOne({ _id: saleId }));
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
  ): Promise<Sale>;

  remove(saleId: string): Promise<boolean>;
}

export default salesService;
