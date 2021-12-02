const User  = require('../models/User');
const {Op} = require('sequelize');
const Appointment = require('../models/Appointment');
const Token = require('../models/Token');
const JWTUtils = require('../utils/jwt');


module.exports = {

    index: async(request, response, next) =>  {
        const {jwt} = request.body;
        const appointments = await Appointment.findAll({where: {uid: jwt.uid}}).catch((e) => console.log(e));
        response.status(200).json(global.ok('', appointments));
    },

    create: async (request, response, next) => {        
        const {title, description, date, remind_me,jwt} = request.body;
        const appointment = await Appointment.create({
            uid: jwt.uid,
            title: title,
            description: description,
            date: date,
            remind_me: remind_me
        });
        if (appointment) {
            return response.status(200).json(global.ok('', appointment));
        } 
        return response(500).json(global.error('Something went wrong, appointment was not created!', {}));
    },

    read: async (request, response, next) => {
        const id = request.params.id;
        if (Appointment.findOne({where:{id:id}}).delete()) {
            return response.status(200).json(global.ok('Item deleted successfully!'));
        }
        return response.status(500).json(global.error('Something went wrong.'));
    },

    update: async (request, response, next) => {
        
    },

    remove: async(request, response, next) => {
        const id = request.params.id;
        const user = await Appointment.findOne({where:{id:id}}).catch((e) => console.log(e));
        if (user) {
            user.destroy();
            return response.status(200).json(global.ok('Item deleted successfully!'));
        }
        return response.status(500).json(global.error('Something went wrong.'));
    }
};