import jwt from "jsonwebtoken";
import format from "pg-format";
import { QueryResult } from "pg";
import { client } from "../../database";
import { AppError } from "../../error";
import { compareSync } from "bcryptjs";
import {
  ILoginRequest,
  ILoginResponse,
} from "../../interfaces/session.interfaces";
import { IUser } from "../../interfaces/users.interfaces";

const createSessionService = async (
  payload: ILoginRequest
): Promise<ILoginResponse> => {
  const { email, password } = payload;

  const queryString: string = format(
    `
    SELECT
        *
    FROM
        users
    WHERE
        email = %L;
  `,
    email
  );

  const queryResult: QueryResult<IUser> = await client.query(queryString);

  if (queryResult.rowCount === 0) {
    throw new AppError("Wrong email/password", 401);
  }
  const user = queryResult.rows[0];

  const passwordIsValid: boolean = compareSync(password, user.password);

  if (!passwordIsValid) {
    throw new AppError("Wrong email/password", 401);
  }
  const token: string = jwt.sign(
    {
      admin: user.admin,
    },
    process.env.SECRET_KEY!,
    {
      expiresIn: "1d",
      subject: user.id.toString(),
    }
  );
  return { token };
};

export default createSessionService;
