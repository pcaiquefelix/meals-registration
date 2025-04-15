import api from "@/services/api";
import { NextResponse } from "next/server";

export async function POST(request) {
  const protein = await request.json();

  try {
    const response = await api.post("/proteins", protein);
    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json(
      error.response
        ? error.response.data
        : error.code === "ECONNREFUSED"
        ? error.code
        : error.message,
      { status: error.status ? error.status : 500 }
    );
  }
}
