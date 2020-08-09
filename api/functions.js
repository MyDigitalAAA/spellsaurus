// Error handling
const { HttpError } = require('./validations/Errors')

const regexInt = RegExp(/^[1-9]\d*$/)
const regexXSS = RegExp(/<[^>]*script/)

// Check if int for param validation
const paramIntCheck = (req, res, next, input) => {
    try {
        if (regexInt.test(input)) {
            next()
        } else {
            throw new Error
        }
    } catch (err) {
        err = new HttpError(403, 'Provided ID must be an integer and not zero')
        res.status(err.code).send(JSON.stringify(
            {
                "error": err.message,
                "code": err.code
            })
        )
    }
}

// Check if script injection attempt
const isXSSAttempt = (string) => {
    if (regexXSS.test(string)) {
        return true
    } else {
        return false
    }
}

// Check if object is null
const isEmptyObject = (obj) => {
    if (Object.keys(obj).length === 0 && obj.constructor === Object) {
        return true
    } else {
        return false
    }
}

module.exports = {
    paramIntCheck,
    isXSSAttempt,
    isEmptyObject
}