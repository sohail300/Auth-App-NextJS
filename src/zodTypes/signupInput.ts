import { z } from "zod";

// Custom validator function to check password complexity
function passwordComplexityValidator(value: any) {
    const uppercaseRegex = /[A-Z]/;
    const lowercaseRegex = /[a-z]/;
    const numberRegex = /[0-9]/;
  
    return (
      (uppercaseRegex.test(value) || lowercaseRegex.test(value)) &&
      numberRegex.test(value)
    );
  }

export const signupInput = z.object({
    username: z
      .string()
      .max(20, "Username should be between 1-20 charcacters.")
      .min(1, "Username should be between 1-20 charcacters."),
    email: z
      .string()
      .email()
      .max(20, "Email should be between 1-20 charcacters.")
      .min(1, "Email should be between 1-20 charcacters."),
    password: z
      .string()
      .max(20, "Password should be between 1-20 charcacters.")
      .min(1, "Password should be between 1-20 charcacters.")
      .refine((value) => passwordComplexityValidator(value), {
        message:
          "Password must contain at least one uppercase letter or one lowercase letter and one digit",
      }),
  });