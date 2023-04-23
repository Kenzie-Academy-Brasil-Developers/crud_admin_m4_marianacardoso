import format from "pg-format";
import { IUserRequest, IUserResponse } from "../../interfaces/users.interfaces";
import { QueryResult } from "pg";
import { client } from "../../database";
import { responseUserSchema } from "../../schemas/users.schemas";
import { hashSync } from "bcryptjs";

const createUsersService = async (
  userData: IUserRequest
): Promise<IUserResponse> => {
  userData.password = hashSync(userData.password, 10);
  const queryString: string = format(
    `
    INSERT INTO
      users(%I) 
    VALUES
      (%L)
    RETURNING 
      *;
  `,
    Object.keys(userData),
    Object.values(userData)
  );

  const queryResult: QueryResult<IUserResponse> = await client.query(
    queryString
  );

  const newUser = responseUserSchema.parse(queryResult.rows[0]);

  return newUser;
};

export default createUsersService;
