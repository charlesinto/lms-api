import { userSchema, userLoginUserSchema } from "../model/user";
import { displayMessage } from "../helper";
import Joi from "@hapi/joi";


const validateUserParams = (req, res, next) => {
    try{
        const {error } = userSchema.validate(req.body)
        if(error)
            return displayMessage(res, 400, 'Bad Request', error)
        next()
    }catch(error){
        return displayMessage(res, 500, 'Some errors were encountered', error)
    }
}

const validateLoginParams = (req, res, next) => {
    try{
        const {error } = userLoginUserSchema.validate(req.body)
        if(error)
            return displayMessage(res, 400, 'Bad Request', error)
        next()
    }catch(error){
        return displayMessage(res, 500, 'Some errors were encountered', error)
    }
}


export {
    validateUserParams,
    validateLoginParams
}