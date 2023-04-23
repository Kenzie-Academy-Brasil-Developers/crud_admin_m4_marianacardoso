import { NextFunction, Request, Response } from "express";
import { AppError } from "../error";

const ensureUserIsAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const { admin } = res.locals;

  if (!admin) {
    throw new AppError("Insufficient Permission", 403);
  }

  return next();
};

export default ensureUserIsAdmin;
