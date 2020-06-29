
import express from 'express';
import { verifyTokenMiddleWare } from '../helper';
import { validateStudentCreateParams } from '../middleware/studentmiddleWare';
import { createStudent } from '../controller/studentController';

const router = express.Router();


router.post('/create-student', verifyTokenMiddleWare, validateStudentCreateParams, createStudent)

export default router;