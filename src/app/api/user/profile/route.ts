import { User } from "@/models/userModel";
import { getIdFromToken } from "@/utils/getIdFromToken";
import { NextRequest, NextResponse } from "next/server";
import { connection } from "@/db/connection";

connection();

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const { id }: any = await (await getIdFromToken(req)).json();

    const user = await User.findById(id).select("_id username email isVerified");

    if (user) {
      return NextResponse.json({ msg: "User found", data: user });
    } else {
      return NextResponse.json({ msg: "User doesnt exist" });
    }
  } catch (error: any) {
    return NextResponse.json({ msg: error.message, status: '500' });
  }
}
