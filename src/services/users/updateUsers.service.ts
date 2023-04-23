import format from "pg-format";
import {
  IUserResponse,
  IUserUpdateRequest,
} from "../../interfaces/users.interfaces";
import { QueryConfig, QueryResult } from "pg";
import { client } from "../../database";
import { responseUserSchema } from "../../schemas/users.schemas";

const updateUsersService = async (
  userId: number,
  userData: IUserUpdateRequest
): Promise<IUserResponse> => {
  const queryString: string = format(
    `
            UPDATE users
                SET(%I) = ROW(%L)
            WHERE
                id = $1
            RETURNING
                *;
        `,
    Object.keys(userData),
    Object.values(userData)
  );

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [userId],
  };

  const queryResult: QueryResult = await client.query(queryConfig);

  const newUser = responseUserSchema.parse(queryResult.rows[0]);

  return newUser;
};

export default updateUsersService;
