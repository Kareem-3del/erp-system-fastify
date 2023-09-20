import {
    BeforeInsert,
    Column,
    CreateDateColumn,
    Entity,
    Index,
    ObjectID,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {hash} from "../../utils/helpers";
import { Exclude } from 'class-transformer';

@Entity("users")
export class User {
    @PrimaryGeneratedColumn('uuid')
    _id: ObjectID;

    @Index()
    @Column({unique: true})
    public username: string;

    @Index()
    @Column({unique: true})
    public email: string;

    @Exclude()
    @Column()
    private password: string;

    @CreateDateColumn()
    public created_at: string;

    @UpdateDateColumn()
    public updated_at?: string;

    @BeforeInsert()
    async beforeInsert?() {
        this.email = this.email.toLowerCase();
        this.password = await hash(this.password)
    }
}