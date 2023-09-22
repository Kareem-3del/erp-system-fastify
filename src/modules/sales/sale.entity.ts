// Example Sale Entity
import {
  Column,
  CreateDateColumn,
  ObjectId,
  PrimaryGeneratedColumn,
} from 'typeorm';

export class Sale {
  @PrimaryGeneratedColumn('uuid')
  _id: ObjectId;

  @Column()
  productId: string;

  @Column()
  customerId: string;

  @Column()
  price: number;

  @CreateDateColumn()
  public created_at: string;
}
