const joi = require('joi');
module.exports = async function(payload) {
    const schema = joi.object({
        name: joi.string().required(),
        category: joi.string().required(),
        price: joi.number().required()
    });
    return schema.validateAsync(payload);
}