"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ResetForm from "./ResetForm";
import TitleHeader from "./TitleHeader";

const SearchForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentQuery = searchParams.get("query") || "";

  // Local input state (real-time control)
  const [query, setQuery] = useState(currentQuery);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    // Update the URL to trigger SSR (server re-render)
    router.push(`/?query=${encodeURIComponent(query)}`);
  };

  const handleClear = () => {
    setQuery("");


  };

  return (
    <>
      <form onSubmit={handleSubmit} className="search-form w-full text-white">
        <input
          name="query"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-input"
          placeholder="Search Startups"
        />

        <div className="flex gap-4">
          {query && <ResetForm onClear={handleClear} />}
          <button
            type="submit"

          >
            <img width={50} className="invert hover:scale-90 cursor-pointer" src="/images/search.svg" alt="X" />
          </button>
        </div>
      </form>
      
    </>

  );
};

export default SearchForm;
