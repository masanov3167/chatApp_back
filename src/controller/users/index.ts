import { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import Users from "../../entities/users.entity";
import { ErrorHandler } from "../../utils/errorHandler";
import getCustomParams from "../../utils/getCustomParams";
import Validate from "./validate";
import succesResponse from "../../utils/SuccessResponse";
import { findAll, findOne, insert, update } from "../../utils/OrmFn";
import validationError from "../../utils/validationError";
import envconfig from "../../config/envconfig";
import { CustomRequest } from "../../middleware/checkUserId";
import notFoundResponse from "../../utils/notFoundResponse";
import { Not } from "typeorm";
import { signToken } from "../../utils/functions";
import { RequestWithToken } from "../../middleware/checkUserToken";

const get = async (req: CustomRequest, res: Response, next: NextFunction) => {
  const {user: currentUser} = req;
  const users = await findAll(Users, {id: Not(currentUser.id)}, undefined, { id: "DESC" }, ["id", "name", "phone"]);  
  succesResponse(res, users, next);
};


const login = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const { error, value } = Validate.login(req.body);

  if (error) {
    validationError(res, error, next);
    return;
  }

  const user = await findOne(Users, { login: value.login });
  if(!user){
    return next(new ErrorHandler("Login yoki parol xato", 400))
  }
  const isValid = bcrypt.compareSync(value.parol, user.parol);
  if (!isValid) {    
    return next(new ErrorHandler("Login yoki parol xato", 400))
  }
  
  const token = signToken(user);
  if(!token){
    return next(new ErrorHandler("Birozdan so'ng urinib ko'ring", 400))
  }
  succesResponse(res, {...user, token}, next);
};

interface registerRequest extends Request{
  secretkey: string
}

const register = async (req: registerRequest, res: Response, next: NextFunction) => {
  const {secretkey} = req.headers;
  if(!secretkey || secretkey && secretkey != envconfig.jwt_secret_key){
    return next(new ErrorHandler("Login yoki parol xato :("))
  }
  const { error, value } = Validate.register(req.body)

  if (error) {
    validationError(res, error, next);
    return;
  }

  const user = await findOne(Users, { login: value.login });
  if(user){
    return next(new ErrorHandler(`${value.login} loginli foydalanuvchi avvaldan mavjud`))
  }

  const salt = bcrypt.genSaltSync(10);
  value.parol = bcrypt.hashSync(value.parol, salt);
  
  const newUser = await insert(Users, value)
  if (newUser.ok) {
   return succesResponse(res, newUser.data, next);
  } else {
    return next(new ErrorHandler(newUser.msg, 500));
  }
};

const put = async (req: RequestWithToken, res: Response, next: NextFunction) => {  
  const { error, value } = Validate.put(req.body);

  if (error) {
    validationError(res, error, next);
    return;
  }
  const salt = bcrypt.genSaltSync(10);
  value.parol = bcrypt.hashSync(value.parol, salt);
  const {user} = req

  const updated = await update(Users, { id: user.id }, value);

  if (!updated.ok) {
    return next(new ErrorHandler(updated.msg, 404));
  }
  const token = signToken(updated.data);

  if(!token){
    return next(new ErrorHandler("Birozdan so'ng urinib ko'ring", 400))
  }

  succesResponse(res, {...updated.data, token}, next );
};

export default {
  get: async (_: Request, res: Response, next: NextFunction) => {
    getCustomParams(_, res, next, get);
  },
  login: async (req: Request, res: Response, next: NextFunction) => {
    getCustomParams(req, res, next, login);
  },
  register: async (req: Request, res: Response, next: NextFunction) => {
    getCustomParams(req, res, next, register);
  },
  put: async (req: Request, res: Response, next: NextFunction) => {
    getCustomParams(req, res, next, put);
  },
};
