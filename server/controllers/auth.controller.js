import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import {
    JWT_ACCESS_SECRET,
    JWT_ACCESS_EXPIRY,
    JWT_REFRESH_SECRET,
    JWT_REFRESH_EXPIRY
} from '../config/env.js'

import User from '../models/user.model.js';

const generateAccessToken = (user) => {
    return jwt.sign(
        {
            userId: user._id,
            username: user.username,
            email: user.email,
            role: user.role
        },
        JWT_ACCESS_SECRET,
        {expiresIn: JWT_ACCESS_EXPIRY}
    )
}

const generateRefreshToken = (user) => {
    return jwt.sign(
        {
            userId: user._id,
            email: user.email
        },
        JWT_REFRESH_SECRET,
        {expiresIn: JWT_REFRESH_EXPIRY}
    )
}

const getRefreshTokenExpiry = () => {
    return new Date(Date.now + 7*24*60*60*1000);
}

const setRefreshTokenCookie = (res, refreshToken) => {
    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Strict',
        maxAge: 7*24*60*60*1000,
        path: '/'
    })
}

const clearRefreshTokenCookie = (res) => {
    res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/'
    })
}

const signup = async (req, res) => {
    try {
        const {
            username,
            email,
            password,
            firstname,
            lastname
        } = req.body;

        if(!username || !email || !password || !firstname || !lastname) {
            res.status(400).json({
                success: false,
                message: 'required field missing'
            });
        }

        const existingUser = await User.findOne({$or: [{username}, {email}]});
        if(existingUser) {
            res.status(409).json({
                success: false,
                message: existingUser.email === email ? 
                    'Email already registered' : 'Username already taken'
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new User({
            username,
            email,
            password: hashedPassword,
            firstname,
            lastname
        });

        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);
        
        user.refreshTokens.push({
            token: refreshToken,
            expiresAt: getRefreshTokenExpiry(),
            userAgent: req.headers['user-agent'],
            ipAddress: req.ip || req.connection.remoteAddress
        });

        await user.save();

        setRefreshTokenCookie(res, refreshToken);

        res.status(201).json({
            success: true,
            message: 'User registerd successfully',
            data: {
                user: {
                    id: user._id,
                    username: user.username,
                    email: user.email,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    role: user.role
                },
                accessToken
            }
        })

    } catch (error) {
        console.error('signup error: ', error);
        res.status(400).json({
            success: false,
            message: 'error signing up user',
            error: error.message
        })
    }

}

const login = async(req, res) => {
    try {

        const {
            username,
            email,
            password
        } = req.body;

        const user = await User.findOne({$or: [{username}, {email}]});
        
        if(!user) {
            res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        if(!user.isActive) {
            res.status(403).json({
                success: false,
                message: 'Your account is deactivated. Contact support'
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.hashedPassword);

        if(!isPasswordValid) {
            res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        user.refreshTokens.push({
            token: refreshToken,
            expiresAt: getRefreshTokenExpiry(),
            userAgent: req.headers['user-agent'],
            ipAddress: req.ip || req.connection.remoteAddress
        });

        if(user.refreshTokens.length > user.maxSessions) {
            user.refreshTokens.shift();
        }

        await user.save();

        setRefreshTokenCookie(res, refreshToken);

        res.json({
            success: true,
            data: {
                user: {
                    id: user._id,
                    username: user.username,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    role: user.role,
                    avatar: user.avatar,
                    bio: user.bio
                },
                accessToken // Client stores this in memory
            }
        });

    } catch (error) {
        console.error('Login error: ', error);
        res.status(400).json({
            success: false,
            message: 'error logging in user',
            error: error.message
        })
    }
}

const logout = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        const userId = req.user.userId;

        if(userId && refreshToken) {
            await User.findByIdAndUpdate(userId, {
                $pull: { refreshTokens: {token: refreshToken}} 
            });
        }

        clearRefreshTokenCookie(res);

    } catch (error) {
        console.error('Logout error: ', error);
        res.status(401).json({
            success: false,
            message: 'error logging out',
            error: error.message
        });
    }
     
}

export {signup, login, logout}