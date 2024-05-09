import { NextRequest, NextResponse } from "next/server";
import { connection } from "@/db/connection";
import { ApiResponse } from "@/types/apiResponse";

export async function GET(req: NextRequest) {
  try {
    await connection();
    const response = NextResponse.json({
      msg: "User Logged Out",
      status: "200",
      success: true,
    });

    response.cookies.set("token", "", {
      httpOnly: true,
      expires: new Date(0),
    });

    return response;
  } catch (error: any) {
    return Response.json({ msg: error.message, status: "500", success: false });
  }
}
