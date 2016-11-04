exports.ERROR_STATUS_BAD_REQUEST = 400;
exports.ERROR_STATUS_NOT_FOUND = 404;
exports.ERROR_STATUS_SERVER_ERROR = 500;

exports.sendErrorStatus = (code, res, errText) => {
  let err;
  switch (code) {
    case this.ERROR_STATUS_BAD_REQUEST:
      {
        err = errText || 'Not enough data specified';
      }
      break;
    case this.ERROR_STATUS_NOT_FOUND:
      {
        err = errText || 'id not found';
      }
      break;
    case this.ERROR_STATUS_SERVER_ERROR:
      {
        err = errText || 'Server or database error';
      }
      break;
    default:
      err = errText;
      break;
  }
  console.log('Error: ', err);
  if (!res.headersSent) {
    res.status(code).send({ err }).end();
  }
};
