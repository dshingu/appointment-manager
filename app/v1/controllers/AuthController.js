const User  = require('../models/User');
const {Op} = require('sequelize');
const PersonalInformation = require('../models/PersonalInformation');
const Token = require('../models/Token');
const JWTUtils = require('../utils/jwt');


module.exports = {
    
    login: async (request, response, next) => {

        const {username, password} = request.body;
        const user = await User.findOne({ 
            where: {
                [Op.or]: {
                    username: username,
                    '$PersonalInformation.email$': username
                }
            },
            include: [{model: PersonalInformation}, {model: Token}]
        });

        if (!user || !(await user.validatePassword(password))) {
            return response.status(401).json(global.error('Invalid credentials', {}));
        }
        
        const _user = {
            id: user.id,
            username: user.username,
            PersonalInformation: {
                first_name: user.PersonalInformation.first_name,
                last_name: user.PersonalInformation.last_name,
                email: user.PersonalInformation.email
            },
            verified: user.verified
        };

        const payload = _user;
        const token   = JWTUtils.GenerateAccessToken(payload);
        user.Token.token = token;
        await user.Token.save().catch((e) => console.log(e));
        return response.status(200).json(global.ok('Logged in successfully!', {token: token}));
        
        
    },

    validateToken: async (request, response, next) => {
        const { jwt } = request.body;
        if (Date.now() >= (jwt.exp * 1000)) {
            response.status(401).json(global.error('Authentication has expired'));
        }
        response.status(200).json({});
    },

    register: async (request, response, next) => {
        const {username, password, first_name, last_name, email } = request.body;
        const token = await User.addNewUser({
            username: username,
            first_name: first_name,
            last_name: last_name,
            email: email,
            password: password
        }).catch((e) => console.log(e));
        response.status(200).json(global.ok('User register successfully!', {token: token}));
    },

    logout: async(request, response, next) => {
        let {jwt}  = request.body;
        response.status(200).json(global.ok('', User.logout(jwt.username)));
    }
};