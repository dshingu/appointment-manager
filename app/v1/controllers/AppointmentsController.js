const AppointmentService = require('../services/AppointmentService');


module.exports = {

    index: async(request, response, next) =>  {
        const {user} = request.body;
        
        const appointments = await AppointmentService.list(user);
        response.status(200).json(global.ok('', appointments));
    },

    create: async (request, response, next) => {        
        const {title, description, date, time, remind_me, user} = request.body;
        const appointment = await AppointmentService.add(user.id, title,  description, date, time, remind_me);
        if (appointment) return response.status(200).json(global.ok('', appointment));
        return response(500).json(global.error('Something went wrong, appointment was not created!', {}));
    },

    read: async (request, response, next) => {
        const id = request.params.id;
        const appointment = await AppointmentService.get(id);
        if (appointment) return response.status(200).json(global.ok('Item fetched successfully!', appointment));
        return response.status(500).json(global.error('Something went wrong.'));
    },

    update: async (request, response, next) => {
        const {id, title, description, date, time, remind_me, user} = request.body;
        const uid = user.id;
        const appointment = await AppointmentService.update(id, uid, title, description, date, time, remind_me);
        if (appointment === false) return response.status(500).json(global.error('Something went wrong.'));
        return response.status(200).json(global.ok('Item updated successfully!', appointment));

    },

    remove: async(request, response, next) => {
        const id = request.params.id;
        const removed = await AppointmentService.delete(id);
        
            return removed ? response.status(200).json(global.ok('Item deleted successfully!')) :response.status(500).json(global.error('Something went wrong.'));
    }
};