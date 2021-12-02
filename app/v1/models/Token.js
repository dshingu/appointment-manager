const {Sequelize, Model} = require('sequelize');
const sequelize = global.sequelize;
const User = require('./User');


class Token extends Model 
{

    associate (models) {
        Token.belongsTo(User, {foreignKey: 'uid'});
    }

}

Token.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    uid: {
        type: Sequelize.INTEGER,
        references: {
            model: {
                model: User,
                key: 'id'
            }
        }
    },
    token: {
        type: Sequelize.TEXT,
    },
}, {
    sequelize,
    modelName: 'Token',
    tableName: 'tokens',
    timestamps: false
});

module.exports = Token;