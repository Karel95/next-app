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
        className="max-w-4xl w-1/2 m-5 p-5 bg-gray-900 border-2 border-gray-500 shadow-lg rounded-md"
        onSubmit={(e) => {
          e.preventDefault();
          console.log("prompt:\n", prompt);
        }}
      >
        <Image
          width={1280}
          height={720}
          src="/images/team-9230101_640.png"
          alt="img-genai.jpg"
          className="rounded-xl"
        />
        <div id="imgGenaiTextarea" className="w-full my-4">
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
