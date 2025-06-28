import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";
import { writeFile, mkdirSync, existsSync, unlink } from "fs";
import path from "path";
import { v2 as cloudinary } from "cloudinary";


// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

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

    // Extract the form data from the request
    const data = await request.formData();
    const name = data.get("name");
    const description = data.get("description");
    const price = data.get("price");
    const rating = data.get("rating");
    const image = data.get("image");

    let imageUrl = null;

    // Check if the image is provided
    if (image && image.name) {
      // Make sure the images directory exists
      const imagesDir = "public/images";
      if (!existsSync(imagesDir)) {
        mkdirSync(imagesDir, { recursive: true });
      }

      const ext = path.extname(image.name) || ".jpg";
      const baseName = `${Date.now()}-${name.replace(/\s+/g, "_")}`;
      const imageFilename = `${baseName}${ext}`;
      const filePath = `${imagesDir}/${imageFilename}`;

      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Save the image to the local file system temporarily
      await new Promise((resolve, reject) => {
        writeFile(filePath, buffer, (err) => {
          if (err) reject(err);
          else resolve();
        });
      });

      // Upload the image to Cloudinary
      const uploadResult = await cloudinary.uploader.upload(filePath, {
        folder: "products",
        public_id: baseName,
      });
      imageUrl = uploadResult.secure_url;

      // Delete the local file
      unlink(filePath, (err) => {
        if (err) console.error("Error deleting local file:", err);
      });
    }

    // Prepare the data to update the product
    const updateData = {
      name,
      description,
      price: price ? parseFloat(price) : null,
      rating: rating ? parseFloat(rating) : null,
    };

    // Only update the image if there is a new image
    if (imageUrl) {
      updateData.image = imageUrl;
    }

    // Update the product in the database
    const prod = await prisma.product.update({
      where: { id: productid },
      data: updateData,
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
