import { QueryResult } from "pg";
import { IUserResponse } from "../../interfaces/users.interfaces";
import { client } from "../../database";

const listUsersServices = async (): Promise<Array<IUserResponse>> => {
  const queryString: string = `
    SELECT
        "id",
        "name",
        "email",
        "admin",
        "active"
    FROM
        users;
    `;

  const queryResult: QueryResult<IUserResponse> = await client.query(
    queryString
  );

  return queryResult.rows;
};

export { listUsersServices };
