const express = require("express");
const authRoutes = require("./src/routes/auth.route");
const {gameRoutes}=require("./src/routes/game.route");
const cors = require("cors");

const app = express();
// Enable CORS for all origins
// Define CORS options with specific origin and allow credentials
const corsOptions = {
  origin: "http://localhost:5173", // Update this with your frontend origin
  credentials: true, // Allow cookies and authorization headers with credentials
};

app.use(cors(corsOptions));

require('dotenv').config();


app.use(express.json());

app.use("/auth/", authRoutes);
app.use("/",gameRoutes)

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("Server is running on Port : ", PORT);
});
