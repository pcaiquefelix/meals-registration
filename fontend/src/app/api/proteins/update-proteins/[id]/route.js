import api from "@/services/api";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  const { id } = await params;
  const proteinUpdate = await request.json();

  try {
    const response = await api.put(`/proteins/${id}`, proteinUpdate);
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
