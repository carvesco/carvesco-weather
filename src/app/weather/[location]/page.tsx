"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
const Page = () => {
  const params = useParams<{ location: string }>();
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  console.log(params);
  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch(
          `http://api.openweathermap.org/data/2.5/weather?q=${params.location}&APPID=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log(data);
        setWeatherData(data);
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      } finally {
        setLoading(false);
      }
    };

    if (params.location) {
      fetchWeatherData();
    }
  }, [params.location]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h1 className="text-5xl font-bold">CARVESCO WEATHER</h1>
    </>
  );
};

export default Page;
