import express from 'express';

import {
    getAllUsers,
    getUserById,
    getUserByUserName,
    updateUser,
    deleteUser
} from '../controllers/user.controller'

const userRouter = express.Router();

userRouter.get('/', getAllUsers);
userRouter.get('/:id', getUserById);
userRouter.get('/:username', getUserByUserName);
userRouter.put('/:id', updateUser);
userRouter.delete('/:id', deleteUser);

export default userRouter;