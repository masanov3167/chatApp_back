import Joi from "joi";
import joiCustomErrorMessages from "../../utils/joiCustomErrorMessage";

class Validate {
  
  login(data: any) {
    const schema = Joi.object().keys({
      login: Joi.string()
        .required()
        .max(64)
        .messages(joiCustomErrorMessages("login")),
      parol: Joi.string()
        .required()
        .max(64)
        .messages(joiCustomErrorMessages("parol"))
    });
    return schema.validate(data);
  }
  register(data: any) {
    const schema = Joi.object().keys({
      name: Joi.string()
      .max(25)
      .regex(
        /^[a-zA-Zа-яА-ЯёЁқҚғҒҳҲʼʻ’'`]{2,20}(?: [a-zA-Zа-яА-ЯёЁқҚғҒҳҲʼʻ’'`]{2,20}){0,2}$/
      )
      .required()
      .messages(joiCustomErrorMessages("ism")),
      phone: Joi.string()
      .max(15)
      .required()
      .regex(/^\+998\d{9}$/)
      .messages(joiCustomErrorMessages("telefon raqam")),
      login: Joi.string()
        .required()
        .max(64)
        .messages(joiCustomErrorMessages("login")),
      parol: Joi.string()
        .required()
        .max(64)
        .messages(joiCustomErrorMessages("parol"))
    });
    return schema.validate(data);
  }
  put(data: any) {
    const schema = Joi.object().keys({
      name: Joi.string()
      .max(25)
      .regex(
        /^[a-zA-Zа-яА-ЯёЁқҚғҒҳҲʼʻ’'`]{2,20}(?: [a-zA-Zа-яА-ЯёЁқҚғҒҳҲʼʻ’'`]{2,20}){0,2}$/
      )
      .required()
      .messages(joiCustomErrorMessages("ism")),
      phone: Joi.string()
      .max(15)
      .required()
      .regex(/^\+998\d{9}$/)
      .messages(joiCustomErrorMessages("telefon raqam")),
      login: Joi.string()
        .required()
        .max(64)
        .messages(joiCustomErrorMessages("login")),
      parol: Joi.string()
        .required()
        .max(64)
        .messages(joiCustomErrorMessages("parol"))
    });
    return schema.validate(data);
  }
}
export default new Validate;
