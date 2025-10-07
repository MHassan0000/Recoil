import React from "react";
import DarkVeil from "../components/Darkveil";
import SearchForm from "../components/SearchForm";

export default function Hero({query} : {query : string}) {
  return (
    <section className="border-1 border-white relative h-screen overflow-hidden flex items-center justify-center">
      {/* Background Layer */}
      <div className="absolute inset-0 z-10">
        <DarkVeil />
      </div>

      {/* Foreground Content */}
      <div className="absolute z-50 flex flex-col items-center text-center text-white px-6 ">
        {/* Top Tag */}
        <div className="bg-yellow-400 text-black font-bold my-5 text-xs sm:text-sm tracking-wide uppercase px-5 py-2 rounded-md shadow-md mb-5">
          Pitch, Vote and Grow
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold uppercase leading-snug">
          <span className=" px-4 py-1 rounded-md ">
            Pitch Your Startup,
          </span>
          <br />
          <span className=" px-4 py-1 rounded-md  mt-3 inline-block">
            Connect With Entrepreneurs
          </span>
        </h1>

        {/* Subheading */}
        <p className="mt-5   text-gray-200 text-sm sm:text-lg max-w-2xl">
          Submit ideas, vote on pitches, and get noticed in virtual competitions.
        </p>
       


        <SearchForm query = {query}/>
       
      </div>
    </section>
  );
};


