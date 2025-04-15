import api from "@/services/api";
import { NextResponse } from "next/server";

export async function GET(_, { params }) {
  const { date } = await params;

  try {
    const response = await api.get(`/week-meals/${date}`);
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
