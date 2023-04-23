import { NextFunction, Request, Response } from "express";
import { QueryConfig, QueryResult } from "pg";
import { client } from "../database";
import { AppError } from "../error";

const ensureUserIsActiveToLoginMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const email = req.body.email;

  const queryString: string = `
    SELECT
        active
    FROM
        users
    WHERE
        email = $1;
  `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [email],
  };

  const queryResult: QueryResult = await client.query(queryConfig);

  if (queryResult.rowCount === 0 || !queryResult.rows[0].active) {
    throw new AppError("Wrong email/password", 401);
  }

  return next();
};

export default ensureUserIsActiveToLoginMiddleware;
