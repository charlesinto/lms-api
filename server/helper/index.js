import pool from "../database";
import 'dotenv/config';
import jwt from "jsonwebtoken";

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

export {
    executeQuery,
    assignToken,
    verifyToken,
    verifyTokenMiddleWare
}