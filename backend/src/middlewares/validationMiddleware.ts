import { Request, Response, NextFunction } from "express";
import { loginShcema, registerSchema } from "../controllers/authSchema";

export const validateRegisterS = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = registerSchema.validate(req.body);
  if (error) {
    res.status(400).json({ error: error.details[0].message });
  }
  next();
};

export const validateLoginS = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = loginShcema.validate(req.body);
  if (error) {
    res.status(400).json({ error: error.details[0].message });
  }
  next();
};

export const validatekPromptS = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = loginShcema.validate(req.body);
  if (error) {
    res.status(400).json({ error: error.details[0].message });
  }
  next();
};
