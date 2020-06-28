import { displayMessage, hashPassword, executeQuery, assignToken } from "../helper"

const createUser = async (req, res) => {
    try{
        const {
            firstName, lastName,email,userName,phoneNumber,roleid,
            schoolId,password } = req.body;

        const hashedPassword = hashPassword(password);
        // 'firstName', 
        // 'lastName',
        // 'email',
        // 'username',
        // 'phoneNumber',
        // 'token',
        
        const response = await executeQuery(`call lms_signup_user(?,?,?,?,?,?,?,?,?,?,?)`, [firstName, lastName, email, phoneNumber,'',
                             roleid,1,1,1, schoolId, hashedPassword])
        
        const another = await executeQuery('select * from users where emailAddress = ? or username = ?', [email, userName]);

        const userid = another[0].id;
        
        const token = assignToken({userid, email, firstName, lastName, userName, roleid})

        if(response[0][0].Message === 'Operation Success'){
            return displayMessage(res, 201,'user created successfully', { token, data: {firstName, lastName, email, userName, phoneNumber}} )
        }

        return displayMessage(res, 400, 'Email or Username exists', {firstName, lastName, email, userName, phoneNumber, roleid, schoolId})

    }catch(error){
        return displayMessage(res, 'Some error were encountered', error)
    }
}

export {
    createUser
}