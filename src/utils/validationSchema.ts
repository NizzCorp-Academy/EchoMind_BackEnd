import Joi from "joi";

class ValidationSchema {
  registerSchema = Joi.object({
    username: Joi.string().min(2).required(),
    email: Joi.string().email().min(3).required(),
    password: Joi.string().min(3).required(),
  });

  loginSchema = Joi.object({
    email: Joi.string().email().min(3).required(),
    password: Joi.string().min(3).required(),
  });

  promptSchema = Joi.object({
    prompt: Joi.string().required(),
  });

  idSchema = Joi.string().required();
  idOptionSchema = Joi.string().optional();
}
