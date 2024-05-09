const express = require("express");
const authRoutes = require("./src/routes/auth.route");

const app = express();
require('dotenv').config();


app.use(express.json());

app.use("/auth/", authRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("Server is running on Port : ", PORT);
});
