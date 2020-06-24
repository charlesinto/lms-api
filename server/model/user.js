import Joi from '@hapi/joi'

const userSchema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    phoneNumber: Joi.number().required(),
    roleid: Joi.number().required(),
    email: Joi.string().email().required(),
    userName: Joi.string(),
    schoolId: Joi.number().required(),
    password: Joi.string().required()
})

export {
    userSchema
}