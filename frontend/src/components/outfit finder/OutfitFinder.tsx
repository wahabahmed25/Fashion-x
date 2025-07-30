import React, { useState } from "react";
import { UploadCloud } from "lucide-react";

const OutfitFinder = () => {
  const [image, setImage] = useState<File | null>(null);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setImage(file);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!image) return alert("Please upload an image first!");
    console.log("Uploading image:", image.name);
  };

  return (
    <div className=" flex items-center borderjustify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-xl border flex flex-col gap-6 w-full max-w-md"
      >
        <label
          htmlFor="file-upload"
          className="cursor-pointer flex flex-col items-center justify-center gap-2 p-6 border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-400 transition-all"
        >
          <UploadCloud className="w-12 h-12 text-blue-500" />
          <p className="text-gray-600 text-lg">
            {image ? image.name : "Click to upload an outfit piece"}
          </p>
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            onChange={handleFileInput}
            className="hidden"
          />
        </label>

        <button
          type="submit"
          className="bg-blue-600 text-white py-3 rounded-xl text-lg font-semibold hover:bg-blue-700 transition-all"
        >
          Upload Image
        </button>
      </form>
    </div>
  );
};

export default OutfitFinder;
