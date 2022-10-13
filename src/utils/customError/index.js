class CustomError extends Error {
  constructor(code = "GENERIC", status = 500, message = "", ...params) {
    super(...params);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CustomError);
    }

    this.code = code;
    this.status = status;
    this.message = message;
  }
}

export default CustomError;
