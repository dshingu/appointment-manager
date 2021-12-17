const jwt = require('jsonwebtoken');

module.exports = class JWT {

    static GenerateAccessToken (payload, options = {}) {
        const {expiresIn = '24h'} = options;
        return jwt.sign(payload, process.env.JWT_ACCESS_TOKEN, {expiresIn});
    }

    static VerifyAccessToken (token, payload) {
        return jwt.verify(token, process.env.JWT_ACCESS_TOKEN)
    }

};