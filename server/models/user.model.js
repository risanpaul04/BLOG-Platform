import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 5,
        maxlength: 32
    },

    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },

    password: {
        type: String,
        required: true
    },

    role: {
        type: String,
        enums: ['user', 'author', 'admin'],
        default: 'user'
    },

    firstName: {
        type: String,
        required: true,
        minlength: 2,
        trim: true
    },

    lastName: {
        type: String,
        required: true,
        minlength: 2,
        trim: true
    },

    bio: {
        type: String,
        maxlength: 500
    },

    avatar: {
        type: String,
        default: 'default_avatar.jpg'
    },

    isActive: {
        type: Boolean,
        default: false
    },

    socialLinks: {
        x: String,
        instagram: String,
        github: String,
        linkedin: String
    }


}, {
    timestamps: true
})

export default User = mongoose.model('User', userSchema)