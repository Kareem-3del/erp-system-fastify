import { FastifyInstance, FastifyReply, FastifyRequest} from "fastify";
import {loginSchema, meSchema, registerSchema, getProfileSchema, searchSchema} from "./schemas";
import usersService from "./service";

export default async function (fastify: FastifyInstance, _opts: {}, next: () => void): Promise<void> {
    fastify.log.info('users module registered')

    fastify.decorate('userService', usersService(fastify))


    // checks the existence of those decorations before registering `user module`
    if (!fastify.hasDecorator('authenticate'))
        throw new Error('Missing authentication decorator')

    if (!fastify.hasDecorator('userService'))
        throw new Error('Missing userService decorator')


    // Route registration
    async function loginHandler(req: FastifyRequest, reply: FastifyReply) {
        console.log(fastify.hasDecorator('userService'))
        const {username, password} = req.body as { username: string, password: string }
        const user = await fastify.userService.login(username, password)
        reply.send({user , "data": {}})
    }

    async function registerHandler(req: FastifyRequest, reply: FastifyReply): Promise<void> {
        const {email, username, password} = req.body as { email: string, username: string, password: string }
        reply.send(await fastify.userService.register(email, username, password))
    }

    async function meHandler(req: FastifyRequest, reply: FastifyReply) {
        if (!req.user) throw new Error('USER_NOT_FOUND')
        const userId = req.user._id
        reply.send(await fastify.userService.getProfile(userId))
    }

    async function userHandler(req: FastifyRequest, reply: FastifyReply): Promise<void> {
        reply.send(await fastify.userService.getProfile((req.params?.['userId'])))
    }


    async function searchHandler(req: FastifyRequest, reply: FastifyReply): Promise<void> {
        const {search} = req.query as { search: string }
        reply.send(await fastify.userService.search(search))
    }


    // Route registration
    // fastify.<method>(<path>, <schema>, <handler>)
    // schema is used to validate the input and serialize the output
    fastify.post('/login', {schema: loginSchema}, loginHandler)
    fastify.post('/register', {schema: registerSchema}, registerHandler)

    // Logged APIs

    fastify.register(async (fastify: FastifyInstance): Promise<void> => {
        fastify.get('/me', {preValidation: [fastify.authenticate], schema: meSchema}, meHandler)
        fastify.get('/:userId', {schema: getProfileSchema}, userHandler)
        fastify.get('/search', {schema: searchSchema}, searchHandler)
    }, {prefix: '/users'})

    next()
}
// In all handlers `this` is the fastify instance
// The fastify instance used for the handler registration
