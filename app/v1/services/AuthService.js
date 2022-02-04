const User = require('../models/User');
const {Op} = require('sequelize');
const PersonalInformation = require('../models/PersonalInformation');
const Token = require('../models/Token');
const JWTUtils = require('../utils/jwt');

class AuthService
{

    static async login (username, password) {
        const user = await User.findOne({ 
            where: {
                [Op.or]: {
                    username: username,
                    '$PersonalInformation.email$': username
                }
            },
            include: [{model: PersonalInformation}, {model: Token}]
        }).catch((e) => console.log(e));

        if (!user || !(await user.validatePassword(password))) {
            return [false, 'Invalid Credentials'];//response.status(401).json(global.error('Invalid credentials', {}));
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
        return [true, token];//response.status(200).json(global.ok('Logged in successfully!', {token: token}));
    }

}

module.exports = AuthService;