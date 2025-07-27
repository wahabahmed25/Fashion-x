// import GetCurrentWeather from "./Fashion Stylist/GetCurrentWeather";
// import { useState, useEffect } from "react";
// // interface propType {
// //     lat: number;
// //     lon: number;
// // }
// interface propType {
//   onLocationRetrieved: (info: {
//     lat: number;
//     lon: number;
//     locationName: string;
//     temperature: number;
//   }) => void;
// }
// const GetLocation = ({ onLocationRetrieved }: propType) => {
  
//   const [error, setError] = useState<string | null>(null);

//   //gets users current location
//   useEffect(() => {
//     if (!navigator.geolocation) {
//       setError("Geolocation is not supported by your browser");
//       return;
//     }

//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         const lat = position.coords.latitude;
//         const lon = position.coords.longitude;
//         const coords = { lat, lon };
//         setLocation(coords);
//         onLocationRetrieved(coords); //sends back to parent
//       },
//       (err) => {
//         console.error(err);
//         setError("Unable to retrieve your location");
//       }
//     );
//   }, [onLocationRetrieved]);

//   return (
//     <div>
//       {error && <p className="text-red-600">{error}</p>}
//       {!location && !error && <p>Getting your location...</p>}
//       {location && (
//         <GetCurrentWeather location={`${location.lat},${location.lon}`} />
//       )}
//     </div>
//   );
// };

// export default GetLocation;
