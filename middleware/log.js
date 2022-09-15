import log4js from 'log4js';
log4js.configure({
  appenders: {
    console: {type: 'console'},
    file: {type: 'file', filename: 'logs/server.log'},
  },
  categories: {
    default: {appenders: ['console', 'file'], level: 'debug'},
  },
});
const logger = log4js.getLogger('server');

export default ({ method, url, params, query, body }, res, next) => {
  logger.info(`\n[${new Date().toISOString()}]`);
  logger.info(`Request: ${method} - ${url}`);
  logger.info(JSON.stringify({ params, query, body }, null, 2));
  next();
};
