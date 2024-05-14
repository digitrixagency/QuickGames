const { Router } = require("express");
const { SignUp, Login, SetToken } = require("../controllers/auth.controller");
const VerifyToken = require("../middlewares/auth.middleware");

const authRoutes = Router();

authRoutes.post("/signup", SignUp, SetToken);
authRoutes.post("/login", Login, SetToken);
authRoutes.post("/check", VerifyToken)

module.exports = authRoutes;
