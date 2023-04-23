import { Request, Response } from "express";
import {
  ILoginRequest,
  ILoginResponse,
} from "../interfaces/session.interfaces";
import createSessionService from "../services/login/createSession.service";

const createSessionController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userData: ILoginRequest = req.body;
  const token: ILoginResponse = await createSessionService(userData);
  return res.status(200).json(token);
};

export default createSessionController;
