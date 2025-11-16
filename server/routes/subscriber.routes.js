import express from 'express';

import {
    subscribe,
    unsubscribe,
    getAllSubscribers
} from '../controllers/subscriber.controller.js';

const subscriberRouter = express.Router();

subscriberRouter.post('/subscribe', subscribe);
subscriberRouter.post('/unsubscribe', unsubscribe);
subscriberRouter.get('/', getAllSubscribers);

export default subscriberRouter;