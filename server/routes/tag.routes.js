import express from 'express';

import {
    getAllTags,
    getTagBySlug,
    createTag,
    updateTag,
    deleteTag
} from '../controllers/tag.controller.js';

const tagRouter = express.Router();

tagRouter.get('/', getAllTags);
tagRouter.get('/:slug', getTagBySlug);
tagRouter.post('/', createTag);
tagRouter.put('/:id', updateTag);
tagRouter.delete('/:id', deleteTag);

export default tagRouter;