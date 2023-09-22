// import { FastifyInstance } from 'fastify';
//
// export default function fp(fastify: FastifyInstance) {
//   fastify.register(async function (fastify) {
//     fastify.decorate('hasPermission', function (permission: string) {
//       return function (request, reply, done) {
//         if (request.user.permissions.includes(permission)) {
//           done();
//         } else {
//           done(new Error('Permission denied'));
//         }
//       };
//     });
//   }),
//     {};
// }
