import InputFieldOne from "../input fields/InputFieldOne";
import React, { useState, type ChangeEvent } from "react";
import MoodInput from "./MoodInput";
import GetCurrentWeather from "./GetCurrentWeather";
import axios from "axios";
interface inputProp {
  preferences: string;
  occasion: string;
  mood: string;
}

const Stylist = () => {
  const [inputValue, setInputValue] = useState<inputProp>({
    preferences: "",
    occasion: "",
    mood: "",
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
    // console.log(inputValue);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // console.log({ ...inputValue, ...weatherInfo });

    try {
      const response = await axios.post("http://localhost:8000/stylist", {
        inputValue,
        weatherInfo,
      });
      console.log("server response (stylist): ", response.data.gptResponse);
      setResult(response.data.gptResponse);
    } catch (err) {
      setError(`error submitting form: ${err}`);
      console.error("error submitting form", err);
    }
  };

  return (
    <div>
      {error && <p className="text-red-600">{error}</p>}
      <form onSubmit={handleSubmit}>
        <InputFieldOne
          type="text"
          name="preferences"
          value={inputValue.preferences}
          label="Preferences"
          placeholder="What are your preferences?"
          onChange={handleChange}
        />
        <InputFieldOne
          type="text"
          name="occasion"
          value={inputValue.occasion}
          label="occasion"
          placeholder="What are your occasion?"
          onChange={handleChange}
        />
        <MoodInput
          mood={inputValue.mood}
          onChange={(value) =>
            setInputValue((prev) => ({ ...prev, mood: value }))
          }
        />
        <GetCurrentWeather onInfoRetrieved={setWeatherInfo} />
        {weatherInfo ? (
          <div>
            <p>
              Weather in {weatherInfo.locationName}: {weatherInfo.temperature}
              °F, {weatherInfo.condition}
            </p>
          </div>
        ) : (
          <p>Loading weather...</p>
        )}
        <button type="submit">Submit</button>
      </form>

      {result && (
        <div className="mt-6 p-4 border rounded bg-gray-100">
          <h2 className="text-lg font-bold mb-2">
            Your Outfit Recommendation:
          </h2>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
};

export default Stylist;
