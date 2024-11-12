"use client";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  let location = "London";
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="text-center">
        <h1 className="text-5xl font-bold">CARVESCO WEATHER</h1>
        <p className="text-lg mt-4">
          Welcome to Carvesco Weather, the best weather app in the world!
          <br />
          Enter the place you want to know the current weather and we will show
          you.
        </p>
        <input
          className="border rounded p-2 w-full max-w-xs mx-auto block bg-second-background border-second-foreground mt-6"
          placeholder="Enter location"
        />
        <button
          className="block mx-auto mt-3 bg-second-foreground text-second-backgorund rounded p-2 px-6"
          onClick={() => router.push(`/weather/${location}`)}
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default Page;
