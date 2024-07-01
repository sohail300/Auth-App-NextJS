import { connection } from "@/db/connection";
import { User } from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    await connection();
    const { id } = await req.json();

    const user = await User.findById(id).select(
      "_id username email isVerified"
    );

    if (user) {
      return Response.json({
        msg: "User found",
        user,
        status: "200",
        success: true,
      });
    } else {
      return Response.json({
        msg: "User doesnt exist",
        status: "404",
        success: false,
      });
    }
  } catch (error: any) {
    return Response.json({ msg: error.message, status: "500", success: false });
  }
}
