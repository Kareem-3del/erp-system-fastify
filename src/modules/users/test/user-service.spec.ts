import {ObjectID, Repository} from "typeorm";
import UsersService from "../service";
import {User} from "../user.entity";
import {v4 as uuid} from "uuid";
import {DUPLICATE_KEY_ERROR_CODE} from "../../../constants";
import {FastifyInstance} from "fastify";
// Mock the Repository class
 jest.mock("typeorm", () => ({
    Repository: jest.fn(),
    ILike: jest.fn((str)=>str),
}));



describe("UsersService", () => {
    let usersService: ReturnType<typeof UsersService>;
    let mockUsersRepository: jest.Mocked<Repository<User>>;
    let mockFastify: jest.Mocked<FastifyInstance>;
    beforeEach(() => {
        // Initialize mock repository
        mockUsersRepository = new Repository<User>() as jest.Mocked<Repository<User>>;
        mockUsersRepository.findOne = jest.fn();
        mockUsersRepository.find = jest.fn();
        mockUsersRepository.save = jest.fn();
        mockUsersRepository.findOneOrFail = jest.fn();
        // Initialize mock fastify instance
        mockFastify = {
            db: {
                users: mockUsersRepository,
            },
            log: {
                info: jest.fn(),
                error: jest.fn(),
            }
        } as unknown as jest.Mocked<FastifyInstance>;
        usersService = UsersService(mockFastify);
    });

    describe("register", () => {
        it("should register a new user", async () => {
            // Mock the save method of the repository
            mockUsersRepository.save.mockResolvedValueOnce({
                _id: (uuid() as unknown as ObjectID),
                username: "test-user",
            } as User);

            const user = await usersService.register("test@example.com", "test-user", "password");

            expect(user).toBeDefined();
            expect(mockUsersRepository.save).toHaveBeenCalledWith({
                email: "test@example.com",
                username: "test-user",
                password: "password",
            });
        });

        it("should throw USERNAME_IS_NOT_AVAILABLE error on duplicate key error", async () => {
            // Mock the save method to throw a duplicate key error
            mockUsersRepository.save.mockRejectedValueOnce({code: DUPLICATE_KEY_ERROR_CODE});

            try {
                await usersService.register("test@example.com", "test-user", "password");
            } catch (error: any) {
                expect(error?.message).toBe("USERNAME_IS_NOT_AVAILABLE");
            }
        });
    });

    describe("login", () => {
        it("should log in a user", async () => {
            const mockUser = {
                _id: (uuid() as unknown as ObjectID),
                username: "test-user",
                email: "test@example.com",
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
            } as User;

            // Mock the findOne method of the repository
            mockUsersRepository.findOne.mockResolvedValueOnce(mockUser);

            const user = await usersService.login("test-user", "password");

            expect(user).toBe(mockUser);
            expect(mockUsersRepository.findOne).toHaveBeenCalledWith({
                where: {$or: [{username: "test-user"}, {email: "test-user"}], password: "password"},
            });
        });

        it("should throw WRONG_CREDENTIAL error if user is not found", async () => {
            // Mock the findOne method to return null (user not found)
            mockUsersRepository.findOne.mockResolvedValueOnce(undefined);

            try {
                await usersService.login("test-user", "password");
            } catch (error: any) {
                expect(error?.message).toBe("WRONG_CREDENTIAL");
            }
        });
    });

    describe("getProfile", () => {
        it("should get user profile", async () => {
            const mockUser = {
                _id: (uuid() as unknown as ObjectID),
                username: "test-user",
                email: "test@example.com",
                password: "password",
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
            } as unknown as User;
            // Mock the findOne method of the repository
            mockUsersRepository.findOneOrFail.mockResolvedValueOnce(mockUser);

            const user = await usersService.getProfile(mockUser._id);

            expect(user).toBe(mockUser);
            expect(mockUsersRepository.findOneOrFail).toHaveBeenCalledWith(mockUser._id);
        });

        it("should throw USER_NOT_FOUND error if user is not found", async () => {
            // Mock the findOne method to return null (user not found)
            mockUsersRepository.findOne.mockResolvedValueOnce(undefined);

            try {
                await usersService.getProfile(uuid() as unknown as ObjectID);
            } catch (error: any) {
                expect(error?.message).toBe("USER_NOT_FOUND");
            }
        });
    });

    describe("search", () => {
        it("should search users by username or email", async () => {
            const mockUsers = [
                {_id: 1, username: "test-user", email: "test@example.com"},
                {_id: 2, username: "another-user", email: "another@example.com"},
            ] as unknown as User[];

            // Mock the find method of the repository
            mockUsersRepository.find.mockResolvedValueOnce(mockUsers);

            const results = await usersService.search("test");
            expect(results).toEqual(mockUsers);
            expect(mockUsersRepository.find).toHaveBeenCalledWith({
                where: {
                    $or: [
                        {username: expect.stringContaining("test")},
                        {email: expect.stringContaining("test")},
                    ],
                },
            });
        });
    });
});
