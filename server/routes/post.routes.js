import express from 'express'

import {
    getAllPosts,
    getFeaturedPosts,
    getPostsByCategory,
    getPostsByTag,
    getPostsBySlug,
    getPostsByAuthor,
    createPost,
    updatePost,
    deletePost,
    toggleLike
} from '../controllers/post.controller.js'

const postRouter = express.Router();

postRouter.get('/', getAllPosts);
postRouter.get('/featured/all', getFeaturedPosts);
postRouter.get('/category/:slug', getPostsByCategory);
postRouter.get('/tag/:slug', getPostsByTag);
postRouter.get('/:slug', getPostsBySlug);
postRouter.get('/author/:username', getPostsByAuthor);
postRouter.post('/', createPost);
postRouter.put('/:id', updatePost);
postRouter.delete('/:id', deletePost);
postRouter.post('/:id/like', toggleLike);

export default postRouter;