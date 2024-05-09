import { User } from "@/models/userModel";
import { getIdFromToken } from "@/utils/getIdFromToken";
import { NextRequest } from "next/server";
import { connection } from "@/db/connection";

export async function GET(req: NextRequest) {
  try {
    await connection();
    const { id }: any = await (await getIdFromToken(req)).json();

    const user = await User.findById(id).select(
      "_id username email isVerified"
    );

    if (user) {
      return Response.json({
        msg: "User found",
        user,
        success: true,
        status: "200",
      });
    } else {
      return Response.json({
        msg: "User doesnt exist",
        success: false,
        status: "404",
      });
    }
  } catch (error: any) {
    return Response.json({ msg: error.message, success: false, status: "500" });
  }
}
