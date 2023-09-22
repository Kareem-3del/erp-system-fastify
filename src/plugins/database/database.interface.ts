import { Repository } from 'typeorm';
import { User } from '../../modules/users/entities/user.entity';
import { Sale } from '../../modules/sales/sale.entity';

export interface Database {
  users: Repository<User>; // Assuming 'User' is an entity in TypeORM
  sales: Repository<Sale>; // Assuming 'Sale' is an entity in TypeORM
}
