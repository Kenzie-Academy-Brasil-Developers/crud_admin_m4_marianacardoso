import { z } from "zod";
import { updateUserSchema } from "../schemas/users.schemas";

interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
  admin?: boolean | undefined;
  active: boolean;
}

type IUserRequest = Omit<IUser, "id" | "active">;

type IUserResponse = Omit<IUser, "password">;

type IUserUpdateRequest = z.infer<typeof updateUserSchema>;

export { IUser, IUserRequest, IUserResponse, IUserUpdateRequest };
