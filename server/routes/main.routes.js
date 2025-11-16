import express from 'express';

import authRoutes from './auth.routes.js';
import userRoutes from './user.routes.js';
import categoryRoutes from './category.routes.js';
import tagRoutes from './tag.routes.js';
import postRoutes from './post.routes.js';
import commentRoutes from './comment.routes.js';
import subscriberRoutes from './subscriber.routes.js';
import statsRoutes from './stats.routes.js';

const mainRouter = express.Router();

mainRouter.use('/auth', authRoutes);
mainRouter.use('/users', userRoutes);
mainRouter.use('/categories', categoryRoutes);
mainRouter.use('/tags', tagRoutes);
mainRouter.use('/posts', postRoutes);
mainRouter.use('/comments', commentRoutes);
mainRouter.use('/subscribers', subscriberRoutes);
mainRouter.use('/stats', statsRoutes);

export default mainRouter;