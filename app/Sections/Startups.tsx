import React from "react";
import Card, { CardType } from "../components/Card";
import TitleHeader from "../components/TitleHeader";
import { STARTUPS_QUERY, BOOKMARKS_BY_AUTHOR_ID_QUERY } from "@/sanity/lib/queries";
import { Author } from "@/sanity/types";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { auth } from "@/auth";
import { client } from "@/sanity/lib/client";

export default async function Startups({ query }: { query: string }) {
  const session = await auth();
  const userId = (session as any)?.user?.id ?? (session as any)?.id ?? null;

  // Fetch all startups (ordered by created date desc)
  const { data: Posts } = await sanityFetch({ query: STARTUPS_QUERY });

  // Fetch bookmarked startup IDs for this user
  let bookmarkedIds: string[] = [];
  if (userId) {
    const author = await client.fetch(BOOKMARKS_BY_AUTHOR_ID_QUERY, { id: userId });
    bookmarkedIds = author?.bookmarks?.map((b: Author) => b._id) || [];
  }

  // Attach isBookmarked flag for UI highlighting
  const PostsWithBookmarks = Posts.map((post: any) => ({
    ...post,
    isBookmarked: bookmarkedIds.includes(post._id),
  }));

  const searchQuery = query?.trim().toLowerCase() || "";

  // Filter for search (same logic as before)
  const filteredPosts = searchQuery
    ? PostsWithBookmarks.filter((post: any) => {
        const title = (post.title || "").toString().toLowerCase();
        const category = (post.category || "").toString().toLowerCase();
        const authorName = (post.author?.name || "").toString().toLowerCase();
        const description = (post.description || "").toString().toLowerCase();
        return (
          title.includes(searchQuery) ||
          category.includes(searchQuery) ||
          authorName.includes(searchQuery) ||
          description.includes(searchQuery)
        );
      })
    : PostsWithBookmarks;

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
            mappedPosts.map((item: CardType) => (
              <Card key={item._id} post={item} />
            ))
          ) : (
            <p className="text-gray-400 text-lg mt-5">
              No startups found for “{query}”.
            </p>
          )}
        </div>
      </section>
      <SanityLive />
    </>
  );
}
