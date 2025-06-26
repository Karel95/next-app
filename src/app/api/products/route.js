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
    // Get the form data from the request
    const data = await request.formData();

    // Extract the form data
    const name = data.get("name");
    const description = data.get("description");
    const price = data.get("price");
    const rating = data.get("rating");
    const image = data.get("image");
    console.log("image:\n", image);

    if (!name) {
      return NextResponse.json({ message: "Invalid request" });
    }
    const product = await prisma.product.create({
      data: {
        name,
        description,
        price: price ? parseFloat(price) : null,
        rating: rating ? parseFloat(rating) : null,
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
