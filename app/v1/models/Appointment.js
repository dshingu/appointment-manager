const {Sequelize, Model} = require('sequelize');
const User = require('./User');
const sequelize = global.sequelize;


class Appointment extends Model 
{

    associate (models) {
        Appointment.belongsTo(User, {foreignKey: 'uid'});
    }

}

Appointment.init({
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
    title: {
        type: Sequelize.STRING(60),
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: true
    },
    date: {
        type: Sequelize.DATE,
        allowNull: false
    },
    remind_me: {
        type: Sequelize.BOOLEAN,
        defaultValue: 0
    }
}, {
    sequelize,
    modelName: 'Appointment',
    tableName: 'appointments',
    timestamps: false
});

module.exports = Appointment;