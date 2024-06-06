import express from 'express';
import authRoutes from './src/routes/auth.route.js';
import { gameRoutes } from './src/routes/game.route.js';
// import AdminJS from 'adminjs'
// import AdminJSExpress from '@adminjs/express'
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const corsOptions = {
  origin: "http://localhost:5173", // Update this with your frontend origin
  credentials: true, // Allow cookies and authorization headers with credentials
};

app.use(cors(corsOptions));
app.use(express.json());

// const admin = new AdminJS({})

// const adminRouter = AdminJSExpress.buildRouter(admin)
// app.use(admin.options.rootPath, adminRouter)

app.use("/auth/", authRoutes);
app.use("/", gameRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("Server is running on Port : ", PORT);
});
