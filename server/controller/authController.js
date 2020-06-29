import { displayMessage, hashPassword, executeQuery, assignToken, isPasswordEqualHashedPassword } from "../helper"

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
        
        const token = assignToken({userid, email, firstName, lastName,schoolId, userName, roleid})

        if(response[0][0].Message === 'Operation Success'){
            return displayMessage(res, 201,'user created successfully', { token, data: {firstName, lastName, email, userName, phoneNumber}} )
        }

        return displayMessage(res, 400, 'Email or Username exists', {firstName, lastName, email, userName, phoneNumber, roleid, schoolId})

    }catch(error){
        return displayMessage(res, 'Some error were encountered', error)
    }
}

const loginUser = async (req, res) => {
    try{
        const { userId, password} = req.body;
        const response = await executeQuery('call lms_get_user_profile(?);', [userId]);
        if(response[0][0].Message === 'No User found')
            return displayMessage(res, 404, 'No User account found')
        const hashedPassword = response[0][0].password;
        if(!isPasswordEqualHashedPassword(hashedPassword, password))
           return  displayMessage(res, 404, 'Wrong Email and Password combination')
        const {id, email, firstName, lastName,schoolId, userName, roleid} = response[0][0];
        const token = assignToken({ email, firstName, lastName,schoolId, userName,id, roleid})
        await executeQuery('call lms_login(?, ?)', [id, token])
        const response2 = await executeQuery('call lms_get_user_profile(?);', [userId]);
        return displayMessage(res, 200, 'Login Successful', {
            token,
            data: response2[0]
        })
    }catch(error){
        console.error(error);
        return displayMessage(res,500, 'Some error were encountered', error)
    }
}

const logoutUser = async (req, res) => {
    try{
        await executeQuery('call lms_logout(?);',[req.user.id])
        return displayMessage(res,200, 'User logout successfully')
    }catch(error){
        console.error(error);
        return displayMessage(res,500, 'Some error were encountered', error)
    }
}

export {
    createUser,
    loginUser,
    logoutUser
}