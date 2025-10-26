import React from "react";
import DarkVeil from "../components/Darkveil";
import SearchForm from "../components/SearchForm";

export default function Hero({ query }: { query: string }) {
  return (
  <section className="pt-8 relative h-screen overflow-hidden flex items-center justify-center">
      {/* Background Layer */}
      <div className="absolute inset-0 z-10">
        <DarkVeil />
      </div>

      {/* Foreground Content */}
  <div className="absolute z-20 flex flex-col items-center text-center text-white px-4 sm:px-6 lg:px-0 max-w-5xl">
        {/* Top Tag */}
        <div className="bg-yellow-400 text-black font-bold my-4 text-xs sm:text-sm tracking-wide uppercase px-4 sm:px-6 py-2 rounded-md shadow-md mb-4">
          Pitch, Vote and Grow
        </div>

        {/* Main Heading */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold uppercase leading-snug px-2 sm:px-0">
          <span className="px-2 sm:px-4 py-1 rounded-md block">
            Pitch Your Startup,
          </span>
          <span className="px-2 sm:px-4 py-1 rounded-md block mt-3">
            Connect With Entrepreneurs
          </span>
        </h1>

        {/* Subheading */}
        <p className="mt-4 mb-8 text-gray-200 text-sm sm:text-base md:text-lg max-w-xl sm:max-w-2xl px-2">
          Submit ideas, vote on pitches, and get noticed in virtual competitions.
        </p>


        


          <div className="w-full px-2 sm:px-0 flex">
            <div className="w-full max-w-3xl  mx-auto">
              <SearchForm />
            </div>
          </div>
        

      </div>
    </section>
  );
};


