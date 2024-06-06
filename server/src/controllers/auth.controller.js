import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';
import { UAParser } from 'ua-parser-js';
import { PrismaClient } from '@prisma/client';
import nodemailer from 'nodemailer';
import { handleErrorResponse } from '../errorResponses.js';
import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';

const OAuth2 = google.auth.OAuth2;
const client = new OAuth2Client();

const oauth2Client = new OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.REDIRECT_URI
);

const prisma = new PrismaClient();

const SetToken = async (req, res) => {
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
      'Set-Cookie',
      cookie.serialize('token', finalToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: parseInt(process.env.COOKIE_EXPIRATION_TIME, 10),
        path: '/',
      })
    );
    const user = {
      ...userData,
      access_token: accessToken,
      refresh_token: refreshToken,
    };
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    handleErrorResponse(res, 500);
  }
};

const SignUp = async (req, res, next) => {
  try {
    const { email, username, password, role } = req.body;

    console.log(req.body);

    if (password.length < 7) {
      return handleErrorResponse(res, 401, 'password length should be more than 6');
    }

    const checkUser = await prisma.user.findFirst({
      where: {
        OR: [{ email: email }, { username: username }],
      },
    });

    if (checkUser) {
      return handleErrorResponse(res, 401, 'User already exists');
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
    return handleErrorResponse(res, 500);
  }
};

const Login = async (req, res, next) => {
  try {
    const { credential, password } = req.body;

    let user = await prisma.user.findFirst({
      where: { email: credential },
    });
    if (!user) {
      user = await prisma.user.findFirst({
        where: { username: credential },
      });

      if (!user) {
        return handleErrorResponse(res, 404, 'Invalid credentials');
      }
    }

    const matchPassword = await bcrypt.compare(password, user.password);
    if (matchPassword) {
      res.locals.userData = user;
      return next();
    } else {
      return handleErrorResponse(res, 404, 'Invalid credentials');
    }
  } catch (error) {
    console.log(error);
    return handleErrorResponse(res, 500);
  }
};

const GoogleAuth = async (req, res) => {
  try {
    let authUrl = await oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: [
        'https://www.googleapis.com/auth/userinfo.email',
        'openid',
        'https://www.googleapis.com/auth/userinfo.profile',
      ],
    });
    res.redirect(authUrl);
  } catch (error) {
    console.error(`userAuthorize => ${error}`);
  }
};

const GetGoogleData = async (req, res, next) => {
  try {
    const code = req.query.code;
    code.replace('%2F', '/');
    const token = await oauth2Client.getToken(code);
    console.log('token =>', token);
    if (token == '') {
      return handleErrorResponse(res, 401, 'Token is not found...');
    }
    oauth2Client.credentials = token;
    const data = token.tokens;
    const ticket = await client.verifyIdToken({
      idToken: data.id_token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    if (!ticket) {
      return handleErrorResponse(res, 401, 'unauthorized');
    }
    let payload = ticket.getPayload();
    const userid = payload['sub'];
    payload.accessToken = data.access_token;
    payload.refreshToken = data.refresh_token;
    userData = payload;
    console.log(payload);

    const { email, email_verified, name, exp } = payload;

    if (exp > Date.now()) {
      return handleErrorResponse(res, 401, 'Token is expired please try again.');
    }
    if (email_verified === true) {
      const user = await prisma.user.findUnique({
        where: {
          email: email,
        },
      });
      const randomPassword = `${Math.floor(Math.random() * 1000000000)}`;
      const passwordHash = await bcrypt.hash(randomPassword, 10);
      const randomMobileNumber = `${Math.floor(Math.random() * 10000000000)}`;
      console.log(randomMobileNumber);
      if (user) {
        res.locals.userData = user;
        next();
      } else {
        const userCount = await prisma.user.count();
        const username = name + userCount;
        const userData = await prisma.user.create({
          data: {
            email: email,
            name: name,
            username: username,
            password: passwordHash,
          },
        });
        res.locals.userData = userData;
        next();
      }
    } else {
      return handleErrorResponse(res, 402, 'Your email is not verified by google.please try login with email-password');
    }
  } catch (error) {
    console.error(`userAuth => Error getting token : ${error}`);
    return handleErrorResponse(res, 500, 'internal server error');
  }
};

const Logout = async (req, res) => {
  try {
    res.clearCookie('token');
    return res.status(200).json({ logOut: true });
  } catch (error) {
    return handleErrorResponse(res, 500, 'Internal Server Error');
  }
};

const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  secure: false,
  auth: {
    user: 'maddison53@ethereal.email',
    pass: 'jn7jnAPss4f63QBp6D',
  },
});

const ForgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const userAgent = req.headers['user-agent'];
    const parser = new UAParser(userAgent);
    const result = parser.getResult();

    const browser = `${result.browser.name}/(${result.browser.version})`;
    const os = `${result.os.name}/(${result.os.version})`;

    if (email) {
      return handleErrorResponse(res, 400, 'Please provide an email');
    }

    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (user) {
      let recoveryToken = jwt.sign(
        {
          id: user.id,
          email: user.email,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: '30m',
        }
      );
      recoveryToken = recoveryToken.replace('.', '%2E');
      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          recovery_token: recoveryToken,
        },
      });

      const info = await transporter.sendMail({
        from: 'Maddison Foo Koch 👻" <maddison53@ethereal.email>',
        to: 'bar@example.com, baz@example.com',
        subject: 'Hello ✔',
        text: 'Hello world?',
        html: '<b>Hello world?</b>',
      });

      console.log('Message sent: %s', info.messageId);

      return res.json({
        data: recoveryToken,
        message: 'A recovery email has been sent to your email.',
      });
    } else {
      return handleErrorResponse(res, 404, 'User with this email does not exist.');
    }
  } catch (error) {
    console.log(error);
    return handleErrorResponse(res, 500, 'Internal Server Error');
  }
};

const Resetpassword = async (req, res) => {
  try {
    const { password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
      return handleErrorResponse(res, 401, 'Both password does not match');
    }
    if (password.length < 7) {
      return handleErrorResponse(res, 401, 'Password length should be more than 6');
    }
    let token = '';
    if (req.headers.authorization) {
      token = req.headers.authorization?.split(' ')[1];
    }
    token = token.replace('%2E', '.');
    jwt.verify(token, process.env.JWT_SECRET, async (err, value) => {
      try {
        if (err) {
          if (err.name === 'TokenExpiredError') {
            return handleErrorResponse(res, 401, 'Recovery time expired please try again.');
          } else {
            return handleErrorResponse(res, 401, 'Invalid Token provided');
          }
        } else {
          const user = await prisma.user.findUnique({
            where: { email: value.email },
            select: {
              id: true,
              recovery_token: true,
            },
          });
          if (!user) {
            return handleErrorResponse(res, 404, 'User not found/token invalid.');
          }

          if (user.recovery_token?.replace('%2E', '.') !== token) {
            return handleErrorResponse(res, 403, 'This password reset link is invalid now.');
          }
          const newpasswordHash = await bcrypt.hash(password, 10);
          console.log(newpasswordHash);

          await prisma.user.update({
            where: {
              id: user.id,
            },
            data: {
              password: newpasswordHash,
              recovery_token: '',
            },
          });

          return res.status(200).json({ message: 'Password changed successfully.' });
        }
      } catch (error) {
        return handleErrorResponse(res, 500, 'Internal server error');
      }
    });
  } catch (error) {
    console.log(error);
    return handleErrorResponse(res, 500, 'Internal Server Error');
  }
};

export {
  SignUp,
  Login,
  SetToken,
  GoogleAuth,
  GetGoogleData,
  Logout,
  ForgotPassword,
  Resetpassword,
};



// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const cookie = require("cookie");
// const { UAParser } = require("ua-parser-js");
// const { PrismaClient } = require("@prisma/client");
// const nodemailer = require("nodemailer");
// const {handleErrorResponse}=require('../errorResponses');

// const { google } = require("googleapis");
// const OAuth2 = google.auth.OAuth2;
// const { OAuth2Client } = require("google-auth-library");
// const client = new OAuth2Client();

// const oauth2Client = new OAuth2(
//   process.env.GOOGLE_CLIENT_ID,
//   process.env.GOOGLE_CLIENT_SECRET,
//   process.env.REDIRECT_URI
// );

// const prisma = new PrismaClient();

// const SetToken = async (req, res) => {
//   try {
//     const userData = res.locals.userData;
//     // Generating the Access Token
//     const accessToken = jwt.sign(
//       {
//         id: userData.id,
//         email: userData.email,
//       },
//       process.env.JWT_SECRET,
//       {
//         expiresIn: process.env.ACCESS_TOKEN_EXPIRATION_TIME,
//       }
//     );
//     // Generating the Refresh Token
//     const refreshToken = jwt.sign(
//       {
//         email: userData.email,
//         id: userData.id,
//       },
//       process.env.REFRESH_JWT_SECRET
//     );

//         const finalToken = `${accessToken} ${refreshToken}`;
//         res.set(
//             "Set-Cookie",
//             cookie.serialize("token", finalToken, {
//                 httpOnly: true,
//                 secure: process.env.NODE_ENV === "production", // At developmet Cookie will be insecure as we do not have SSL with us
//                 sameSite: "strict",
//                 maxAge: parseInt(process.env.COOKIE_EXPIRATION_TIME, 10),
//                 path: "/", //cookie valid for whole site
//             })
//         );
//         const user ={
//             ...userData,
//             access_token: accessToken,
//             refresh_token: refreshToken,
//         }
//         return res.status(200).json(user);
//     } catch (error) {
//         console.log(error);
//         handleErrorResponse(res,500);
       
//     }
// };

// // id
// // username
// // email
// // password
// // role
// // favouriteGames
// // Like

// const SignUp = async (req, res, next) => {
//   try {
//     const { email, username, password, role } = req.body;

//     console.log(req.body);

//         if (password.length < 7) {
//            return handleErrorResponse(res,401,"password length should be more than 6");
        
//         }

//         const checkUser = await prisma.user.findFirst({
//             where: {
//                 OR: [{ email: email }, { username: username }],
//             },
//         });
        
//         if (checkUser) {
//             return handleErrorResponse(res,401,"User already exists");
            
            
//         }
        

//     const salt = await bcrypt.genSalt(5);
//     const hashPassword = await bcrypt.hash(password, salt);

//         const userData = await prisma.user.create({
//             data: {
//                 email: email,
//                 username: username,
//                 password: hashPassword,
//             },
//         });
//         res.locals.userData = userData;
//         return next();
//     } catch (error) {
//         console.error(error);
//         return handleErrorResponse(res,500);
       
//     }
// };

// const Login = async (req, res, next) => {
//   try {
//     const { credential, password } = req.body;

//         let user = await prisma.user.findFirst({
//             where:{email: credential},
//         });
//         if(!user){
//             user = await prisma.user.findFirst({
//                 where:{username: credential},
//             });
    
//             if (!user) {
//                 return  handleErrorResponse(res,404,"Invalid credentials");
                
//             }
//         }


//         const matchPassword = await bcrypt.compare(password, user.password);
//         if (matchPassword) {
//             res.locals.userData = user;
//             return next();
//         } else {
//             return handleErrorResponse(res,404,"Invalid credentials");
//         }
//     } catch (error) {
//         console.log(error);
//         return handleErrorResponse(res,500);
//     }
// };

// const GoogleAuth = async (req, res) => {
//   try {
//     let authUrl = await oauth2Client.generateAuthUrl({
//       access_type: "offline",
//       scope: [
//         "https://www.googleapis.com/auth/userinfo.email",
//         "openid",
//         "https://www.googleapis.com/auth/userinfo.profile",
//       ],
//     });
//     res.redirect(authUrl);
//   } catch (error) {
//     console.error(`userAuthorize => ${error}`);
//   }
// };

