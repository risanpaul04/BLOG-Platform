import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/connectDB.js'

const app = express();

dotenv.config();

app.use(express.json());
app.use(cors());

connectDB()

const port = process.env.PORT || 5500


app.listen(port, ()=> {
    console.log(`Connected to port http://localhost:${port}`)
})