import { Router } from 'express';
import { register,login } from '../controller/user.controller.js';
const userRouter =  Router();
// ===================== //
// User Sign Up Route    //
// ===================== //
userRouter.post('/register',register)
// ===================== //
// User Sign In Route    //
// ===================== //
userRouter.post('/login', login)

export default userRouter;