// const GetGoogleData = async (req, res, next) => {
//   try {
//     const code = req.query.code;
//     //  const accountData = await GetGoogleToken(req.query.code);
//     code.replace("%2F", "/");
//     const token = await oauth2Client.getToken(code);
//     console.log("token =>", token);
//     if (token == "") {
//       return handleErrorResponse(res,401,"Token is not found...")
//       // return res.status(401).json({ message: "Token is not found.." });
//     }
//     oauth2Client.credentials = token;
//     const data = token.tokens;
//     const ticket = await client.verifyIdToken({
//       idToken: data.id_token,
//       audience: process.env.GOOGLE_CLIENT_ID,
//     });
//     if (!ticket) {
//       return handleErrorResponse(res,401,"unauthorized")
//       // return res.status(401).json({  message: "unauthorized",});
//     }
//     let payload = ticket.getPayload();
//     const userid = payload["sub"];
//     payload.accessToken = data.access_token;
//     payload.refreshToken = data.refresh_token;
//     userData = payload;
//     console.log(payload);

//     const { email, email_verified, name, exp } = payload;

//     if (exp > Date.now()) {
//       return handleErrorResponse(res,401,"Token is expired please try again.")
//       // return res.status(401).json({ message: "Token is expired please try again." });
//     }
//     if (email_verified === true) {
//       const user = await prisma.user.findUnique({
//         where: {
//           email: email,
//         },
//       });
//       const randomPassword = `${Math.floor(Math.random() * 1000000000)}`;
//       const passwordHash = await bcrypt.hash(randomPassword, 10);
//       const randomMobileNumber = `${Math.floor(Math.random() * 10000000000)}`;
//       console.log(randomMobileNumber);
//       if (user) {
//         res.locals.userData = user;
//         next();
//       } else {
//         const userCount = await prisma.user.count();
//         const username = name + userCount;
//         const userData = await prisma.user.create({
//           data: {
//             email: email,
//             name: name,
//             username: username,
//             password: passwordHash,
//           },
//         });
//         res.locals.userData = userData;
//         next();
//       }
//     } else {
//       return handleErrorResponse(res,402,"Your email is not verified by google.please try login with email-password")
//       // return res.status(402).json({message:"Your email is not verified by google.please try login with email-password",});
//     }
//   } catch (error) {
//     console.error(`userAuth => Error getting token : ${error}`);
//     return handleErrorResponse(res,500,"internal server error");
//     // return res.status(500).json({message: "internal server error",});
//   }
// };

// const Logout = async (req, res) => {
//   try {
//     res.clearCookie("token");
//     return res.status(200).json({ logOut: true });
//   } catch (error) {
//     return handleErrorResponse(res,500, "Internal Server Error")
//     // res.status(500).json({ message: "Internal Server Error" });
//   }
// };

// const transporter = nodemailer.createTransport({
//   host: "smtp.ethereal.email",
//   port: 587,
//   secure: false, // Use `true` for port 465, `false` for all other ports
//   auth: {
//     user: "maddison53@ethereal.email",
//     pass: "jn7jnAPss4f63QBp6D",
//   },
// });

// const ForgotPassword = async (req, res) => {
//   try {
//     const { email } = req.body;

//     const userAgent = req.headers["user-agent"];
//     const parser = new UAParser(userAgent);
//     const result = parser.getResult();

//     const browser = `${result.browser.name}/(${result.browser.version})`;
//     const os = `${result.os.name}/(${result.os.version})`;

//     if (email) {
//       return handleErrorResponse(res,400,"Please provide an email")
//       // return res.status(400).json({ message: "Please provide an email" });
//     }

//     const user = await prisma.user.findUnique({
//       where: {
//         email: email,
//       },
//     });

