import { IAuth } from '../Interface';
import { sign, verify } from 'jsonwebtoken';
import auth from '@/config/auth';

interface IPayloadToken {
    sub: string;
}

interface IPayloadRefreshToken {
    sub: string;
    email: string;
}

class Auth implements IAuth {
    generateToken(id_pessoa: string): string {
        return sign({}, auth.secret_token, {
            subject: id_pessoa,
            expiresIn: auth.expires_in_token,
        })
    }

    verifyToken(token: string): IPayloadToken {
        return verify(token, auth.secret_token) as IPayloadToken;
    }

    generateRefreshToken(id_pessoa: string): string {
        return sign({}, auth.secret_refresh_token, {
            subject: id_pessoa,
            expiresIn: auth.expires_in_refresh_token,
        });
    }

    verifyRefreshToken(token: string): IPayloadRefreshToken {
        return verify(token, auth.secret_refresh_token) as IPayloadRefreshToken;
    }
}

export { Auth };
