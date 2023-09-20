import {ILike, ObjectID, Repository} from 'typeorm';
import {User} from './user.entity';
import {DUPLICATE_KEY_ERROR_CODE} from '../../constants';
import {USER_NOT_FOUND, USERNAME_IS_NOT_AVAILABLE, WRONG_CREDENTIAL} from '../../errors';
import {FastifyInstance} from 'fastify';

export interface IUsersService {
    register(email: string, username: string, password: string): Promise<User>;

    login(query: string, password: string): Promise<User>;

    getProfile(_id: ObjectID): Promise<User>;

    search(searchQuery: string): Promise<User[]>;
}


export function usersService(fastify: FastifyInstance): IUsersService {
    fastify.log.info('Registering users service');


    async function register(email: string, username: string, password: string): Promise<User> {
        try {
            return await fastify.db.users.save({
                email,
                username,
                password
            });
        } catch (error: any) {
            if (error.code === DUPLICATE_KEY_ERROR_CODE) {
                throw new Error(USERNAME_IS_NOT_AVAILABLE.code);
            }
            throw new Error(USERNAME_IS_NOT_AVAILABLE.code);
        }
    }

    async function login(query: string, password: string): Promise<User> {
     try {
         return  await fastify.db.users.findOneOrFail({
             where: {
                 $or: [
                     {username: query},
                     {email: query}
                 ],
                 password
             }
         });
     }catch (e) {
            throw new Error(WRONG_CREDENTIAL.code);
     }
    }

    async function getProfile(_id: ObjectID): Promise<User> {
        try {
            return await fastify.db.users.findOneOrFail(_id);
        } catch (error: any) {
            if (error.code === DUPLICATE_KEY_ERROR_CODE) {
                throw new Error(USERNAME_IS_NOT_AVAILABLE.code);
            }
            throw Error(USER_NOT_FOUND.code);
        }
    }


    async function search(searchQuery: string): Promise<User[]> {
        return [...( await fastify.db.users.find({
            where: [
                {username: ILike(`%${searchQuery}%`)},
                {email: ILike(`%${searchQuery}%`)}
            ],
        }))]
    }

    return {
        register,
        login,
        getProfile,
        search
    }


}

export default usersService;
