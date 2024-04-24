import { NextRequest, NextResponse } from "next/server";
import { User } from "@/models/userModel";
import { connection } from "@/db/connection";

connection();

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const { token } = await req.json();
    console.log(token);

    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    });
    console.log(user);

    if (user) {
      user.isVerified = true;
      user.verifyToken = null;
      user.verifyTokenExpiry = null;
      await user.save();
      return NextResponse.json({ msg: "Email Verified", status: "200" });
    } else {
      return NextResponse.json({ msg: "Invalid Token", status: "403" });
    }
  } catch (error: any) {
    return NextResponse.json({ msg: error.message, status: "500" });
  }
}
