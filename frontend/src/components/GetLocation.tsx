import GetCurrentWeather from "./Fashion Stylist/GetCurrentWeather";
import { useState, useEffect } from "react";
// interface propType {
//     lat: number;
//     lon: number;
// }
const GetLocation = () => {
  const [location, setLocation] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

//gets users current location
  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        setLocation(`${lat},${lon}`);
      },
      (err) => {
        console.error(err);
        setError("Unable to retrieve your location");
      }
    );
  }, []);

  return (
    <div>
        {error && <p className="text-red-600">{error}</p>}
        {!location && !error && <p>Getting your location...</p>}
        {location && <GetCurrentWeather location={location}/>}
    </div>
  );
};

export default GetLocation;