//     if (user) {
//       let recoveryToken = jwt.sign(
//         {
//           id: user.id,
//           email: user.email,
//         },
//         process.env.JWT_SECRET,
//         {
//           expiresIn: "30m",
//         }
//       );
//       // URL encoding
//       recoveryToken = recoveryToken.replace(".", "%2E");
//       await prisma.user.update({
//         where: {
//           id: user.id,
//         },
//         data: {
//           recovery_token: recoveryToken,
//         },
//       });

//       const info = await transporter.sendMail({
//         from: 'Maddison Foo Koch 👻" <maddison53@ethereal.email>', // sender address
//         to: "bar@example.com, baz@example.com", // list of receivers
//         subject: "Hello ✔", // Subject line
//         text: "Hello world?", // plain text body
//         html: "<b>Hello world?</b>", // html body
//       });

//       console.log("Message sent: %s", info.messageId);

//       return res.json({
//         data: recoveryToken,
//         message: "A recovery email has been sent to your email.",
//       });
//     } else {
//       return handleErrorResponse(res,404,"User with this email does not exist.")
//       // return res.status(404).json({ message: "User with this email does not exist." });
//     }
//   } catch (error) {
//     console.log(error);
//     return handleErrorResponse(res,500,"Internal Server Error")
//     // return res.status(500).json({ message: "Internal Server Error" });
//   }
// };

// const Resetpassword = async (req, res) => {
//     try {
//       const { password, confirmPassword } = req.body;
//       if (password !== confirmPassword) {
//         return handleErrorResponse(res,401,"Both password does not match")
//         // return res.status(401).json({ message: "Both password does not match" });
//       }
//       if (password.length < 7) {
//         return handleErrorResponse(res,401,"Password length should be more than 6")
//         // return res.status(401).json({ message: "Password length should be more than 6" });
//       }
//       let token = "";
//       if (req.headers.authorization) {
//         token = req.headers.authorization?.split(" ")[1];
//       }
//       token = token.replace("%2E", "."); // Decoding the recovery jwt token.
//       jwt.verify(token, process.env.JWT_SECRET, async (err, value) => {
//         try {
//           if (err) {
//             if (err.name === "TokenExpiredError") {
//               return handleErrorResponse(res,401,"Recovery time expired please try again.")
//               // return res.status(401).json({ message: "Recovery time expired please try again." });
//             } else {
//               return handleErrorResponse(res,401,"Invalid Token provided")
//               // return res.status(401).json({ message: "Invalid Token provided" });
//             }
//           } else {
//             const user = await prisma.user.findUnique({
//               where: { email: value.email },
//               select: {
//                 id: true,
//                 recovery_token: true,
//               },
//             });
//             if (!user) {
//               return handleErrorResponse(res,404,"User not found/token invalid.")
//               // return res.status(404).json({ message: "User not found/token invalid." });
//             }
  
//             if (user.recovery_token?.replace("%2E", ".") !== token) {
//               return handleErrorResponse(res,403,"This password reset link is invalid now.")
//               // return res.status(403).json({message: "This password reset link is invalid now.",});
//             }
//             const newpasswordHash = await brcypt.hash(password, 10);
//             console.log(newpasswordHash);
  
//             await prisma.user.update({
//               where: {
//                 id: user.id,
//               },
//               data: {
//                 password: newpasswordHash,
//                 recovery_token: "",
//               },
//             });
  
//             return res.status(200).json({ message: "Password changed successfully." });
//           }
//         } catch (error) {
//           return handleErrorResponse(res,500,"Internal server error")
//           // return res.status(500).json({ message: "Internal server error" });
//         }
//       });
//     } catch (error) {
//       console.log(error);
//       return handleErrorResponse(res,500, "Internal Server Error")
//       // return res.status(500).json({ message: "Internal Server Error" });
//     }
//   };

// module.exports = { SignUp, Login, SetToken, GoogleAuth, GetGoogleData, Logout, ForgotPassword, Resetpassword };
