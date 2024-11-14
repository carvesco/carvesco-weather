"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import cities from "./cities";

const Page = () => {
  const router = useRouter();
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 via-blue-500 to-indigo-500">
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
        {loading ? (
          <div className="flex flex-row justify-center mt-5">
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-second-foreground"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </div>
        ) : (
          <button
            className="block mx-auto mt-3 bg-second-foreground text-second-background rounded p-2 px-6 "
            onClick={() => {
              if (location !== "") {
                setLoading(true);
                router.push(`/weather/${location}`);
              } else {
                alert("Please enter a location");
              }
            }}
          >
            Search
          </button>
        )}
      </div>
    </div>
  );
};

export default Page;
