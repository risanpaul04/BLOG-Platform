import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './config/connectDB.js'
import routes from './routes/main.routes.js';

const app = express();

dotenv.config();

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));

app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({extended: true}));

// API Routes
app.use('/api', routes);

// DataBase Connection
connectDB();

const port = process.env.PORT || 3000

app.listen(port, ()=> {
    console.log(`Connected to port http://localhost:${port}`)
})