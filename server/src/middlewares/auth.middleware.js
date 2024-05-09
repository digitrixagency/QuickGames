const { PrismaClient } = require("@prisma/client");
const Jwt = require("jsonwebtoken");

const prisma = new PrismaClient();

const VerifyToken = async (
  req,
  res,
  next
) => {
  try {
    // console.log(req.headers);
    const accessToken = req.headers.authorization.split(" ")[1];

    console.log(accessToken);

    const data = await Jwt.verify(accessToken, process.env.JWT_SECRET);
    const userId = data.id;

    const userDetails = await prisma.user.findFirst({
      where: {
        id: userId,
      },
      select: {
        id: true,
        username: true,
        email: true,
      },
    });

    res.locals.currentUser = {
      ...userDetails
    };
    return res.status(200).json({
        message:"authorized",
        data: userDetails,
    })
    return next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      message: "unauthorized",
    });
  }
};

module.exports = VerifyToken;