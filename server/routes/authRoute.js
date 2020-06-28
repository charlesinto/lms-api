import express from 'express';
import { validateUserParams, validateLoginParams } from '../middleware/authMiddleWare';
import { createUser, loginUser } from '../controller/authController';

const router = express.Router();


router.post('/create-user', validateUserParams, createUser)

router.post('/login', validateLoginParams, loginUser)

export default router;