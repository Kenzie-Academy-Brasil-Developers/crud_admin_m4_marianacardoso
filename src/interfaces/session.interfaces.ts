import { z } from "zod";
import {
  requestLoginSchema,
  responseLoginSchema,
} from "../schemas/session.schemas";

type ILoginRequest = z.infer<typeof requestLoginSchema>;
type ILoginResponse = z.infer<typeof responseLoginSchema>;

export { ILoginRequest, ILoginResponse };
