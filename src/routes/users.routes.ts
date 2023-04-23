import { Router } from "express";
import {
  createUsersController,
  deleteUsersController,
  listUserProfileController,
  listUsersController,
  recoverUsersController,
  updateUsersController,
} from "../controllers/users.controllers";
import ensureEmailAlreadyExists from "../middlewares/ensureEmailAlreadyExists.middleware";
import ensureBodyIsValidMiddleware from "../middlewares/ensureBodyIsValid.middleware";
import { requestUserSchema, updateUserSchema } from "../schemas/users.schemas";
import ensureTokenIsValidMiddleware from "../middlewares/ensureTokenIsValid.middleare";
import ensureUserIsAdmin from "../middlewares/ensureUserIsAdmin.middleware";
import ensureUserIsAdminForPatchAndDelete from "../middlewares/ensureUserIsAdminForPatchAndDelete.middleware";
import ensureUserExists from "../middlewares/ensureUserExists.middleware";
import ensureUserIsActive from "../middlewares/ensureUserIsActive.middleware";

const userRoutes: Router = Router();

userRoutes.post(
  "",
  ensureBodyIsValidMiddleware(requestUserSchema),
  ensureEmailAlreadyExists,
  createUsersController
);
userRoutes.get(
  "",
  ensureTokenIsValidMiddleware,
  ensureUserIsAdmin,
  listUsersController
);
userRoutes.get(
  "/profile",
  ensureTokenIsValidMiddleware,
  listUserProfileController
);
userRoutes.patch(
  "/:id",
  ensureUserExists,
  ensureBodyIsValidMiddleware(updateUserSchema),
  ensureTokenIsValidMiddleware,
  ensureUserIsAdminForPatchAndDelete,
  ensureEmailAlreadyExists,
  updateUsersController
);
userRoutes.delete(
  "/:id",
  ensureUserExists,
  ensureTokenIsValidMiddleware,
  ensureUserIsAdminForPatchAndDelete,
  deleteUsersController
);
userRoutes.put(
  "/:id/recover",
  ensureUserExists,
  ensureTokenIsValidMiddleware,
  ensureUserIsAdmin,
  ensureUserIsActive,
  recoverUsersController
);

export default userRoutes;
