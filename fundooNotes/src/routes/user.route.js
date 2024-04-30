import express from 'express';
import * as userController from '../controllers/user.controller';
import { signInUserValidator,loginValidator } from '../validators/user.validator';
import { userAuth ,isAuthBySession } from '../middlewares/auth.middleware';

const router = express.Router();

//route to Register a new user
router.post('', signInUserValidator, userController.signInUser);

router.post('/login',loginValidator, userController.userLogin);
// login through token
router.get('/verify', userAuth , userController.verifyUser);
// login through sesion
router.get('/session', isAuthBySession ,userController.sessionLogin)

export default router;
