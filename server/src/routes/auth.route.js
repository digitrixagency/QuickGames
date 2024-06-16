import { Router } from 'express';
import {
  SignUp,
  Login,
  SetToken,
  GoogleAuth,
  GetGoogleData,
  Logout,
  ForgotPassword,
  Resetpassword
} from '../controllers/auth.controller.js';
import VerifyToken from '../middlewares/auth.middleware.js';

const authRoutes = Router();

authRoutes.post('/signup', SignUp, SetToken);
authRoutes.post('/login', Login, SetToken);
authRoutes.post('/check', VerifyToken);
authRoutes.post('/google', GoogleAuth);
authRoutes.get('/redirectgoogle', GetGoogleData, SetToken);
authRoutes.get('/logout', VerifyToken, Logout);
authRoutes.post('/forgot-pass', ForgotPassword);
authRoutes.post('/reset-pass', Resetpassword);

export default authRoutes;



// const { Router } = require("express");
// const { SignUp, Login, SetToken, GoogleAuth, GetGoogleData, Logout, ForgotPassword, Resetpassword } = require("../controllers/auth.controller");
// const VerifyToken = require("../middlewares/auth.middleware");

// const authRoutes = Router();

// authRoutes.post("/signup", SignUp, SetToken);
// authRoutes.post("/login", Login, SetToken);
// authRoutes.post("/check", VerifyToken);
// authRoutes.post("/google", GoogleAuth);
// authRoutes.get("/redirectgoogle", GetGoogleData, SetToken);
// authRoutes.get("/logout", VerifyToken, Logout);
// authRoutes.post("/forgot-pass", ForgotPassword);
// authRoutes.post("/reset-pass", Resetpassword);

// module.exports = authRoutes;
