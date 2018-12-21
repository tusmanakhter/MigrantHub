const { logger, formatMessage } = require('../config/winston');

const controllerHandler = (promise, params) => async (req, res, next) => {
  const boundParams = params ? params(req, res, next) : [];
  try {
    const result = await promise(...boundParams);
    return res.status(200).send(result);
  } catch (error) {
    logger.error(formatMessage(req.ip, req.method, req.originalUrl, req.httpVersion,
      error.status, req.referer, promise.name, error.message));
    return res.status(400).send(error.message);
  }
};

module.exports = { controllerHandler };
