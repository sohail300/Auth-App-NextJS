import { connection } from "@/db/connection";
import { User } from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { loginInput } from "@/zodTypes/loginInput";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  try {
    await connection();
    const parsedInput = loginInput.safeParse(await req.json());

    if (parsedInput.success === false) {
      return Response.json({
        msg: parsedInput.error.message,
        status: "401",
        success: false,
      });
    }

    const { username, password } = parsedInput.data;

    const user = await User.findOne({ username });

    if (!user) {
      return Response.json({
        msg: "Invalid Credentials",
        status: "401",
        success: false,
      });
    } else {
      const match = await bcryptjs.compare(password, user.password);

      if (match) {
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
          expiresIn: "1h",
        });

        const response = NextResponse.json({
          msg: "User logged in",
          status: "200",
          success: true,
        });

        response.cookies.set("token", token, {
          httpOnly: true,
        });

        return response;
      } else {
        return Response.json({
          msg: "Invalid Credentials",
          status: "401",
          success: false,
        });
      }
    }
  } catch (error: any) {
    return Response.json({ msg: error.message, status: "500", success: false });
  }
}
