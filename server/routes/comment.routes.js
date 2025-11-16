import express from 'express';

import {

} from '../controllers/comment.controller.js'

const commentRouter = express.Router();

commentRouter.get('/post/:postID', getCommentsByPost);
commentRouter.post('/', createComment);
commentRouter.put('/:id', updateComment);
commentRouter.delete('/:id', deleteComment);
commentRouter.post('/:id/like', toggleLike);

export default commentRouter;