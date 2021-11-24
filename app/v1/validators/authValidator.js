const yup = require('yup');
const User = require('../models/User');
const PersonalInformation = require('../models/PersonalInformation');

yup.addMethod(yup.string, 'uniqueEmail', function (errorMessage) {

    return this.test('is-unique-email', errorMessage, async function (value) {
        const { path, createError, originalValue } = this;
        
        const personalInfo = await PersonalInformation.findOne({
            where: {
                email: originalValue
            }
        });
        if (personalInfo) {
            throw createError({path, message: errorMessage });
        }
        return true;
    });
});

yup.addMethod(yup.string, 'uniqueUsername', function (errorMessage) {

    return this.test('is-unique-username', errorMessage, async function (value) {
        const { path, createError, originalValue } = this;

        const user = await User.findOne({
            where: {
                username: originalValue
            }
        });
        if (user) throw createError({path, message: errorMessage });
        return true;
    });
});

const authSchema = yup.object({
    username: yup.string().uniqueUsername('Username is already taken').required(),
    first_name: yup.string().required(),
    last_name: yup.string().required(),
    email: yup.string().email('Should be a valid email, don\'t worry we won\'t spam you').uniqueEmail('Email is already associated with an account').required(),
    password: yup.string().min(8).required()
});

module.exports = authSchema;
