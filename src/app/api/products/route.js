import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

export async function GET() {
  try {
    const products = await prisma.product.findMany();
    return NextResponse.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const { name, description, price } = await request.json();
    if (!name) {
      return NextResponse.json({ message: "Invalid request" });
    }
    const product = await prisma.product.create({
      data: {
        name,
        description,
        price,
      },
    });
    if (!product) {
      return NextResponse.json(
        { message: "Failed to create product" },
        { status: 500 }
      );
    }
    return NextResponse.json({
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}
