import express from 'express';
import dotenv from 'dotenv/config';
import connectMongoose from './connectDB.js';
import router from './router/routerProfile.js';
import morgan from "morgan";
import cors from 'cors';
import cookieParser from "cookie-parser";

const app = express();
const port = process.env.PORT
//credentials ist wichtig für cookies
app.use(cors({
  origin: 'http://localhost:5173',credentials: true
}));


app.use(express.json());
app.use(morgan("dev"));

app.use(cookieParser());
app.use('/api', router);

connectMongoose();
app.listen(port);
console.log("listening on port:", port);
