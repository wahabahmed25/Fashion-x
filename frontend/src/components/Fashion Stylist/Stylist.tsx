import React, { useState, type ChangeEvent } from "react";
import axios from "axios";
import InputFieldOne from "../input fields/InputFieldOne";
import MoodInput from "./MoodInput";
import GetCurrentWeather from "./GetCurrentWeather";
import GenderInput from "./GenderInput";
import OutfitFinder from "../outfit finder/OutfitFinder";
interface inputProp {
  preferences: string;
  occasion: string;
  mood: string;
  gender: string;
}

const Stylist = () => {
  const [inputValue, setInputValue] = useState<inputProp>({
    preferences: "",
    occasion: "",
    mood: "",
    gender: "",
  });

  const [weatherInfo, setWeatherInfo] = useState<{
    locationName: string;
    temperature: string;
    condition: string;
  } | null>(null);

  const [result, setResult] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputValue((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("button clicked");

    try {
      const response = await axios.post("http://localhost:8000/stylist", {
        inputValue,
        weatherInfo,
      });
      setResult(response.data.gptResponse);
    } catch (err) {
      setError(`Error submitting form: ${err}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-slate-100  px-4 md:px-10">
      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl p-6 md:p-10">
        <h1 className="text-2xl font-semibold mb-6 text-gray-800">
          Personal AI Stylist
        </h1>

        {error && <p className="text-red-600 font-medium mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <InputFieldOne
            type="text"
            name="preferences"
            value={inputValue.preferences}
            label="Preferences"
            placeholder="e.g., Casual, Modern, Streetwear"
            onChange={handleChange}
          />
          <InputFieldOne
            type="text"
            name="occasion"
            value={inputValue.occasion}
            label="Occasion"
            placeholder="e.g., Date night, Gym, Business"
            onChange={handleChange}
          />
          <MoodInput
            mood={inputValue.mood}
            onChange={(value) =>
              setInputValue((prev) => ({ ...prev, mood: value }))
            }
          />
          <GenderInput
            gender={inputValue.gender}
            onChange={(value) =>
              setInputValue((prev) => ({ ...prev, gender: value }))
            }
          />

          <GetCurrentWeather onInfoRetrieved={setWeatherInfo} />

          {weatherInfo ? (
            <div className="mt-4 bg-blue-100 rounded-xl px-6 py-4 shadow-inner flex items-center gap-4">
              <div className="text-5xl">🌤️</div>
              <div>
                <h3 className="text-lg font-semibold text-blue-800">
                  {weatherInfo.locationName}
                </h3>
                <p className="text-sm text-blue-700">
                  {weatherInfo.temperature}°F — {weatherInfo.condition}
                </p>
              </div>
            </div>
          ) : (
            <p className="text-sm text-gray-500">Loading weather...</p>
          )}

          <button
            type="submit"
            className="w-full hover:cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-xl font-medium transition duration-200"
          >
            Get Outfit Suggestion
          </button>
        </form>

        {result && (
          <div className="mt-8 p-6 bg-gray-100 rounded-xl shadow-inner">
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              Your Outfit Recommendation:
            </h2>
            <p className="text-gray-700">{result}</p>
          </div>
        )}
      </div>

      {/* Placeholder for Future Functionalities */}
      <div className="max-w-3xl mx-auto mt-10">
        <div className="grid gap-6 md:grid-cols-2">
          
          
          <div className="bg-white shadow-md rounded-xl p-6">
            <h2 className="text-lg font-semibold text-center text-gray-800 mb-2">
              Outfit Finder
            </h2>
            <OutfitFinder />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stylist;
