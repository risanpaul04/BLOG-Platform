import express from 'express';
import { verifyToken } from '../middleware/auth.middleware.js';
import { 
    signup,
    login,
    logout,
    // logoutAll,
    // changePassword,
    // getActiveSessions,
    // revokeSession
} from '../controllers/auth.controller.js';

const authRouter = express.Router();

authRouter.post('/register', signup);
authRouter.post('/login', login);
authRouter.post('/logout', verifyToken, logout);

// to be implemented

// authRouter.post('/logout-all', verifyToken, logoutAll)
// authRouter.post('/change-password', verifyToken, changePassword);
// authRouter.get('/sessions', verifyToken, getActiveSessions);
// authRouter.delete('/sessions/:sessionId', verifyToken, revokeSession);

export default authRouter;