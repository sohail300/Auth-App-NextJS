import { NextRequest, NextResponse } from "next/server";
import { connection } from "@/db/connection";

connection();

export async function GET(req: NextRequest) {
  try {
    const response = NextResponse.json({
      msg: "User Logged Out",
      status: '200'
    });

    response.cookies.set("token", "", {
      httpOnly: true,
      expires: new Date(0),
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ msg: error.message, status: "500" });
  }
}
