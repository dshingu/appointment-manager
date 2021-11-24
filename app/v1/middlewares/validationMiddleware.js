const validationMiddleware = (schema) => async (request, response, next) => {
    try {

        await schema.validate(request.body);
        return next();

    } catch (error) {
        return response.status(400).json(error);
    }
};

module.exports = validationMiddleware;