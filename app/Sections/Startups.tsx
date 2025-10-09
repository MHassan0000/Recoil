import React from "react";
import Card from "../components/Card";
import { Posts } from "../constants/constants";
import TitleHeader from "../components/TitleHeader";

export default function Startups({ query }: { query: string }) {
  // Normalize query
  const searchQuery = query?.trim().toLowerCase() || "";

  // Filter posts if query is provided
  const filteredPosts = searchQuery
    ? Posts.filter(
        (post) =>
          post.title.toLowerCase().includes(searchQuery) ||
          post.category.toLowerCase().includes(searchQuery) ||
          post.author.name.toLowerCase().includes(searchQuery)
      )
    : Posts;

  return (
    <>
      <section className="mt-20 flex flex-col justify-center items-center flex-wrap gap-x-15 w-full">
        <div className="w-full h-full md:px-10 px-15">
          <TitleHeader
            title={
              searchQuery
                ? `Results for “${query}”`
                : "All Startups"
            }
            showLine={false}
          />
        </div>

        <div className="flex flex-wrap justify-center items-center gap-10 mt-5">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((item) => (
              <Card key={item.id} {...item} />
            ))
          ) : (
            <p className="text-gray-400 text-lg mt-5">
              No startups found for “{query}”.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
