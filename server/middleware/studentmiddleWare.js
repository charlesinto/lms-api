import { displayMessage } from "../helper"

const { studentSchema } = require("../model/user")

const validateStudentCreateParams = (req, res, next) => {
    try{
        const {error } = studentSchema.validate(req.body)
        if(error)
            return displayMessage(res, 400, 'Bad Request', error)
        next()
    }catch(error){
        return displayMessage(res, 500, 'Some errors were encountered', error)
    }
}

export {
    validateStudentCreateParams
}