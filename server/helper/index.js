import pool from "../database";
import 'dotenv/config';
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const executeQuery = (sql, params = []) => {
    return new Promise((resolve, reject) => {
        pool.query(sql, params, (err, rows, fields) => {
            if(err)
                return reject(err);
            return resolve(rows)
        })
    })
}

const assignToken = (payload, key=process.env.SECRET_KEY) => {
    const token = jwt.sign(payload, key, {expiresIn:'7 days'})
    return token;
}

const verifyToken = (token, key=process.env.SECRET_KEY) => {
    try{
        const decoded = jwt.verify(token, key)
        return decoded;
    }catch(error){
        throw error;
    }
}

const verifyTokenMiddleWare = (req, res, next) => {
    try{
        const key=process.env.SECRET_KEY
        if(!req.headers['x-access-token'] || req.headers['x-access-token'].trim() === ''){
            return res.status(403).send({message:'Insufficient authorization'});
        }
        const token = req.headers['x-access-token']
        const decoded = jwt.verify(token, key)
        req.user = decoded;
        return next();
    }catch(error){
        console.log(error)
        return res.status(403).send({message:'Insufficient authorization'});
    }
}

const displayMessage = (res, status=200, message = 'Operation Sucessful', data) => {
        // console.log(data);
        if(data)
            return res.status(status).send({
                message,
                data
            })
        return res.status(status).send({
            message,
        })
}

const hashPassword = (payload) => {
    const hash = bcrypt.hashSync(payload, 10);
    return hash;
}

const isPasswordEqualHashedPassword = (hashedPassword, password) => {
   const isEqual = bcrypt.compareSync(password, hashedPassword);

   return isEqual;
}

export {
    executeQuery,
    assignToken,
    verifyToken,
    verifyTokenMiddleWare,
    displayMessage,
    hashPassword,
    isPasswordEqualHashedPassword
}