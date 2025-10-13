import React from "react";
import Card from "../components/Card";
import {client} from "../../sanity/lib/client";
import TitleHeader from "../components/TitleHeader";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";

export default async function Startups({ query }: { query: string }) {
  

  const Posts: any[] = await client.fetch(STARTUPS_QUERY);

  const searchQuery = query?.trim().toLowerCase() || "";

  // Filter posts if query is provided (preserve order from the query)
  const filteredPosts = searchQuery
    ? Posts.filter((post: any) => {
        const title = (post.title || "").toString().toLowerCase();
        const category = (post.category || "").toString().toLowerCase();
        const authorName = (post.author?.name || "").toString().toLowerCase();
        return (
          title.includes(searchQuery) ||
          category.includes(searchQuery) ||
          authorName.includes(searchQuery)
        );
      })
    : Posts;

  // For now pass the fetched Sanity documents straight through to the Card component.
  // Use _id as the key so React has a stable identifier coming from Sanity.
  const mappedPosts = filteredPosts;

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
          {mappedPosts.length > 0 ? (
              mappedPosts.map((item: any) => (
                <Card key={item._id} post={item} />
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
