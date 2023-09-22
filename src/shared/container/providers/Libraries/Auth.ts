import { IAuth } from '../Interface';
import { sign, verify } from 'jsonwebtoken';
import auth from '@/config/auth';

interface IPayload {
    sub: string;
}

class Auth implements IAuth {
    generateToken(id_pessoa: string): string {
        return sign({}, auth.secret_token, {
            subject: id_pessoa,
            expiresIn: auth.expires_in_token,
        })
    }

    verifyToken(token: string): IPayload {
        return verify(token, auth.secret_token) as IPayload;
    }

    generateRefreshToken(id_pessoa: string): string {
        return sign({}, auth.secret_refresh_token, {
            subject: id_pessoa,
            expiresIn: auth.expires_in_refresh_token,
        });
    }

    verifyRefreshToken(token: string): IPayload {
        return verify(token, auth.secret_refresh_token) as IPayload;
    }
}

export { Auth };
