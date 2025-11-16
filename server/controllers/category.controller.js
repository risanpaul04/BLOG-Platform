import Category from '../models/category.model.js';
import { verifyToken, authorize } from '../middleware/auth.middleware.js';
 
const getAllCategories = async (req, res) => {
    const {
        sortBy = 'name',
        order = 'asc',
        includePostCount = 'true'
    } = req.query;

    
}

const getCategoryBySlug = async (req, res) => {}

const createCategory = async (req, res) => {}

const updateCategory = async (req, res) => {}

const deleteCategory = async (req, res) => {}

export {getAllCategories, getCategoryBySlug, createCategory, updateCategory, deleteCategory}