import { connection } from "@/db/connection";
import { User } from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { mailer } from "@/utils/mailer";
import jwt from "jsonwebtoken";
import { signupInput } from "@/zodTypes/signupInput";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  try {
    await connection();
    const parsedInput = signupInput.safeParse(await req.json());

    if (parsedInput.success === false) {
      return Response.json({
        msg: parsedInput.error.errors[0].message,
        success: false,
        status: "401",
      });
    }

    const { username, email, password } = parsedInput.data;

    const userByUsername = await User.findOne({ username });

    if (userByUsername) {
      if (userByUsername.isVerified) {
        return Response.json({
          msg: "Username already taken",
          status: "400",
          success: false,
        });
      } else {
        const userByEmail = await User.findOne({ email });
        if (userByEmail) {
          return Response.json({
            msg: "Email already present",
            status: "400",
            success: false,
          });
        } else {
          const salt = await bcryptjs.genSalt(10);
          const hashedPassword = await bcryptjs.hash(password, salt);

          userByUsername.email = email;
          userByUsername.password = hashedPassword;

          const savedUser = await userByUsername.save();

          await mailer(email, "verify", savedUser._id);

          const token = jwt.sign(
            { id: savedUser._id },
            process.env.JWT_SECRET!,
            {
              expiresIn: "1h",
            }
          );

          const response = NextResponse.json({
            msg: "User registered",
            status: "201",
            success: true,
          });

          response.cookies.set("token", token, {
            httpOnly: true,
          });

          return response;
        }
      }
    } else {
      const userByEmail = await User.findOne({ email });

      if (userByEmail) {
        return Response.json({
          msg: "User already exists",
          status: "400",
          success: false,
        });
      } else {
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
          success: true,
        });

        response.cookies.set("token", token, {
          httpOnly: true,
        });

        return response;
      }
    }
  } catch (error: any) {
    return Response.json({ msg: error.message, status: "500", success: false });
  }
}
