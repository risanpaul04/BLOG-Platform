import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        maxlength: 200
    },

    slug: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },

    excerpt: {
        type: String,
        maxlength: 300
    },

    content: {
        type: String,
        required: true
    },

    featuredImage: {
        type: String
    },

    author: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },

    category: {
        type: mongoose.Types.ObjectId,
        ref: 'Category'
    },

    tags: [{
        type: mongoose.Types.ObjectId,
        ref: 'Tag'
    }],

    status: {
        type: String,
        enums: ['draft', 'published', 'archived'],
        default: 'draft'
    },

    publishedAt: {
        type: Date
    },

    views: {
        type: Number,
        default: 0
    },

    likes: {
        type: Number,
        default: 0
    },

    readTime: {
        type: Number,
        default: 0
    },

    isFeatured: {
        type: Boolean,
        default: true
    },

    allowComments: {
        type: Boolean,
        default: true
    },

    seo: {
        metaTitle: String,
        metaDescription: String,
        keywords: [String]
    }
},
{
    timestamps: true
})

export default Post = mongoose.model('Post', postSchema);