"use client";
import { FileInput, Label } from "flowbite-react";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";


interface FileInpProps {
  selectedFile: File | null;
  setSelectedFile: Dispatch<SetStateAction<File | null>>;
}

export function FileInp({ selectedFile, setSelectedFile }: FileInpProps) {

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const fileFromInput = event.target.files?.[0];

    // Use the coational operator (??) to handle the case where fileFromInput is null or undefined
    // This operator returns the value on the right if the value on the left is not null or undefined,
    // otherwise it returns the value on the left.
    setSelectedFile(fileFromInput ?? null);
    console.log("Selected file:", fileFromInput ?? null);

    // Optional: Clear the input field after file selection
    // event.target.value = '';
  }

  return (
    <div className="flex w-full items-center justify-center">
      <Label
        htmlFor="dropzone-file"
        className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
      >
        {selectedFile ? (
          <>
            <Image
              className="mx-auto h-full w-auto object-cover"
              width="100"
              height="100"
              src={URL.createObjectURL(selectedFile)}
              alt="Preview"
            />
          </>
        ) : (
          <div className="flex flex-col items-center justify-center pb-6 pt-5">
            <svg
              className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              SVG, PNG, JPG or GIF (MAX. 800x400px)
            </p>
          </div>
        )}
        <FileInput
          id="dropzone-file"
          className="hidden"
          onChange={(e) => handleFileChange(e)}
        />
      </Label>
    </div>
  );
}
