const User  = require('../models/User');
const {Op} = require('sequelize');
const PersonalInformation = require('../models/PersonalInformation');
const Token = require('../models/Token');
const JWTUtils = require('../utils/jwt');
const AuthService = require('../services/AuthService');


module.exports = {
    
    login: async (request, response, next) => {

        const {username, password} = request.body;
        const user = await AuthService.login(username, password);
        return (user[0]) ? response.status(200).json(global.ok('', {token: user[1]})) : response.status(401).json(global.error('Invalid Credentials', user[1]));
        
        
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