import express from 'express';
import {
    getAllCategories,
    getCategoryBySlug,
    createCategory,
    updateCategory,
    deleteCategory
} from '../controllers/category.controller.js'

const categoryRouter = express.Router();

categoryRouter.get('/', getAllCategories);
categoryRouter.get('/:slug', getCategoryBySlug);
categoryRouter.post('/', createCategory);
categoryRouter.put('/:id', updateCategory);
categoryRouter.delete('/:id', deleteCategory);

export default categoryRouter;