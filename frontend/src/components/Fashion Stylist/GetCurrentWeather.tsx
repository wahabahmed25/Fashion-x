import axios from "axios";
import { useState, useEffect } from "react";

interface propType {
  location: string;
}

const GetCurrentWeather = ({ location }: propType) => {
  const [temp, setTemp] = useState<string | null>(null);
  const [condition, setCondition] = useState<string | null>(null);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!location) return;

    const fetchWeather = async () => {
      try {
        const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
        const response = await axios.get(
          `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`
        );
        const celsius = response.data.current.temp_c;
        setTemp(`${Math.floor(celsius * 1.8 + 32)}`); //converts to f
        setCondition(response.data.current.condition.text);
      } catch (err) {
        setError(`error fetching weather ${err}`);
        console.error("error fetching weather", err);
      }
    };

    fetchWeather();
  }, [location]);

  return (
    <div className="p-2">
      {error && <p className="text-red-600">{error}</p>}
      {temp && condition && (
        <p>
          {location}: {temp}°C, {condition}
        </p>
      )}
      {!temp && !error && <p>Loading...</p>}
    </div>
  );
};

export default GetCurrentWeather;
