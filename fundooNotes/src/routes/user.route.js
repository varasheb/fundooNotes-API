import express from 'express';
import * as userController from '../controllers/user.controller';
import { newUserValidator } from '../validators/user.validator';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

//route to Register a new user
router.post('', newUserValidator, userController.newUser);

router.post('/login', userController.userLogin);
  

export default router;
