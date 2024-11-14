"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  ObservationCard,
  ObservationCardMultiData,
} from "../../components/observationCard";
import Overview from "../../components/overview";
import { PiGaugeFill } from "react-icons/pi";
import { WiHumidity } from "react-icons/wi";
import { MdVisibility } from "react-icons/md";
import { FaCloud } from "react-icons/fa";
import { FaWind } from "react-icons/fa";
import { TbSunset2 } from "react-icons/tb";
import Link from "next/link";
import { WeatherData } from "@/app/types/interfaces";
const Page = () => {
  const params = useParams<{ location: string }>();

  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(0);
  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch(
          `http://api.openweathermap.org/data/2.5/weather?q=${params.location}&APPID=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&units=metric`
        );
        if (!response.ok) {
          if (response.status === 404) {
            setError(response.status);
            throw new Error("City not found");
          }
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log(data);
        // Convert sunrise and sunset timestamps to local time
        const sunrise = new Date((data.sys.sunrise + data.timezone) * 1000)
          .toUTCString()
          .slice(-12, -7);
        const sunset = new Date((data.sys.sunset + data.timezone) * 1000)
          .toUTCString()
          .slice(-12, -7);
        data.sys.sunrise = sunrise;
        data.sys.sunset = sunset;
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
      {weatherData && (
        <>
          <button className="rounded-md bg-red-400 p-4 font-semibold text-second-background mt-10 ml-10">
            <Link href="/">Return</Link>
          </button>
          <div className="flex flex-col items-center min-h-screen bg-background">
            <Overview {...weatherData} />
            <h1 className="text-3xl mt-4 font-bold">Weather Observations</h1>
            <div className="grid grid-cols-4 items-center w-3/4 gap-4 mt-6">
              {weatherData?.main?.pressure && (
                <ObservationCard
                  title={"Pressure"}
                  value={weatherData?.main?.pressure}
                  units={"hPa"}
                  icon={<PiGaugeFill style={{ height: 50, width: 50 }} />}
                />
              )}
              {weatherData?.main?.humidity && (
                <ObservationCard
                  title={"Humidty"}
                  value={weatherData?.main?.humidity}
                  units={"%"}
                  icon={<WiHumidity style={{ height: 50, width: 50 }} />}
                />
              )}
              {weatherData?.visibility && (
                <ObservationCard
                  title={"Visibility"}
                  value={weatherData?.visibility}
                  units={"m"}
                  icon={<MdVisibility style={{ height: 50, width: 50 }} />}
                />
              )}
              {weatherData?.clouds?.all && (
                <ObservationCard
                  title={"Cloudiness"}
                  value={weatherData?.clouds?.all}
                  units={"%"}
                  icon={<FaCloud style={{ height: 50, width: 50 }} />}
                />
              )}
            </div>
            <div className="grid grid-cols-2 items-center w-2/4 gap-4 mt-6">
              {weatherData?.wind && (
                <ObservationCardMultiData
                  title={"Wind"}
                  value={{
                    speed: weatherData?.wind.speed,
                    deg: weatherData?.wind.deg,
                  }}
                  units={{ speed: "m/s", deg: "°" }}
                  icon={<FaWind style={{ height: 50, width: 50 }} />}
                />
              )}
              {weatherData && (
                <ObservationCardMultiData
                  value={{
                    sunrise: weatherData?.sys.sunrise,
                    sunset: weatherData?.sys.sunset,
                  }}
                  icon={<TbSunset2 style={{ height: 50, width: 50 }} />}
                />
              )}
            </div>
          </div>
        </>
      )}
      {error === 404 && (
        <div className="flex flex-col items-center min-h-screen bg-background mt-52">
          <h1 className="text-3xl mt-4 font-bold text-red-500">
            City not found. Please try again.
          </h1>
          <button className="rounded-md bg-red-400 p-4 font-semibold text-second-background mt-10">
            <Link href="/">Return</Link>
          </button>
        </div>
      )}
    </>
  );
};

export default Page;
