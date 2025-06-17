import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

export async function GET(request, { params }) {
  try {
    const productid = parseInt(params.productid);
    if (isNaN(productid)) {
      return NextResponse.json(
        { error: "Invalid product ID" },
        { status: 400 }
      );
    }
    const prod = await prisma.product.findUnique({
      where: { id: productid },
    });
    if (!prod) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(prod);
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const productid = parseInt(params.productid);
    if (isNaN(productid)) {
      return NextResponse.json(
        { error: "Invalid product ID" },
        { status: 400 }
      );
    }
    const data = await request.json();
    const prod = await prisma.product.update({
      where: { id: productid },
      data,
    });
    console.log("[DEBUG] Updated Product:\n", prod);
    return NextResponse.json(prod);
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const productid = parseInt(params.productid);
    if (isNaN(productid)) {
      return NextResponse.json(
        { error: "Invalid product ID" },
        { status: 400 }
      );
    }
    await prisma.product.delete({
      where: { id: productid },
    });
    return NextResponse.json({ message: `Deleted Product ID: ${productid}` });
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
