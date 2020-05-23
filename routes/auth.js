const jwt = require('jsonwebtoken')

const isAuthenticated = (req, res, next) => {
    if (typeof req.headers.authorization !== undefined) {
        let token = req.headers.authorization.split(" ")[1]
    }
}