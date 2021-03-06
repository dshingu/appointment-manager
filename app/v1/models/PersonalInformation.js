const {Sequelize, Model} = require('sequelize');
const User = require('./User');
const sequelize = global.sequelize;


class PersonalInformation extends Model 
{

    associate (models) {
        PersonalInformation.belongsTo(User, {foreignKey: 'uid'});
    }

}

PersonalInformation.init({
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
    first_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    last_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    }
}, {
    sequelize,
    modelName: 'PersonalInformation',
    tableName: 'personal_informations',
    timestamps: false
});

module.exports = PersonalInformation;