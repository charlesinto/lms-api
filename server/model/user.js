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

const studentSchema = Joi.object({
    students: Joi.array().min(1).items(Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        phoneNumber: Joi.number().required(),
        email: Joi.string().email().required(),
        studentClass: Joi.string().required(),
        admissionNumber: Joi.string().required()
    })).required(),
    schoolId: Joi.number()
})


const userLoginUserSchema = Joi.object({
    userId: Joi.string().required(),
    password: Joi.string().required()
})

export {
    userSchema,
    userLoginUserSchema,
    studentSchema
}