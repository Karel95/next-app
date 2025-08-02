import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const prompt = await request.json();

  return NextResponse.json({ prompt });
}
