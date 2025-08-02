import { NextResponse } from "next/server";
import { GoogleGenAI, Modality } from "@google/genai";
import * as fs from "node:fs/promises";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
if (!GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY is not defined in environment variables.");
}

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

export async function POST(request: Request) {
  try {
    const prompt = await request.json();

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required." },
        { status: 400 }
      );
    }

    const contents = `Generate an image of: ${prompt}`;

    // Set responseModalities to include "Image" so the model can generate  an image
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-preview-image-generation",
      contents: contents,
      config: {
        responseModalities: [Modality.TEXT, Modality.IMAGE],
      },
    });

    // Check if 'candidates' and is not empty
    if (!response.candidates || response.candidates.length === 0) {
      console.warn("No candidates returned from API. Check safety ratings.");
      const safetyFeedback = response.promptFeedback; // Cheeck why it was blocked
      return NextResponse.json(
        {
          error: "No content generated, possibly due to safety filters.",
          feedback: safetyFeedback,
        },
        { status: 500 }
      );
    }

    const candidate = response.candidates[0];

    // Check if 'content' and 'parts' exists
    if (!candidate.content || !candidate.content.parts) {
      return NextResponse.json(
        { error: "Invalid response structure from AI model." },
        { status: 500 }
      );
    }

    let generatedText: string | null = null;
    let imageUrl: string | null = null;

    for (const part of candidate.content.parts) {
      // Based on the part type, either show the text or save the image
      if (part.text) {
        generatedText = part.text;
        console.log(generatedText);
      } else if (part.inlineData) {
        const imageData = part.inlineData.data;
        const mimeType = part.inlineData.mimeType || "image/png";
        let imagePath = "";

        if (typeof imageData === "string") {
          const buffer = Buffer.from(imageData, "base64");

          // Generate an unique name
          const extension = mimeType.split("/")[1] || "png";
          const filename = `gemini-image-${Date.now()}.${extension}`;
          imagePath = `public/generated/${filename}`; // Save in public folder

          // Make sure directory exists
          fs.mkdir("public/generated", { recursive: true });

          fs.writeFile(imagePath, buffer);
          console.log(`Image saved as ${imagePath}`);

          imageUrl = `/generated/${filename}`;
        }
      }
    }

    return NextResponse.json({ text: generatedText, imageUrl: imageUrl });
  } catch (error) {
    console.error("Error processing POST request:", error);
    return NextResponse.json(
      { error: "An internal error occurred." },
      { status: 500 }
    );
  }
}
