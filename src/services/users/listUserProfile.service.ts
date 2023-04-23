import { QueryConfig, QueryResult } from "pg";
import { IUserResponse } from "../../interfaces/users.interfaces";
import { client } from "../../database";
import { responseUserSchema } from "../../schemas/users.schemas";

const listUserProfileService = async (
  userId: number
): Promise<IUserResponse> => {
  const queryString: string = `
  SELECT
      *
  FROM
      users
  WHERE
      id = $1;
`;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [userId],
  };

  const queryResult: QueryResult = await client.query(queryConfig);

  const user = responseUserSchema.parse(queryResult.rows[0]);

  return user;
};

export default listUserProfileService;
