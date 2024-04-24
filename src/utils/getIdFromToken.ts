import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function getIdFromToken(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value || "";
    console.log(token)
    const decodedToken: any = jwt.verify(token, process.env.JWT_SECRET!);
    console.log(decodedToken)

    return NextResponse.json({ id: decodedToken.id });
  } catch (error: any) {
    return NextResponse.json({ msg: error.message, status: "500" });
  }
}
