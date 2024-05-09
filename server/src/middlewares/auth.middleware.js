// import { Response, Request, NextFunction } from "express";
// import { PrismaClient } from "@prisma/client";
// import Jwt from "jsonwebtoken";

// const prisma = new PrismaClient();

// export const verifyToken = async (
//   req,
//   res,
//   next
// ) => {
//   try {
//     // console.log(req.headers);
//     const accessToken = req.headers.authorization.split(" ")[1];

//     console.log(accessToken);

//     const data = await Jwt.verify(accessToken, process.env.JWT_SECRET!);
//     const userId = data.id;

//     const userDetails = await prisma.users.findFirst({
//       where: {
//         Uid: userId,
//       },
//       select: {
//         Uid: true,
//         name: true,
//         email: true,
//         mobileNum: true,
//       },
//     });

//     res.locals.currentUser = {
//       Uid: userDetails!.Uid,
//       name: userDetails!.name,
//       email: userDetails!.email,
//       mobileNum: userDetails!.mobileNum,
//     };
//     return next();
//   } catch (error) {
//     console.log(error);
//     return res.status(401).json({
//       message: "unauthorized",
//     });
//   }
// };