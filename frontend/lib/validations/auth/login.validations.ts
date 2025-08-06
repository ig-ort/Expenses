import { z } from "zod";

export const LoginRequest = z.object({
  username: z.coerce
    .string()
    .min(1),
  // email: z.coerce
  //   .string()
  //   .email()
  //   .min(1),
  password: z.coerce
    .string()
    .min(1),
  remember: z.coerce
    .boolean()
    .default(false)
});
