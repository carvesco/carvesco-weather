import Image from "next/image";
const Overview = ({ data }: any) => {
  return (
    <div className="grid grid-flow-dense grid-cols-3 rounded-lg bg-second-backgorund  p-4 w-1/2">
      <h2 className="text-4xl col-span-3">{data.name} Weather</h2>
      <div className="flex flex-row items-center col-span-3 w-full gap-x-4">
        <Image
          src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
          width={150}
          height={150}
          alt="Weather icon"
        />
        <h2 className="text-4xl px-2">{data.main.temp}°C</h2>
        <div className="grow grid grid-cols-2 text-second-foreground text-xl  items-center">
          <p>{data.weather[0].description}</p>
          <p>Feels like: {data.main.feels_like}°C</p>
          <p>Min: {data.main.temp_min}°C</p>
          <p>Max: {data.main.temp_max}°C</p>
        </div>
      </div>
    </div>
  );
};

export default Overview;
