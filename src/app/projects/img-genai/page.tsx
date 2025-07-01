"use client";
import { Label, Textarea } from "flowbite-react";
import Image from "next/image";
import { useState } from "react";

function ImgGenaiPage() {
  const [prompt, setPrompt] = useState<string>("")
  console.log("prompt:\n", prompt);

  return (
    <div className="flex justify-center">
      <form 
        className="max-w-md w-1/2 m-5" 
        onSubmit={(e) => {
          e.preventDefault();
          console.log("prompt:\n", prompt);
        }}>
        <Image
          width={1280}
          height={720}
          src="/img-genai.jpg"
          alt="img-genai.jpg"
          className="rounded-xl"
        />
        <div id="imgGenaiTextarea" className="max-w-md">
          <div className="mb-2 block">
            <Label htmlFor="comment">Your prompt:</Label>
          </div>
          <Textarea
            id="imgGenaiPrompt"
            placeholder="Write your prompt here..."
            required
            rows={4}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
        </div>
        <div className="flex justify-end">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default ImgGenaiPage;
