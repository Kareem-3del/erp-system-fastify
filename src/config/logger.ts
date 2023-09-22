import configHelper from '../utils/helpers/config.helper';
export const LoggerOptions = {
  development: {
    transport: {
      target: 'pino-pretty',
      options: {
        translateTime: 'HH:MM:ss',
        ignore: 'pid,hostname,reqId,res,responseTime,req',
      },
    },
  },
  production: true,
  test: false,
};

const LoggerConfigGetter = function () {
  return LoggerOptions[configHelper.get('NODE_ENV') || 'development'] ?? true;
};

export const LoggerConfig = LoggerConfigGetter();
