import { connection } from "@/db/connection";
import { User } from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connection();

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const { id } = await req.json();

    const user = await User.findById(id).select("username email isVerified");

    if (user) {
      return NextResponse.json({ msg: "User found", data: user });
    } else {
      return NextResponse.json({ msg: "User doesnt exist" });
    }
  } catch (error: any) {
    return NextResponse.json({ msg: error.message, status: "500" });
  }
}
