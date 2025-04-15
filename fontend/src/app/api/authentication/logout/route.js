import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieStore = await cookies();
  const allCookies = cookieStore.getAll();
  allCookies.forEach((cookie) => {
    cookieStore.set(cookie.name, "", {
      path: "/",
      httpOnly: true,
      expires: new Date(0),
    });
  });

  return NextResponse.json({ message: "Logout done!" });
}
