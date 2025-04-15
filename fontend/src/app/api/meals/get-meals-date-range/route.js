import api from "@/services/api";
import { NextResponse } from "next/server";

export async function GET(request) {
  const searchParams = request.nextUrl.searchParams;
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");

  try {
    const response = await api.get("/meals-date-range", {
      params: {
        startDate,
        endDate,
      },
    });
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
