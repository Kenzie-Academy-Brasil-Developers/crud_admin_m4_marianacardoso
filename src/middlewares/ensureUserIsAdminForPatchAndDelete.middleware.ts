import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { AppError } from "../error";

const ensureUserIsAdminForPatchAndDelete = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const { admin } = res.locals;
  const { id } = res.locals;
  const idReq = req.params.id;

  if (!admin && id !== idReq) {
    throw new AppError("Insufficient Permission", 403);
  }

  return next();
};

export default ensureUserIsAdminForPatchAndDelete;
