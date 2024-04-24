import { connection } from "@/db/connection";
import { User } from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

const loginInput = z.object({
  username: z.string().min(1, "Enter Username"),
  password: z.string().min(1, "Enter Password"),
});

connection();

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const parsedInput = loginInput.safeParse(await req.json());

    if (parsedInput.success === false) {
      return NextResponse.json({ msg: parsedInput.error });
    }

    const { username, password } = parsedInput.data;

    const user = await User.findOne({ username });

    if (!user) {
      return NextResponse.json({ msg: "Invalid Credentials", status: "401" });
    } else {
      const match = await bcryptjs.compare(password, user.password);

      if (match) {
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
          expiresIn: "1h",
        });

        const response = NextResponse.json({
          msg: "User logged in",
          status: "200",
        });

        response.cookies.set("token", token, {
          httpOnly: true,
        });

        return response;
      } else {
        return NextResponse.json({ msg: "Invalid Credentials", status: "401" });
      }
    }
  } catch (error) {
    return NextResponse.json({ msg: error, status: "500" });
  }
}
