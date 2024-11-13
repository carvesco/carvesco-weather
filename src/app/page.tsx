"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import cities from "./cities";

const Page = () => {
  const router = useRouter();
  const [location, setLocation] = useState("");
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
        <Autocomplete
          className="mx-auto"
          disablePortal
          freeSolo
          value={location}
          inputValue={location}
          onInputChange={(event, newInputValue) => {
            setLocation(newInputValue);
          }}
          options={cities}
          sx={{ width: 300 }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Enter Location"
              className=" border rounded w-full max-w-xs mx-auto block bg-second-background border-second-foreground mt-6"
            />
          )}
        />
        <button
          className="block mx-auto mt-3 bg-second-foreground text-second-background rounded p-2 px-6"
          onClick={() => {
            console.log(location);
            router.push(`/weather/${location}`);
          }}
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default Page;
