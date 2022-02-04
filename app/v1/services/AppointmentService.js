const Appointment = require('../models/Appointment');


class AppointmentService 
{

    static async list (user) {
        const appointments = await Appointment.findAll({
            where: {uid: user.id},
            order: [
                ['date', 'DESC']
            ]
        }).catch((e) => console.log(e));
        return appointments;
    }

    static async add (uid, title, description, date, time, remind_me) {
        const appointment = await Appointment.create({
            uid: uid,
            title: title,
            description: description,
            date: date,
            remind_me: remind_me
        });
        if (appointment) return appointment;
        return false;
    }

    static async get (id) {
        const appointment = await Appointment.findOne({where: {id: id}}).catch((e) => console.log(e));
        return appointment ? appointment : false;
    }

    static async update (id, uid, title, description, date, time, remind_me) {
        const _date = date+' '+time;
        const appointment = await Appointment.findOne({where: {id: id}}).catch((e) => console.log(e.message));
        if (!appointment) return false;
        appointment.title = title;
        appointment.description = description;
        appointment.date = new Date(_date);
        appointment.remind_me = remind_me;
        appointment.save();
        console.log(new Date(_date));
        return appointment;
    }

    static async delete (id) {
        const appointment = await Appointment.findOne(id).catch((e) => console.log(e));
        if (appointment) {
            appointment.destroy();
            return true;
        }
        return false;
    }

}

module.exports = AppointmentService;