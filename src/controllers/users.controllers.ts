import { Request, Response } from "express";
import createUsersService from "../services/users/createUsers.service";
import {
  IUserRequest,
  IUserResponse,
  IUserUpdateRequest,
} from "../interfaces/users.interfaces";
import { listUsersServices } from "../services/users/listUsers.services";
import updateUsersService from "../services/users/updateUsers.service";
import listUserProfileService from "../services/users/listUserProfile.service";
import deleteUsersService from "../services/users/deleteUsers.service";
import recoverUsersService from "../services/users/recoverUsers.service";

const createUsersController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userData: IUserRequest = req.body;
  const newUser: IUserResponse = await createUsersService(userData);
  return res.status(201).json(newUser);
};

const listUsersController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const users = await listUsersServices();
  return res.json(users);
};

const updateUsersController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userId: number = parseInt(req.params.id);
  const userData: IUserUpdateRequest = req.body;

  const updatedUser = await updateUsersService(userId, userData);

  return res.json(updatedUser);
};

const listUserProfileController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const user = await listUserProfileService(res.locals.id);

  return res.json(user);
};

const deleteUsersController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userId: number = parseInt(req.params.id);

  const deletedUser = await deleteUsersService(userId);

  return res.status(204).send();
};

const recoverUsersController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userId: number = parseInt(req.params.id);

  const recoveresUser = await recoverUsersService(userId);

  return res.json(recoveresUser);
};

export {
  createUsersController,
  listUsersController,
  updateUsersController,
  listUserProfileController,
  deleteUsersController,
  recoverUsersController,
};
