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
app.use(express.json());

app.use(admin.options.rootPath, adminRouter); // Use AdminJS router

app.use("/auth/", authRoutes);
app.use("/", gameRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("Server is running on Port : ", PORT);
});
