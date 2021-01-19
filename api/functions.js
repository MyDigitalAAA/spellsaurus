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
        res.status(err.code).send(JSON.stringify({
              "message": "Le paramètre doit être un entier non-nul.",
              "code": 403,
          })
        )
    }
}

// Check if script injection attempt
const isXSSAttempt = (string) => {
    return regexXSS.test(string);
}

// Check if object is null
const isEmptyObject = (obj) => {
    return (Object.keys(obj).length === 0 && obj.constructor === Object);
}

module.exports = {
    paramIntCheck,
    isXSSAttempt,
    isEmptyObject
}