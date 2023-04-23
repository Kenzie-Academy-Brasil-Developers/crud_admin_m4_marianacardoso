import { Router } from "express";
import createSessionController from "../controllers/session.controllers";
import ensureBodyIsValidMiddleware from "../middlewares/ensureBodyIsValid.middleware";
import { requestLoginSchema } from "../schemas/session.schemas";
import ensureUserIsActiveToLoginMiddleware from "../middlewares/ensureUserIsActiveToLogin.middleware";

const loginRoutes: Router = Router();

loginRoutes.post(
  "",
  ensureBodyIsValidMiddleware(requestLoginSchema),
  ensureUserIsActiveToLoginMiddleware,
  createSessionController
);

export default loginRoutes;
