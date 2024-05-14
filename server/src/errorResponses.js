
function handleErrorResponse(res, statusCode, message) {
    let jsonResponse = {
      error: {
        message: message || 'Internal Server Error'
      }
    };
  
    switch (statusCode) {
      case 400:
        jsonResponse.error.type = 'Bad Request';
        break;
      case 401:
        jsonResponse.error.type = 'Unauthorized';
        break;
      case 403:
        jsonResponse.error.type = 'Forbidden';
        break;
      case 404:
        jsonResponse.error.type = 'Not Found';
        break;
      case 405:
        jsonResponse.error.type = 'Method Not Allowed';
        break;
      case 409:
        jsonResponse.error.type = 'Conflict';
        break;
      case 413:
        jsonResponse.error.type = 'Payload Too Large';
        break;
      case 415:
        jsonResponse.error.type = 'Unsupported Media Type';
        break;
      case 422:
        jsonResponse.error.type = 'Unprocessable Entity';
        break;
      case 429:
        jsonResponse.error.type = 'Too Many Requests';
        break;
      case 500:
        jsonResponse.error.type = 'Internal Server Error';
        break;
      case 501:
        jsonResponse.error.type = 'Not Implemented';
        break;
      case 502:
        jsonResponse.error.type = 'Bad Gateway';
        break;
      case 503:
        jsonResponse.error.type = 'Service Unavailable';
        break;
      case 504:
        jsonResponse.error.type = 'Gateway Timeout';
        break;
      default:
        jsonResponse.error.type = 'Unknown Error';
    }
  
    res.status(statusCode).json(jsonResponse);
  }
  
  module.exports = {
    handleErrorResponse
  };