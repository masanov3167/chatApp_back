import jwt from 'jsonwebtoken';
import Users from '../entities/users.entity';
import envconfig from '../config/envconfig';

export function decoderToken(token: string): Users | false {
  try {
    const result = jwt.verify(token, envconfig.jwt_secret_key);
    return result as Users
  } catch (error) {
    return false;
  }
}

export function signToken( user: Users): string | false{
    try{
        const token = jwt.sign(
            user,
            envconfig.jwt_secret_key,
            {
                expiresIn:60*60
            }
          )
        return token
    }catch{
        return false
    }
}