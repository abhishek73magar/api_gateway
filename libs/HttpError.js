const statusCodes = {
  400: 'Bad Request',
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Not found',
  406: 'Not Acceptable',
  500: 'Internal Server Error'
}

function HttpError (status, message) {
  this.name = 'HTTP Error'
  this.status = status;
  this.message = message || statusCodes[status] || 'An Error Occured';
  Error.captureStackTrace(this, HttpError)
}

HttpError.prototype = Object.create(Error.prototype);
HttpError.prototype.constructor = HttpError;

module.exports = HttpError;