import {Repository} from "typeorm";
import {User} from "../../modules/users/user.entity";

export interface Database {
    users: Repository<User>; // Assuming 'User' is an entity in TypeORM
}
