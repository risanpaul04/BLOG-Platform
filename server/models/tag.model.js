import mongoose from 'mongoose';

const tagSchema = mongoose.Schema({
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
        lowercase: true,
        trim: true
    },

    postCount: {
        type: Number,
        default: 0
    }

}, {
    timestamps: true
})

export default Tag = mongoose.model('Tag', tagSchema)