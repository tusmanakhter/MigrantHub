class ServerError extends Error {
  constructor(message, customStatusCode, debugMessage) {
    super(message);
    this.name = this.constructor.name;

    Error.captureStackTrace(this, this.constructor);

    const statusCode = customStatusCode || 400;
    const debugMsg = debugMessage || '';
    this.data = { statusCode, debugMsg };
  }
}

module.exports = { ServerError };
