import jwt from 'jsonwebtoken';
import Users from '../entities/users.entity';
import envconfig from '../config/envconfig';
import {existsSync, unlinkSync} from 'fs';
import path from "path";

export function decoderToken(token: string): Users | false {
  try {
    const result = jwt.verify(token, envconfig.jwt_secret_key);
    return result as Users
  } catch (error) {
    return false;
  }
}

export function signToken(user: Users): string | false{
    try{
        const token = jwt.sign(
            { ...user},
            envconfig.jwt_secret_key,
            {
                expiresIn: 60*60
            }
          );
        return token
    }catch(e){        
        return false
    }
}


export const removeMedia = (file: string): boolean =>{
  try{
    const url = path.join(__dirname, '..', '..', "..","public", file);
    existsSync(url) ? unlinkSync(url) : false;
    return true
  }catch(e){
    console.log("media remove err : ", e);
    return false
    
  }
}