import express from 'express';
import authRoutes from './src/routes/auth.route.js';
import { gameRoutes } from './src/routes/game.route.js';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import {admin, adminRouter} from './admin.js';

dotenv.config();

const app = express();
const corsOptions = {
  origin: "http://localhost:5173", // Update this with your frontend origin
  credentials: true, // Allow cookies and authorization headers with credentials
};
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(cookieParser()); // Use cookie-parser middleware
app.use(express.json());


// Session configuration
// app.use(session({
//   secret: process.env.JWT_SECRET,
//   resave: false,
//   saveUninitialized: false,
//   cookie: { secure: false } // Set to true in production with HTTPS
// }));

// // Middleware to check if user is an admin
// const isAdmin = async (req, res, next) => {
//   if (req.session.userId) {
//     const user = await prisma.user.findUnique({ where: { id: req.session.userId } });
//     if (user && user.role === 'ADMIN') {
//       return next();
//     }
//   }
//   res.status(403).send('Access denied');
// };

app.use(admin.options.rootPath , adminRouter); // Use AdminJS router

app.use("/auth/", authRoutes);
app.use("/", gameRoutes);
app.options('/auth/google', cors(corsOptions));

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("Server is running on Port : ", PORT);
});
