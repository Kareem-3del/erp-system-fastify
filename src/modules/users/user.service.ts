import { ILike, ObjectId } from 'typeorm';
import { User } from './entities/user.entity';
import { DUPLICATE_KEY_ERROR_CODE } from '../../constants';
import { FastifyInstance } from 'fastify';
import {
  EmailAlreadyExitsException,
  HttpError,
  WrongCredentialsException,
} from '../../exceptions';
import { isUUID } from '../../utils/validators';

export function usersService(fastify: FastifyInstance) {
  fastify.log.info('Registering users service');

  /**
   * Register a new user
   * @param email
   * @param username
   * @param password
   * @returns {Promise<User>}
   * @throws {EmailAlreadyExitsException}
   */
  async function register(
    email: string,
    username: string,
    password: string,
  ): Promise<User> {
    try {
      return await fastify.db.users.save({
        email,
        username,
        password,
      });
    } catch (error: any) {
      if (error.code === DUPLICATE_KEY_ERROR_CODE) {
        if (error.detail.includes('email'))
          throw new EmailAlreadyExitsException();
        throw new EmailAlreadyExitsException();
      }
      console.log(error);
      throw new HttpError(error.message, 500);
    }
  }

  /**
   * Login a user
   * @param query
   * @param password
   * @returns {Promise<User>}
   * @throws {WrongCredentialsException}
   */
  async function login(query: string, password: string): Promise<User> {
    try {
      return await fastify.db.users.findOneOrFail({
        where: [
          { username: query, password },
          { email: query, password },
        ],
      });
    } catch (e) {
      console.log(e);
      throw new WrongCredentialsException();
    }
  }

  /**
   * Get user profile
   * @param _id
   * @returns {Promise<User>}
   * @throws {HttpError}
   */
  async function getProfile(_id: ObjectId): Promise<User> {
    if (!isUUID(_id)) throw new HttpError('Invalid user id', 400);
    try {
      return await fastify.db.users.findOneOrFail({
        where: { _id },
      });
    } catch (error: any) {
      if (error.code === DUPLICATE_KEY_ERROR_CODE) {
        throw new EmailAlreadyExitsException();
      }
      throw error;
    }
  }

  /**
   * Search users
   * @param searchQuery
   * @returns {Promise<User[]>}
   * @throws {HttpError}
   */
  async function search(searchQuery: string): Promise<User[]> {
    return [
      ...(await fastify.db.users.find({
        where: [
          { username: ILike(`%${searchQuery}%`) },
          { email: ILike(`%${searchQuery}%`) },
        ],
      })),
    ];
  }

  return {
    register,
    login,
    getProfile,
    search,
  };
}

export type IUserService = {
  register: (
    email: string,
    username: string,
    password: string,
  ) => Promise<User>;
  login: (query: string, password: string) => Promise<User>;
  getProfile: (_id: ObjectId) => Promise<User>;
  search: (searchQuery: string) => Promise<User[]>;
};
export default usersService;
