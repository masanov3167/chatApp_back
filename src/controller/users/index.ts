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

const get = async (req: CustomRequest, res: Response, next: NextFunction) => {
  const users = await findAll(Users, {}, undefined, { id: "DESC" });  
  succesResponse(res, users, next);
};

const getById = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const data = await findOne(Users, { id: Number(req.params.id) });
  if (data) {
    succesResponse(res, data, next);
  } else {
    notFoundResponse(next);
  }
};

const getMe = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const data = await findOne(Users, { id: Number(req.params.id) });
  if (data) {
    succesResponse(res, data, next);
  } else {
    notFoundResponse(next);
  }
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
  
  const token = jwt.sign(
    {...user},
    envconfig.jwt_secret_key
  );
  succesResponse(res, {...user, token}, next);
};

const register = async (req: Request, res: Response, next: NextFunction) => {
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
  console.log(value);
  
  const newUser = await insert(Users, value)
  if (newUser.ok) {
   return succesResponse(res, newUser.data, next);
  } else {
    return next(new ErrorHandler(newUser.msg, 500));
  }
};

const put = async (req: CustomRequest, res: Response, next: NextFunction) => {
  const { error, value } = Validate.put(req.body);

  if (error) {
    validationError(res, error, next);
    return;
  }

  const updated = await update(Users, { id: Number(req.params.id) }, value);

  if (!updated.ok) {
    return next(new ErrorHandler(updated.msg, 404));
  }

  succesResponse(res, updated.data, next );
};

export default {
  get: async (_: Request, res: Response, next: NextFunction) => {
    getCustomParams(_, res, next, get);
  },
  getById: async (req: Request, res: Response, next: NextFunction) => {
    getCustomParams(req, res, next, getById);
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
