const yup = require('yup');
const User = require('../models/User');
const PersonalInformation = require('../models/PersonalInformation');

const schema = yup.object({
    title: yup.string().min(3).required(),
    date: yup.string().min(8).required()
});

module.exports = schema;
