import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import express from "express";
import connectDB from "./DB/connection.js";
import userRouter from "./src/routes/user.route.js";
import authRouter from "./src/routes/auth.route.js";

//Set Directory dirname
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, "./config/.env") });

const app = express();
const port = process.env.PORT;
const baseUrl = process.env.BASEURL;

//convert Buffer Data
app.use(express.json());

app.use(`${baseUrl}/user`, userRouter);
app.use(`${baseUrl}/auth`, authRouter);

//In-Valid URL
app.get("*", (req, res) => {
  res.status(404).send("Error 404 Not Found");
});

//Connections
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
connectDB();
