import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import fp from 'fastify-plugin';
import { cookies, setCookie } from '../../utils/cookies-utils';
import { generateTrackingId } from '../../utils/generate-Ids';
import { isBot } from '../../utils/is-bot';
const isBotRequest = (req: FastifyRequest): boolean =>
  !req.headers['user-agent'] || isBot(req.headers['user-agent']);

export const generateSessionId = async (
  req: FastifyRequest,
  res: FastifyReply,
): Promise<string | undefined> => {
  if (!req.isBot && !req.service) {
    if (!req.sessionId?.length) {
      req.sessionId = generateTrackingId();
    }
    // Refresh session cookie
    setCookie(req, res, 'session', req.sessionId);
  }
  return req.sessionId;
};

export const setTrackingId = (
  req: FastifyRequest,
  res: FastifyReply,
  id: string,
): FastifyReply => setCookie(req, res, 'tracking', id);

const plugin = async (fastify: FastifyInstance): Promise<void> => {
  fastify.decorateRequest('sessionId', null);
  fastify.decorateRequest('trackingId', null);
  fastify.decorateRequest('isBot', null);

  fastify.addHook('preHandler', async (req, res) => {
    req.isBot = isBotRequest(req);
    console.log(req.cookies);
    req.sessionId = req.cookies[cookies.session.key];

    const trackingCookie = req.cookies[cookies.tracking.key];
    if (req.user?._id) {
      req.trackingId = req.user._id;
    } else if (trackingCookie) {
      req.trackingId = trackingCookie;
    } else if (!req.isBot && !req.service) {
      req.trackingId = generateTrackingId();
    }
    if (req.trackingId !== trackingCookie) {
      setTrackingId(req, res, String(req.trackingId));
    }
  });
};

export default fp(plugin, {
  name: 'tracking',
});
