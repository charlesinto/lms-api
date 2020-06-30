import { executeQuery, displayMessage, hashPassword } from "../helper";
import { response } from "express";
import {roles} from "../constant/roles";


const createStudent = async (req, res) => {
    try{
        const lmsUserRole = await executeQuery('select * from lms_roles where id = ?', [req.user.roleid])
       
        const {schoolId, students} = req.body;
        if(lmsUserRole[0].rolename === roles.SUPER_ADMINISTRATOR){
            // create student
            if(schoolId){
                const problemStudents = await addStudent(students, schoolId)
                if(problemStudents.length > 0){
                    return displayMessage(res, 400, 'The followiing records were not created', {data: problemStudents})
                }else{
                    return displayMessage(res, 201, 'Student(s) created successfully')
                }

            }else{
                return displayMessage(res, 400, 'Mising PARAMS, SCHOOL ID (schoolId)')
            }
            
            
        }else{
            console.log(req.user.roleid)
            const response2 = await executeQuery(`select * from lms_role_access  where roleid = ? and schoolid = ? and  pageid in (SELECT id FROM lms_module  where module = ?);`, [req.user.roleid, req.user.schoolId, 'student'])
            return displayMessage(res, 200, 'Success', response2)
        }

    }catch(error){
        return displayMessage(res,500, 'Some error were encountered', error)
    }
}

const addStudent = (students, schoolId) => {
    return new Promise(async (resolve, reject) => {
        try{
            const problemStudents = [];
            for(let i = 0; i < students.length; i++){
                const { email, firstName,
                    lastName,phoneNumber,studentClass,admissionNumber} = students[i];
                    const hashedPassword = hashPassword(admissionNumber);
                const getClassResponse = await executeQuery('select * from class where class = ? and schoolId = ?', [studentClass, schoolId])
            
                if(getClassResponse.length === 0){
                    return displayMessage(res, 404, 'CLASS NOT FOUND')
                }
                const classId = getClassResponse[0].id;
                const rolesReponse = await executeQuery('select * from lms_roles where rolename = ?', ['STUDENTS']);
                const userRoleId = rolesReponse[0].id;
                const response = await executeQuery(`call lms_signup_user(?,?,?,?,?,?,?,?,?,?,?)`, [firstName, lastName, email, phoneNumber,'',
                    0,userRoleId,1,1, schoolId, hashedPassword])

                const another = await executeQuery('select * from users where emailAddress = ?', [email]);
                const userid = another[0].id;
                
                if(response[0][0].Message === 'Operation Success'){
                    await executeQuery('call lms_create_student(?,?,?)', [userid, classId, admissionNumber])

                    // return displayMessage(res, 201, 'Student(s) created successfully')
                }else{
                    problemStudents.push({
                        Message: 'Email  exist',
                        data: students[i]
                    })
                    
                }
                
            }
            return resolve(problemStudents)
        }catch(error){
            reject(error)
        }
    })
}

export {
    createStudent
}