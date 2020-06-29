import express from 'express';
import { validateUserParams, validateLoginParams } from '../middleware/authMiddleWare';
import { createUser, loginUser, logoutUser } from '../controller/authController';
import { verifyTokenMiddleWare } from '../helper';

const router = express.Router();


router.post('/create-user', validateUserParams, createUser)

router.post('/login', validateLoginParams, loginUser)

router.get('/logout', verifyTokenMiddleWare, logoutUser)

export default router;