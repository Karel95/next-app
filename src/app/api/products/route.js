import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";
import { writeFile, mkdirSync, existsSync, unlink } from "fs";
import path from "path";
import { v2 as cloudinary } from "cloudinary";

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

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

    // Initialize variables
    let imageFilename = "";
    let uploadResult = null;

    // Check if an image is provided and has a valid name
    if (image && image.name) {
      // Get extension from original filename if available
      const ext = path.extname(image.name) || ".jpg";
      // Generate a unique filename with a timestamp and sanitized name
      // Replace spaces with underscores and remove any other invalid characters
      const baseName = `${Date.now()}-${name.replace(/\s+/g, "_")}`;
      // Combine the base name with the extension
      imageFilename = `${baseName}${ext}`;
      // Construct the file pathfor the image
      const filePath = `${imagesDir}/${imageFilename}`;
      // Save the image to the images directory
      // You can use a library like 'fs' to handle file operations
      // For simplicity, we'll use a simple write operation here
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);
      writeFile(filePath, buffer, function (err) {
        if (err) {
          console.error(err);
        }
      });
      // Optionally, you can upload the image to a cloud storage service like Cloudinary, AWS S3, Microsoft Azure, Google Cloud Storage, etc.
      // In this example, we'll upload the image to Cloudinary
      uploadResult = await cloudinary.uploader.upload(filePath, {
        folder: "products", // Specify the folder where the image will be uploaded
        public_id: baseName, // Use the product name as the public ID
      });
      console.log("Image uploaded successfully:", uploadResult);
      // Delete the local image file after uploading
      // You can use a library like 'fs' to handle file operations
      // For simplicity, we'll use a simple unlink operation here
      if (uploadResult) {
        unlink(filePath, (err) => {
          if (err) console.error("Error deleting local file:", err);
        });
      }
    }

    // Create the product in the database
    const product = await prisma.product.create({
      data: {
        name,
        description,
        price: price ? parseFloat(price) : null,
        rating: rating ? parseFloat(rating) : null,
        image: uploadResult?.secure_url || null, // Optionally, you can use a placeholder URL if the image is not uploaded
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
