import { connection } from "@/db/connection";
import { User } from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { mailer } from "@/utils/mailer";
import { z } from "zod";
import jwt from "jsonwebtoken";

connection();

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

const signupInput = z.object({
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
        "Password must contain at least one uppercase letter or one lowercase letter and one special character",
    }),
});

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const parsedInput = signupInput.safeParse(await req.json());

    if (parsedInput.success === false) {
      return NextResponse.json({ msg: parsedInput.error });
    }

    const { username, email, password } = parsedInput.data;

    const user = await User.findOne({ email });

    if (!user) {
      const salt = await bcryptjs.genSalt(10);
      const hashedPassword = await bcryptjs.hash(password, salt);

      const obj = {
        username,
        email,
        password: hashedPassword,
      };

      const newUser = new User(obj);
      const savedUser = await newUser.save();

      await mailer(email, "verify", savedUser._id);

      const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET!, {
        expiresIn: "1h",
      });

      const response = NextResponse.json({
        msg: "User registered",
        status: "201",
      });

      response.cookies.set("token", token, {
        httpOnly: true,
      });

      return response;
    } else {
      return NextResponse.json({ msg: "User already exists", status: "400" });
    }
  } catch (error) {
    return NextResponse.json({ msg: error, status: "500" });
  }
}
