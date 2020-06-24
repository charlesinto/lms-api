import express from 'express';
import { validateUserParams } from '../middleware/authMiddleWare';
import { createUser } from '../controller/authController';

const router = express.Router();


router.post('/create-user', validateUserParams, createUser)

export default router;