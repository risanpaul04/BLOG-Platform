import { config } from  'dotenv';

config({path: `.env.${process.env.NODE_ENV}`})

export const {
    PORT,
    NODE_ENV,
    JWT_ACCESS_SECRET,
    JWT_ACCESS_EXPIREY,
    JWT_REFRESH_SECRET,
    JWT_REFRESH_EXPIREY,

} = process.env