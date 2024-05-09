const { Router } = require("express");
const { SignUp, Login, SetToken } = require("../controllers/auth.controller");

const authRoutes = Router();

authRoutes.post("/signup", SignUp, SetToken);
authRoutes.post("/login", Login, SetToken);

module.exports = authRoutes;
