"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import ObservationCard from "../../components/observationCard";
import Overview from "../../components/overview";
const Page = () => {
  const params = useParams<{ location: string }>();
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch(
          `http://api.openweathermap.org/data/2.5/weather?q=${params.location}&APPID=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&units=metric`
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
      <div className="flex flex-col items-center justify-center min-h-screen bg-background">
        <Overview data={weatherData} />
        <div className="grid grid-cols-4 items-center w-3/4 gap-4">
          <ObservationCard />
        </div>
      </div>
    </>
  );
};

export default Page;
