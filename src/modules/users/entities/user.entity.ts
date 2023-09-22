import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ObjectId,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { hash } from '../../../utils/helpers';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  _id: ObjectId;

  @Index()
  @Column({ unique: true })
  public username: string;

  @Index()
  @Column({ unique: true })
  public email: string;

  @Column()
  public password: string;

  @CreateDateColumn()
  public created_at: string;

  @UpdateDateColumn()
  public updated_at?: string;

  @BeforeInsert()
  async beforeInsert?() {
    this.email = this.email.toLowerCase();
    this.password = await hash(this.password);
  }
}
