import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookie from "cookie";
import { UAParser } from "ua-parser-js";
import { PrismaClient } from "@prisma/client";
import nodemailer from "nodemailer";
import { handleErrorResponse } from "../errorResponses.js";
import { google } from "googleapis";
import { OAuth2Client } from "google-auth-library";

// Email Validation
const isEmail = (email) =>
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

const OAuth2 = google.auth.OAuth2;
const client = new OAuth2Client();

const oauth2Client = new OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.REDIRECT_URI
);

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL, // your email
    pass: process.env.PASSWORD, // your email password or app password
  },
});

// Verify the connection configuration
transporter.verify(function (error, success) {
  if (error) {
    console.log(error);
  } else {
    console.log("Server is ready to take your messages");
  }
});

const prisma = new PrismaClient();

const SetToken = async (req, res,next) => {
  try {
    const userData = res.locals.userData;
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
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: parseInt(process.env.COOKIE_EXPIRATION_TIME, 10),
        path: "/",
      })
    );
    const user = {
      ...userData,
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  // res.locals.userData=user
  //  next();
  //  res.status(200).json({
  //   message : "User Authenticated",
  //   data : user
  // })
  res.redirect(`http://localhost:5173/auth/callback?user=${encodeURIComponent(JSON.stringify(user))}`);
  
  } catch (error) {
    console.log(error);
    handleErrorResponse(res, 500);
  }
};

const SignUp = async (req, res, next) => {
  try {
    const { email, username, password } = req.body;
    if (!isEmail(email)) {
      return handleErrorResponse(
        res,
        401,
        "Email is Invalid. Please enter again"
      );
    }
    if (password.length < 7) {
      return handleErrorResponse(
        res,
        401,
        "Password length should be more than 6 character"
      );
    }

   

    const checkUser = await prisma.user.findFirst({
      where: {
        OR: [{ email: email }, { username: username }],
      },
    });

    if (checkUser) {
      return handleErrorResponse(res, 401, "User already exists");
    }

    const salt = await bcrypt.genSalt(5);
    const hashPassword = await bcrypt.hash(password, salt);

    const userData = await prisma.user.create({
      data: {
        email: email,
        username: username,
        password: hashPassword,
        createdAt: new Date(),
      },
    });
    res.locals.userData = userData;
    return next();
  } catch (error) {
    console.error(error);
    return handleErrorResponse(res, 500);
  }
};

const Login = async (req, res, next) => {
  try {

    
   

    const { credential, password } = req.body;


    if (!isEmail(credential)) {
      return handleErrorResponse(res, 401, "Email is Invalid. Please enter again");
    }
    let user = await prisma.user.findFirst({
      where: { email: credential },
    });
    if (password.length < 7) {
      return handleErrorResponse(
        res,
        401,
        "Password length should be more than 6 character"
      );
    }

    if (!user) {
      user = await prisma.user.findFirst({
        where: { username: credential },
      });

      if (!user) {
        return handleErrorResponse(res, 404, "Invalid credentials");
      }
    }

    const matchPassword = await bcrypt.compare(password, user.password);
    if (matchPassword) {
      res.locals.userData = user;
      return next();
    } else {
      return handleErrorResponse(res, 404, "Invalid credentials");
    }
  } catch (error) {
    console.log(error);
    return handleErrorResponse(res, 500);
  }
};

const GoogleAuth = async (req, res) => {
  try {
    let authUrl = await oauth2Client.generateAuthUrl({
      access_type: "offline",
      scope: [
        "https://www.googleapis.com/auth/userinfo.email",
        "openid",
        "https://www.googleapis.com/auth/userinfo.profile",
      ],
    });
    res.redirect(authUrl);
  } catch (error) {
    console.error(`userAuthorize => ${error}`);
  }
};

