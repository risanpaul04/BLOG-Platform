import Post from '../models/post.model.js';
import User from '../models/user.model.js';
import Category from '../models/category.model.js';
import Tag from '../models/tag.model.js';


const createPost = async (req, res) => {
    const {
        title,
        slug,
        excerpt,
        content,
        featuredImage,
        author,
        category,
        tags,
        status = 'draft',
        isFeatured = false,
        allowComments = true,
        seo
    } = req.body;

    if(!title || !content || !category) {
        return res.status(400).json({
            success: false,
            message: 'Title content and category required.'
        });
    }

    if(slug) {
        const existingPosts = await Post.findOne({slug});
        if(existingPosts) {
            return res.status(409).json({
                success: false,
                message: 'Slug already exists. Use different slug.'
            });
        }
    }

    if(category) {
        const categoryExists = Category.findById(category);
        
    }
}

const updatePost = (req, res) => {

}

const deletePost = (req, res) => {

}

const toggleLike = (req, res) => {

}

export { createPost, updatePost, deletePost, toggleLike}