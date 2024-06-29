import { Router } from 'express';
import {
  SignUp,
  Login,
  SetToken,
  GoogleAuth,
  Logout,
  VerifyEmail,
  ResetPassword,
  ForgotPassword,
  SendVerificationMail,
  SendForgotPasswordMail
} from '../controllers/auth.controller.js';
import VerifyToken from '../middlewares/auth.middleware.js';

const authRoutes = Router();

authRoutes.post('/signup', SignUp, SetToken);
authRoutes.post('/login', Login, SetToken);
authRoutes.get('/google', GoogleAuth);
authRoutes.get('/logout',VerifyToken, Logout);
authRoutes.post('/sendverifyemail', SendVerificationMail);
authRoutes.post('/sendforgotpassemail', SendForgotPasswordMail)
authRoutes.get('/verifyemail/:recoveryToken', VerifyEmail)
authRoutes.post('/forgotpass', ForgotPassword);
authRoutes.post('/resetpass',VerifyToken, ResetPassword);

export default authRoutes;
