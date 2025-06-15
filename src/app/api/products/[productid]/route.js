import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { productid } = params;
  return NextResponse.json({ message: `Product ID: ${productid}` });
}

export async function PUT(request, { params }) {
  const { productid } = params;
  return NextResponse.json({ message: `Updated Product ID: ${productid}` });
}

export async function DELETE(request, { params }) {
  const { productid } = params;
  return NextResponse.json({ message: `Deleted Product ID: ${productid}` });
}
