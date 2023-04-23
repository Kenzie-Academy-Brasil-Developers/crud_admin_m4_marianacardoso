import { z } from "zod";

const userSchema = z.object({
  id: z.number(),
  name: z.string().max(20),
  email: z.string().email().max(100),
  password: z.string().max(120),
  admin: z.boolean(),
  active: z.boolean(),
});

const requestUserSchema = userSchema
  .omit({ id: true, active: true })
  .partial({ admin: true });

const responseUserSchema = userSchema.omit({ password: true });

const updateUserSchema = requestUserSchema.omit({ admin: true }).partial();

export { userSchema, requestUserSchema, responseUserSchema, updateUserSchema };
