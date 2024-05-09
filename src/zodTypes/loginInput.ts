import { z } from "zod";

export const loginInput = z.object({
    username: z.string().min(1, "Enter Username"),
    password: z.string().min(1, "Enter Password"),
  });
  