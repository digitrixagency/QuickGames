const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookie = require("cookie");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const SetToken = async (req, res) => {
    try {
        const userData = res.locals.userData;
        // Generating the Access Token
        const accessToken = jwt.sign(
            {
                id: userData.id,
                email: userData.email,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.ACCESS_TOKEN_EXPIRATION_TIME,
            }
        );
        // Generating the Refresh Token
        const refreshToken = jwt.sign(
            {
                email: userData.email,
                id: userData.id,
            },
            process.env.REFRESH_JWT_SECRET
        );

        const finalToken = `${accessToken} ${refreshToken}`;
        res.set(
            "Set-Cookie",
            cookie.serialize("token", finalToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production", // At developmet Cookie will be insecure as we do not have SSL with us
                sameSite: "strict",
                maxAge: parseInt(process.env.COOKIE_EXPIRATION_TIME, 10),
                path: "/", //cookie valid for whole site
            })
        );
        const user ={
            ...userData,
            access_token: accessToken,
            refresh_token: refreshToken,
        }
        return res.status(200).json(user);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

// id                        
// username                 
// email                    
// password       
// role
// favouriteGames
// Like

const SignUp = async (req, res, next) => {
    try {
        const { email, username, password, role } =
            req.body;

        console.log(req.body);

        if (password.length < 7) {
            return res.status(401).json({
                message: "password length should be more than 6",
            });
        }

        const checkUser = await prisma.user.findFirst({
            where: {
                OR: [{ email: email }, { username: username }],
            },
        });
        if (checkUser) {
            return res.status(401).json({
                message: "User already exists",
            });
        }

        const salt = await bcrypt.genSalt(5);
        const hashPassword = await bcrypt.hash(password, salt);

        const userData = await prisma.user.create({
            data: {
                email: email,
                username: username,
                password: hashPassword,
            },
        });
        res.locals.userData = userData;
        return next();
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error!!!",
        });
    }
};

const Login = async (req, res, next) => {
    try {
        const { credential, password } = req.body;

        let user = await prisma.user.findFirst({
            where:{email: credential},
        });
        if(!user){
            user = await prisma.user.findFirst({
                where:{username: credential},
            });
    
            if (!user) {
                return res.status(404).json({ message: "Invalid credentials" });
            }
        }


        const matchPassword = await bcrypt.compare(password, user.password);
        if (matchPassword) {
            res.locals.userData = user;
            return next();
        } else {
            return res.status(404).json({ message: "Invalid credentials" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
};

module.exports = { SignUp, Login, SetToken };
