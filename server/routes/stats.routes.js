import express from 'express';
import {getStats} from '../controllers/stats.controller.js'
const statsRouter = express.Router();

statsRouter.get('/', getStats);

export default statsRouter;