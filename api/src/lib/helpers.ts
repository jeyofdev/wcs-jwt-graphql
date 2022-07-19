import * as jwt from 'jsonwebtoken';
import { IGenerateToken } from './helpers.spec';

/**
 * generate token JWT limit to 2 hours
 */
export const generateToken = (infos: IGenerateToken) => {
    if (process.env.SECRET_KEY) {
        let token = jwt.sign(infos, process.env.SECRET_KEY, {
            expiresIn: '2h',
        });

        return token;
    }
};
