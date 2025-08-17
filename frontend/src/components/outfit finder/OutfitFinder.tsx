import React, { useState } from "react";
import { UploadCloud } from "lucide-react";
import { findSimilarItems } from "../../ApiCalls";
const OutfitFinder = () => {
  const [image, setImage] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<[string, number][]>([]); //image url with similarity score
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setImage(file);

    if (file) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!image) {
      setError("upload an image");
      return;
    }
    setError(null);
    setResults([]);

    try {
      const data = await findSimilarItems(image);
      setResults(data.similar_images || []);
    } catch (err) {
      setError("error finding similar items");
      console.error("error finding similar items: ", err);
    }
  };

  return (
    <div className="flex items-center justify-center px-4">
      {error && <p className="text-red-600 font-semibold mb-2">{error}</p>}
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
          className="bg-blue-600 text-white py-3 rounded-xl text-lg font-semibold hover:bg-blue-700 transition-all disabled:opacity-50"
        >
          Publish
        </button>
      </form>
      {/* Uploaded image preview */}
      {preview && (
        <div className="mt-6 max-w-md w-full">
          <h2 className="text-xl font-semibold mb-4">Your Uploaded Image:</h2>
          <img
            src={preview}
            alt="Uploaded"
            className="rounded-md object-cover max-h-64 mx-auto"
          />
        </div>
      )}
      {/* Results section */}
      <div className="mt-6 max-w-md w-full">
        {results.length > 0 && (
          <>
            <h2 className="text-xl font-semibold mb-4">Similar Items:</h2>
            <div className="grid grid-cols-2 gap-4">
              {results.map(([url, score], index) => (
                <div key={index} className="flex flex-col items-center">
                  <img
                    src={`http://localhost:8000${url}`}
                    alt={`Similar item ${index + 1}`}
                    className="rounded-md object-cover max-h-48"
                  />
                  <p className="mt-2 text-sm text-gray-700">
                    Similarity: {score.toFixed(3)}
                  </p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default OutfitFinder;
