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
        required: true,
        select: false
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
    },

    refreshTokens: [{
        token: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        expiresAt: {
            type: Date,
            required: true
        },

        userAgent: String,
        ipAddress: String
    }],

    maxSessions: {
        type: Number,
        default: 2
    }

}, {
    timestamps: true
})

userSchema.pre('save', function(next) {
    if(this.refreshTokens) {
        this.refreshTokens = this.refreshTokens.filter(
            token => new Date(token.expiresAt) > new Date
        );
    }
    
    next();
})

export default User = mongoose.model('User', userSchema)