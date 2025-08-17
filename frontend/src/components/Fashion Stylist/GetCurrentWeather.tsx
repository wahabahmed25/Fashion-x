import axios from "axios";
import { useEffect } from "react";

interface Props {
  onInfoRetrieved: (data: {
    locationName: string;
    temperature: string;
    condition: string;
  }) => void;
}

const GetCurrentWeather = ({ onInfoRetrieved }: Props) => {
  useEffect(() => {
    if (!navigator.geolocation) {
      console.error("Geolocation not supported.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        try {
          const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
          const response = await axios.get(
            `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lat},${lon}`
          );

          const locationName = response.data.location.name;
          const condition = response.data.current.condition.text;
          const tempCelsius = response.data.current.temp_c;
          const tempFahrenheit = Math.floor(tempCelsius * 1.8 + 32).toString();

          onInfoRetrieved({
            locationName,
            temperature: tempFahrenheit,
            condition,
          });
        } catch (error) {
          console.error("Error fetching weather:", error);
        }
      },
      (err) => {
        console.error("Error getting location:", err);
      }
    );
  }, [onInfoRetrieved]);

  return null; // no UI, just logic
};

export default GetCurrentWeather;
