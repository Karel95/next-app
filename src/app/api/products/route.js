import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";
import { writeFile, mkdirSync, existsSync } from "fs";
import path from "path";


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

    // Validate the form data
    if (!name) {
      return NextResponse.json({ message: "Invalid request" });
    }
    // Optionally, you can add more validation and sanitization here

    // Directory to save images
    const imagesDir = "public/images";
    // Ensure the images directory exists
    if (!existsSync(imagesDir)) {
      mkdirSync(imagesDir, { recursive: true });
    }

    // Initialize the image filename
    let imageFilename = "";

    // Check if an image is provided and has a valid name
    if (image && image.name) {
      // Get extension from original filename if available
      const ext = path.extname(image.name) || ".jpg";
      // Generate a unique filename with a timestamp and sanitized name
      // Replace spaces with underscores and remove any other invalid characters
      imageFilename = `${Date.now()}-${name.replace(/\s+/g, "_")}${ext}`;
      // Save the image to the images directory
      // You can use a library like 'fs' to handle file operations
      // For simplicity, we'll use a simple write operation here
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);
      writeFile(`${imagesDir}/${imageFilename}`, buffer, function (err) {
        if (err) {
          console.error(err);
        }
      });
      console.log(`Image saved to ${imagesDir}/${imageFilename}`);
    }

    // Create the product in the database
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
