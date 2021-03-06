const JWTUtils = require('../utils/jwt');

module.exports = function () {
    return function (request, response, next) {

        const authHeader = request.headers.authorization;
        let bearer, token;
        
        if (authHeader) {
            [bearer, token] = authHeader.split(' ');
            if (bearer.toLowerCase() !== 'bearer' || !token) {
                return response.status(401).json(global.error('Access Denied.', {}))
            }
        } else {
            return response.status(401).json(global.error('Authorization header not found.', {}));
        }
 
        try {
            const jwt = JWTUtils.VerifyAccessToken(token);
            request.body.jwt = jwt;
        } catch (e) {
            return response.status(401).json(global.error('Invalid token', {}));
        }
        next();
        
    }
};