const GetGoogleData = async (req, res, next) => {
  try {
    const { code } = req.query;
    const authCode = code.replace("%2F", "/");
    const googleClientResponse = await oauth2Client.getToken(authCode);
    const tokens = googleClientResponse.tokens;
    if (!tokens) {
      return handleErrorResponse(res, 401, "Token is not found...");
    }
    const VerifyTokenResponse = await client.verifyIdToken({
      idToken: tokens.id_token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    if (!VerifyTokenResponse) {
      return handleErrorResponse(res, 401, "unauthorized");
    }

    const { email, email_verified, name, exp } = VerifyTokenResponse.payload;

    if (exp > Date.now()) {
      return handleErrorResponse(
        res,
        401,
        "Token is expired please try again."
      );
    }
    if (email_verified === true) {
      const user = await prisma.user.findUnique({
        where: {
          email: email,
        },
      });
      if (user) {
        res.locals.userData = user;
        next();
      } else {
        const randomPassword = `${Math.floor(Math.random() * 1000000000)}`;
        const passwordHash = await bcrypt.hash(randomPassword, 10);
        const userCount = await prisma.user.count();
        const newName = name.replaceAll(" ", "");
        const username = newName + userCount;
        const newUsername = username.replaceAll(" ", "");
        const userData = await prisma.user.create({
          data: {
            email: email,
            username: newUsername,
            password: passwordHash,
            createdAt: new Date(),
          },
        });
        res.locals.userData = userData;
        next();
      }
    } else {
      return handleErrorResponse(
        res,
        402,
        "Your email is not verified by google.please try login with email-password"
      );
    }
  } catch (error) {
    console.error(`userAuth => Error getting token : ${error}`);
    return handleErrorResponse(res, 500, "internal server error");
  }
};

const Logout = async (req, res) => {
  try {
    res.clearCookie('token');
    return res.status(200).json({ logOut: true });
  } catch (error) {
    return handleErrorResponse(res, 500, "Internal Server Error");
  }
};

const SendMail = async (req, res) => {
  try {
    const { email, purpose } = req.body;

    if (!email) {
      return handleErrorResponse(res, 400, "Please provide an email");
    }

    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      return handleErrorResponse(
        res,
        404,
        "User with this email does not exist."
      );
    }

    let recoveryToken = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "30m",
      }
    );

    const verifyEmailURL = "http://localhost:8000/auth/verifyemail?code=" + recoveryToken
    const forgotPasswordURL = "http://localhost:8000/auth/forgot-pass?code=" + recoveryToken

    if (purpose === "forgot-password") {
      const info = await transporter.sendMail({
        from: process.env.EMAIL,
        to: email,
        subject: "Forgot-Password",
        text: forgotPasswordURL,
        html: "<b>Hello world?</b>",
      });
    } else if (purpose === "verify-email") {
      const info = await transporter.sendMail({
        from: process.env.EMAIL,
        to: email,
        subject: "Verify Email",
        text: verifyEmailURL,
        html: "<b>Hello world?</b>",
      });
    }
    console.log("Message sent: %s", info.messageId);

    return res.json({
      data: recoveryToken,
      message: "Mail sent successfully",
    });
  } catch (error) {
    console.log(error);
    return handleErrorResponse(res, 500, "Internal Server Error");
  }
};

const ResetPassword = async (req, res) => {
  try {
    const { id } = res.locals.userData;
    const { password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
      return handleErrorResponse(res, 401, "Both password does not match");
    }
    if (password.length < 7) {
      return handleErrorResponse(
        res,
        401,
        "Password length should be more than 6"
      );
    }

    const newpasswordHash = await bcrypt.hash(password, 10);

    await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        password: newpasswordHash,
      },
    });

    return res.status(200).json({ message: "Password changed successfully." });
  } catch (error) {
    console.log(error);
    return handleErrorResponse(res, 500, "Internal Server Error");
  }
};

const ForgotPassword = async (req, res) => {
  try {
    const { password, confirmPassword } = req.body;
    const { code } = req.query;
    const recoveryToken = code;
    jwt.verify(recoveryToken, process.env.JWT_SECRET, async (err, value) => {
      if (err) {
        return res.status(400).json({
          message: "Link expired!!!",  
        });
      } else {
        const user = await prisma.user.findUnique({
          where: { email: value.id },
        });
        if(!user){
          return res.status(404).json({
            message:"User not found"
          })
        }
        if (password !== confirmPassword) {
          return handleErrorResponse(res, 401, "Both password does not match");
        }
        if (password.length < 7) {
          return handleErrorResponse(
            res,
            401,
            "Password length should be more than 6"
          );
        }
    
        const newpasswordHash = await bcrypt.hash(password, 10);
    
        await prisma.user.update({
          where: {
            id: id,
          },
          data: {
            password: newpasswordHash,
          },
        });
      }
      return res.status(200).json({ message: "Password changed successfully." });
    });
  } catch (error) {
    console.log(error);
    return handleErrorResponse(res, 500, "Internal Server Error");
  }
};

const VerifyEmail = async (req, res) => {
  try {
    const { code } = req.query;
    const recoveryToken  = code;
    jwt.verify(recoveryToken, process.env.JWT_SECRET, async (err, value) => {
      if (err) {
        return res.status(400).json({
          message: "Link expired!!!",  
        });
      } else {
        const user = await prisma.user.findUnique({
          where: { email: value.id },
        });
        if(!user){
          return res.status(404).json({
            message:"User not found"
          })
        }
        const updateUser = await prisma.user.update({
          where:{
            id: value.id
          },
          data:{
            isVerified: true
          }
        })
      }
    });
    return res.status(200).json({
      messagae:"EmailVerified"
    })
  } catch (error) {
    console.log(error);
    return handleErrorResponse(res, 500, "Internal Server Error");
  }
};

export {
  SignUp,
  Login,
  SetToken,
  GoogleAuth,
  GetGoogleData,
  Logout,
  SendMail,
  ResetPassword,
  ForgotPassword,
  VerifyEmail
};