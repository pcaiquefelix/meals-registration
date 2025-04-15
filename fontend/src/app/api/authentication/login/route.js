import api from "@/services/api";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request) {
  const credentials = await request.json();

  try {
    const response = await api.post("/authentication", credentials);
    const { id, nome } = { ...response.data };
    const cookieStore = await cookies();
    cookieStore.set("token", response.data.token, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
    });
    cookieStore.set("role", response.data.role, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
    });
    return NextResponse.json({ id, nome });
  } catch (error) {
    return NextResponse.json(
      error.response ? error.response.data : error.code,
      { status: error.status ? error.status : 500 }
    );
  }
}
