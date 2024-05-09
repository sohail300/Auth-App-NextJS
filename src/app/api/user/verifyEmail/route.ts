import { NextRequest, NextResponse } from "next/server";
import { User } from "@/models/userModel";
import { connection } from "@/db/connection";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    await connection();
    const { token } = await req.json();

    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    });

    if (user) {
      user.isVerified = true;
      user.verifyToken = null;
      user.verifyTokenExpiry = null;
      await user.save();
      return Response.json({
        msg: "Email Verified",
        status: "200",
        success: true,
      });
    } else {
      return Response.json({
        msg: "Invalid Token",
        status: "403",
        success: false,
      });
    }
  } catch (error: any) {
    return Response.json({ msg: error.message, status: "500", success: false });
  }
}
