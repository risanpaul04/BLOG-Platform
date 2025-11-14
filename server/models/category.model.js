import mongoose from 'mongoose'

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },

    slug: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },

    description: {
        type: String,
        maxlength: 200
    },

    color: {
        type: String,
        default: '#3B82F6'
    },

    postCount: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
})

export default Category = mongoose.model('Category', categorySchema);