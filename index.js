import express from 'express';
import cors from 'cors';
import mongoose from "mongoose";
import usersRouter from "./routers/users.router.js";
import * as dotenv from 'dotenv';
import momentsRouter from "./routers/moments.router.js";
import fileUpload from 'express-fileupload';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(fileUpload({}));
app.use(express.static('static'));
app.use('/auth', usersRouter);
app.use('/moment', momentsRouter);

app.listen(4444, (error) => {
    if (error) {
        return console.log(error);
    }
    mongoose
        .connect(process.env.DB_URL)
        .then(() => console.log('Database connect'))
        .catch((err) => console.log('Database fail connect', err));
    console.log('Server started');
})