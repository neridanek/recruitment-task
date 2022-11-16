import { NextFunction, Request, Response } from "express";
import { AnySchema } from "yup";

export const validation =
  (schema: AnySchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validatedBody = await schema.validate(req.body);
      req.body = validatedBody;
      next();
    } catch (err) {
      return res.status(400).json(err);
    }
  };
