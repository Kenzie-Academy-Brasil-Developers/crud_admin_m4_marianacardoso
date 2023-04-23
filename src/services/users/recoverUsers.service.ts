import { QueryConfig, QueryResult } from "pg";
import { client } from "../../database";
import { IUserResponse } from "../../interfaces/users.interfaces";
import { responseUserSchema } from "../../schemas/users.schemas";

const recoverUsersService = async (userId: number): Promise<IUserResponse> => {
  const queryString: string = `
    UPDATE
        users
    SET
        active = true
    WHERE
        id = $1
    RETURNING
        *;
  `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [userId],
  };

  const queryResult: QueryResult<IUserResponse> = await client.query(
    queryConfig
  );

  const user = responseUserSchema.parse(queryResult.rows[0]);
  return user;
};

export default recoverUsersService;
