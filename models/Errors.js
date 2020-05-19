// Http error w/ http code
class HttpError extends Error {
    constructor(code, message) {
        super(message)
        this.name = "HttpError"
        this.code = code
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = {
    HttpError
}