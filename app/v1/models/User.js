const {Sequelize, Model} = require('sequelize');
const sequelize = global.sequelize;
const bcrypt = require('bcrypt');
const PersonalInformation = require('./PersonalInformation');
const Token = require('./Token');
const JWTUtils = require('../utils/jwt');


class User extends Model 
{

    associate (models) {
        
    }

    static async hashPassword(password) {
        const ROUNDS = parseInt(process.env.SALT_ROUNDS);
        return bcrypt.hash(password, ROUNDS);
    }

    static async addNewUser({
        username,
        first_name,
        last_name,
        email,
        password
    }) {

        return sequelize.transaction(async () => {
            const user = await User.create({
                username: username,
                password: password,
                PersonalInformation: {
                    first_name: first_name,
                    last_name: last_name,
                    email: email
                }
            },  {
                include: [PersonalInformation]
            });
            const payload = {uid: user.id};
            const _token = JWTUtils.GenerateAccessToken(payload);
            const token = await Token.create({
                uid: user.id,
                token: _token
            });

            return _token; 
        });

    }

    static async logout (username) {
        const user = await User.findOne({
            where: {username: username},
            include: {model:Token}
        });

        if (user) {
            user.Token.token = null;
            return user.Token.save();
        }

        return true;
    }

}

User.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: Sequelize.STRING(50),
        unique: true,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    verified: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: 0
    }
}, {
    sequelize,
    modelName: 'User',
    timestamps: false
});

User.prototype.validatePassword = async function (password) {
    return bcrypt.compare(password, this.password); 
}

User.prototype.login = async function () {
    this.Token.token = null;
    return this.Token.save();
}

User.beforeCreate(async (user, options) => {
    user.password = await User.hashPassword(user.password);
});

User.afterCreate((user, options) => {
    delete user.dataValues.password;
});

User.hasOne(PersonalInformation, { foreignKey: 'uid'});
User.hasOne(Token, { foreignKey: 'uid'});



module.exports = User;